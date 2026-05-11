import crypto from "crypto";
import Stripe from "stripe";
import express from "express";
import { pool } from "./db.js";
import { authMiddleware } from "./authMiddleware.js";
import { parseBoolLike } from "./webpayNode.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function stripeWebhookHandler(req, res) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe] STRIPE_WEBHOOK_SECRET is not set");
    return res.status(500).send("Webhook not configured");
  }
  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) {
    return res.status(500).send("Stripe not configured");
  }
  const stripe = new Stripe(sk);
  const sig = req.headers["stripe-signature"];
  if (!sig || !Buffer.isBuffer(req.body)) {
    return res.status(400).send("Missing stripe-signature or raw body");
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    console.error("[stripe] webhook signature", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderNumber = session.metadata?.order_number;
    if (!orderNumber) {
      console.warn("[stripe] checkout.session.completed without order_number");
      return res.json({ received: true });
    }

    const { rows: tickets } = await pool.query(
      `SELECT id, order_number, payment_status, payment_transaction_id FROM tickets WHERE order_number = $1`,
      [orderNumber]
    );
    const ticket = tickets[0];
    if (!ticket) {
      console.warn("[stripe] unknown order", orderNumber);
      return res.json({ received: true });
    }
    if (ticket.payment_status === "paid") {
      return res.json({ received: true, message: "already paid" });
    }

    const txId = session.id;
    const raw = JSON.stringify(session);

    await pool.query(
      `UPDATE tickets SET
        payment_status = 'paid',
        payment_transaction_id = $2,
        payment_paid_at = NOW(),
        payment_method = 'stripe',
        payment_raw = $3::jsonb,
        updated_at = NOW()
      WHERE id = $1`,
      [ticket.id, txId, raw]
    );
  }

  return res.json({ received: true });
}

/**
 * @param {import('express').Express} app
 */
export function registerStripePaymentRoutes(app) {
  app.post("/api/webpay-create", authMiddleware, express.json(), async (req, res) => {
    const body = req.body || {};
    if (!body.ticket_id || !body.order_number || body.total_price === undefined) {
      return res.status(400).json({ error: "Missing ticket_id, order_number, total_price" });
    }
    if (typeof body.total_price !== "number" || body.total_price <= 0) {
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

    const sk = process.env.STRIPE_SECRET_KEY;
    if (!sk) {
      return res.status(503).json({
        error:
          "Stripe не настроен: задайте STRIPE_SECRET_KEY на сервере (и STRIPE_WEBHOOK_SECRET для webhook).",
      });
    }

    const stripe = new Stripe(sk);
    let baseUrl = body.base_url || req.headers.origin || "";
    baseUrl = String(baseUrl).replace(/\/$/, "");
    if (!baseUrl) baseUrl = "http://localhost:8080";

    const orderNumber = String(body.order_number);
    const totalRub = Number(body.total_price);
    const unitAmount = Math.max(1, Math.round(totalRub * 100));

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "rub",
              product_data: {
                name: `Заказ ${orderNumber}`,
                description: "Оплата билета",
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/payment/success?order=${encodeURIComponent(orderNumber)}`,
        cancel_url: `${baseUrl}/payment/cancel?order=${encodeURIComponent(orderNumber)}`,
        metadata: {
          order_number: orderNumber,
          ticket_id: String(body.ticket_id),
        },
        client_reference_id: orderNumber,
      });

      if (!session.url) {
        return res.status(500).json({ error: "Stripe не вернул URL сессии" });
      }

      await pool.query(
        `UPDATE tickets SET payment_method = 'stripe', payment_raw = $2::jsonb, updated_at = NOW()
         WHERE id = $1::uuid AND user_id = $3::uuid AND order_number = $4`,
        [
          body.ticket_id,
          JSON.stringify({ stripe_checkout_session_id: session.id, at: new Date().toISOString() }),
          req.userId,
          orderNumber,
        ]
      );

      return res.json({
        url: session.url,
        order_number: orderNumber,
      });
    } catch (e) {
      console.error("[stripe] checkout.sessions.create", e);
      const msg = e instanceof Error ? e.message : "Stripe error";
      return res.status(502).json({ error: msg });
    }
  });
}
