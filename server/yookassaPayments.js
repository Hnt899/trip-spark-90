import crypto from "crypto";
import express from "express";
import fetch from "node-fetch";
import { pool } from "./db.js";
import { adminMiddleware, authMiddleware } from "./authMiddleware.js";
import { parseBoolLike } from "./webpayNode.js";

const YOOKASSA_API_BASE = "https://api.yookassa.ru/v3";

function getYookassaCreds() {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;
  if (!shopId || !secretKey) {
    return null;
  }
  return { shopId, secretKey };
}

function getAuthHeader(shopId, secretKey) {
  const token = Buffer.from(`${shopId}:${secretKey}`).toString("base64");
  return `Basic ${token}`;
}

function toAmountValue(totalPrice) {
  const amount = Number(totalPrice);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount.toFixed(2);
}

function getStatusByYookassaPayment(payment) {
  const status = String(payment?.status || "").toLowerCase();
  if (status === "succeeded") return "paid";
  if (status === "canceled") return "cancelled";
  if (status === "pending") return "pending";
  return "failed";
}

async function yookassaRequest(path, method, body, idempotenceKey) {
  const creds = getYookassaCreds();
  if (!creds) {
    throw new Error(
      "ЮKassa не настроена: задайте YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY на сервере."
    );
  }

  const headers = {
    Authorization: getAuthHeader(creds.shopId, creds.secretKey),
    "Content-Type": "application/json",
  };
  if (idempotenceKey) {
    headers["Idempotence-Key"] = idempotenceKey;
  }

  const resp = await fetch(`${YOOKASSA_API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await resp.json();
  } catch {
    data = null;
  }

  if (!resp.ok) {
    const details = data?.description || data?.type || `HTTP ${resp.status}`;
    throw new Error(`ЮKassa API error: ${details}`);
  }

  return data;
}

async function updateTicketPaymentById(ticketId, userId, payload) {
  const updateFields = [];
  const setValues = [];
  let idx = 1;

  const pushField = (field, value, castJson = false) => {
    updateFields.push(
      castJson ? `${field} = $${idx}::jsonb` : `${field} = $${idx}`
    );
    setValues.push(value);
    idx += 1;
  };

  if (payload.payment_status !== undefined) {
    pushField("payment_status", payload.payment_status);
  }
  if (payload.payment_transaction_id !== undefined) {
    pushField("payment_transaction_id", payload.payment_transaction_id);
  }
  if (payload.payment_method !== undefined) {
    pushField("payment_method", payload.payment_method);
  }
  if (payload.payment_raw !== undefined) {
    pushField("payment_raw", JSON.stringify(payload.payment_raw), true);
  }
  if (payload.payment_paid_at !== undefined) {
    pushField("payment_paid_at", payload.payment_paid_at);
  }
  if (payload.order_status !== undefined) {
    pushField("order_status", payload.order_status);
  }

  updateFields.push("updated_at = NOW()");

  const whereParts = [`id = $${idx}::uuid`];
  const whereValues = [ticketId];
  idx += 1;
  if (userId) {
    whereParts.push(`user_id = $${idx}::uuid`);
    whereValues.push(userId);
  }

  await pool.query(
    `UPDATE tickets SET ${updateFields.join(", ")} WHERE ${whereParts.join(" AND ")}`,
    [...setValues, ...whereValues]
  );
}

async function findTicketForSync({ userId, paymentId, orderNumber }) {
  if (paymentId) {
    const { rows } = await pool.query(
      `SELECT * FROM tickets WHERE payment_transaction_id = $1 AND user_id = $2 LIMIT 1`,
      [paymentId, userId]
    );
    if (rows[0]) return rows[0];
  }

  if (orderNumber) {
    const { rows } = await pool.query(
      `SELECT * FROM tickets WHERE order_number = $1 AND user_id = $2 LIMIT 1`,
      [orderNumber, userId]
    );
    if (rows[0]) return rows[0];
  }

  return null;
}

export async function yookassaWebhookHandler(req, res) {
  try {
    const body = req.body || {};
    const event = String(body.event || "").toLowerCase();
    const payment = body.object || {};
    const paymentId = payment.id ? String(payment.id) : "";

    if (!paymentId) {
      return res.status(400).json({ error: "payment id required" });
    }

    const statusFromEvent =
      event === "payment.succeeded"
        ? "paid"
        : event === "payment.canceled"
          ? "cancelled"
          : getStatusByYookassaPayment(payment);

    const orderNumber = payment?.metadata?.order_number
      ? String(payment.metadata.order_number)
      : null;

    const byPayment = await pool.query(
      `SELECT * FROM tickets WHERE payment_transaction_id = $1 LIMIT 1`,
      [paymentId]
    );
    let ticket = byPayment.rows[0] || null;

    if (!ticket && orderNumber) {
      const byOrder = await pool.query(
        `SELECT * FROM tickets WHERE order_number = $1 LIMIT 1`,
        [orderNumber]
      );
      ticket = byOrder.rows[0] || null;
    }

    if (!ticket) {
      return res.json({ ok: true, skipped: true, reason: "ticket_not_found" });
    }

    if (ticket.payment_status === "paid" && statusFromEvent === "paid") {
      return res.json({ ok: true, already: true });
    }

    const updatePayload = {
      payment_status: statusFromEvent,
      payment_transaction_id: paymentId,
      payment_method: "yookassa",
      payment_raw: payment,
    };
    if (statusFromEvent === "paid") {
      updatePayload.payment_paid_at = new Date().toISOString();
    }

    await updateTicketPaymentById(ticket.id, null, updatePayload);
    return res.json({ ok: true });
  } catch (e) {
    console.error("[yookassa] webhook", e);
    return res.status(500).json({ error: "Webhook processing error" });
  }
}

async function executeYookassaRefund(ticket, amountInput) {
  if (ticket.payment_method !== "yookassa") {
    const err = new Error(
      "Возврат на карту доступен только для заказов, оплаченных через ЮKassa"
    );
    err.statusCode = 400;
    throw err;
  }
  if (ticket.payment_status !== "paid") {
    const err = new Error("Возврат возможен только для оплаченного билета");
    err.statusCode = 400;
    throw err;
  }
  if (!ticket.payment_transaction_id) {
    const err = new Error("Не найден идентификатор платежа ЮKassa");
    err.statusCode = 400;
    throw err;
  }
  if (ticket.order_status === "refunded") {
    return { ok: true, already: true, order_number: ticket.order_number };
  }

  const amountValue = amountInput
    ? toAmountValue(amountInput)
    : toAmountValue(ticket.total_price);
  if (!amountValue) {
    const err = new Error("Некорректная сумма возврата");
    err.statusCode = 400;
    throw err;
  }

  const refund = await yookassaRequest(
    "/refunds",
    "POST",
    {
      payment_id: ticket.payment_transaction_id,
      amount: {
        value: amountValue,
        currency: "RUB",
      },
      description: `Возврат по заказу ${ticket.order_number}`,
      metadata: {
        order_number: ticket.order_number,
        ticket_id: String(ticket.id),
      },
    },
    crypto.randomUUID()
  );

  const existingRaw =
    ticket.payment_raw && typeof ticket.payment_raw === "object"
      ? ticket.payment_raw
      : {};

  await updateTicketPaymentById(ticket.id, null, {
    payment_status: "cancelled",
    order_status: "refunded",
    payment_raw: {
      ...existingRaw,
      refund,
    },
  });

  return {
    ok: true,
    order_number: ticket.order_number,
    refund_amount: amountValue,
    refund,
  };
}

export function registerYookassaPaymentRoutes(app) {
  app.post("/api/yookassa-webhook", express.json(), yookassaWebhookHandler);

  app.post("/api/yookassa-sync-payment", authMiddleware, express.json(), async (req, res) => {
    const paymentIdInput =
      typeof req.body?.payment_id === "string" ? req.body.payment_id.trim() : "";
    const orderNumberInput =
      typeof req.body?.order_number === "string" ? req.body.order_number.trim() : "";

    if (!paymentIdInput && !orderNumberInput) {
      return res
        .status(400)
        .json({ error: "payment_id or order_number required" });
    }

    try {
      const ticket = await findTicketForSync({
        userId: req.userId,
        paymentId: paymentIdInput || null,
        orderNumber: orderNumberInput || null,
      });

      if (!ticket) {
        return res.status(404).json({ error: "Заказ не найден или чужой" });
      }

      const paymentId = paymentIdInput || ticket.payment_transaction_id;
      if (!paymentId) {
        return res.status(400).json({ error: "Не найден payment_id для заказа" });
      }

      const payment = await yookassaRequest(
        `/payments/${encodeURIComponent(paymentId)}`,
        "GET"
      );

      const status = getStatusByYookassaPayment(payment);
      if (status === "paid") {
        if (ticket.payment_status !== "paid") {
          await updateTicketPaymentById(ticket.id, req.userId, {
            payment_status: "paid",
            payment_transaction_id: paymentId,
            payment_paid_at: new Date().toISOString(),
            payment_method: "yookassa",
            payment_raw: payment,
          });
        }
        return res.json({
          ok: true,
          status: "paid",
          order_number: ticket.order_number,
        });
      }

      if (status === "cancelled" || status === "failed") {
        if (ticket.payment_status === "pending") {
          await updateTicketPaymentById(ticket.id, req.userId, {
            payment_status: status,
            payment_transaction_id: paymentId,
            payment_method: "yookassa",
            payment_raw: payment,
          });
        }
      }

      return res.json({
        ok: true,
        status,
        order_number: ticket.order_number,
      });
    } catch (e) {
      console.error("[yookassa] sync-payment", e);
      const msg = e instanceof Error ? e.message : "ЮKassa sync error";
      return res.status(502).json({ error: msg });
    }
  });

  app.post("/api/webpay-create", authMiddleware, express.json(), async (req, res) => {
    const body = req.body || {};
    if (!body.ticket_id || !body.order_number || body.total_price === undefined) {
      return res.status(400).json({ error: "Missing ticket_id, order_number, total_price" });
    }

    const amountValue = toAmountValue(body.total_price);
    if (!amountValue) {
      return res.status(400).json({ error: "total_price must be positive" });
    }

    const skipWebpay = parseBoolLike(process.env.SKIP_WEBPAY) === true;
    if (skipWebpay) {
      const txId = `skip-${crypto.randomUUID()}`;
      const { rows } = await pool.query(
        `UPDATE tickets SET
          payment_status = 'paid',
          payment_paid_at = NOW(),
          payment_method = 'skip_webpay',
          payment_transaction_id = $3,
          payment_raw = $4::jsonb,
          updated_at = NOW()
        WHERE id = $1::uuid AND user_id = $2::uuid AND order_number = $5
        RETURNING id`,
        [
          body.ticket_id,
          req.userId,
          txId,
          JSON.stringify({ skip_webpay: true, at: new Date().toISOString() }),
          String(body.order_number),
        ]
      );
      if (!rows.length) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      console.warn(
        "[webpay-create] SKIP_WEBPAY: оплата пропущена, билет помечен paid (только для разработки)"
      );
      return res.json({ skip_webpay: true, order_number: body.order_number });
    }

    if (!getYookassaCreds()) {
      return res.status(503).json({
        error:
          "ЮKassa не настроена: задайте YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY на сервере.",
      });
    }

    const orderNumber = String(body.order_number);
    let baseUrl = body.base_url || req.headers.origin || "";
    baseUrl = String(baseUrl).replace(/\/$/, "");
    if (!baseUrl) baseUrl = "http://localhost:8080";

    const returnUrl = `${baseUrl}/payment/success?order=${encodeURIComponent(orderNumber)}`;

    try {
      const payment = await yookassaRequest(
        "/payments",
        "POST",
        {
          amount: {
            value: amountValue,
            currency: "RUB",
          },
          capture: true,
          confirmation: {
            type: "redirect",
            return_url: returnUrl,
          },
          metadata: {
            order_number: orderNumber,
            ticket_id: String(body.ticket_id),
            user_id: String(req.userId),
          },
          description: `Оплата билета. Заказ ${orderNumber}`,
        },
        crypto.randomUUID()
      );

      const redirectUrl = payment?.confirmation?.confirmation_url;
      const paymentId = payment?.id ? String(payment.id) : "";

      if (!redirectUrl || !paymentId) {
        return res.status(500).json({ error: "ЮKassa не вернула URL оплаты" });
      }

      await updateTicketPaymentById(body.ticket_id, req.userId, {
        payment_transaction_id: paymentId,
        payment_method: "yookassa",
        payment_raw: payment,
      });

      return res.json({
        url: redirectUrl,
        order_number: orderNumber,
        payment_id: paymentId,
      });
    } catch (e) {
      console.error("[yookassa] create payment", e);
      const msg = e instanceof Error ? e.message : "ЮKassa error";
      return res.status(502).json({ error: msg });
    }
  });

  app.post("/api/tickets/:id/refund", authMiddleware, express.json(), async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM tickets WHERE id = $1::uuid AND user_id = $2::uuid`,
        [req.params.id, req.userId]
      );
      const ticket = rows[0];
      if (!ticket) {
        return res.status(404).json({ error: "Билет не найден" });
      }

      const result = await executeYookassaRefund(ticket, req.body?.amount);
      return res.json({ ...result, ticket_id: ticket.id });
    } catch (e) {
      console.error("[yookassa] user refund", e);
      const status = e?.statusCode === 400 ? 400 : 502;
      const msg = e instanceof Error ? e.message : "ЮKassa refund error";
      return res.status(status).json({ error: msg });
    }
  });

  app.post("/api/admin/tickets/:id/refund", adminMiddleware, express.json(), async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM tickets WHERE id = $1::uuid`, [
        req.params.id,
      ]);
      const ticket = rows[0];
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      const result = await executeYookassaRefund(ticket, req.body?.amount);
      return res.json({ ...result, ticket_id: ticket.id });
    } catch (e) {
      console.error("[yookassa] admin refund", e);
      const status = e?.statusCode === 400 ? 400 : 502;
      const msg = e instanceof Error ? e.message : "ЮKassa refund error";
      return res.status(status).json({ error: msg });
    }
  });
}
