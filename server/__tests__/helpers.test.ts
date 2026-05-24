import { describe, expect, it } from "vitest";
import md5 from "md5";

import { createInitSignatureV2, parseBoolLike, verifyNotifySignature } from "../webpayNode.js";

describe("helpers / webpay utils", () => {
  it("parseBoolLike handles bool-like values", () => {
    expect(parseBoolLike(true)).toBe(true);
    expect(parseBoolLike(false)).toBe(false);
    expect(parseBoolLike("true")).toBe(true);
    expect(parseBoolLike("1")).toBe(true);
    expect(parseBoolLike("0")).toBe(false);
    expect(parseBoolLike("false")).toBe(false);
    expect(parseBoolLike(1)).toBe(true);
    expect(parseBoolLike(0)).toBe(false);
    expect(parseBoolLike("unknown")).toBeNull();
  });

  it("creates deterministic init signature", () => {
    const signature = createInitSignatureV2({
      wsb_seed: "seed",
      wsb_storeid: "store",
      wsb_customer_id: "cust",
      wsb_order_num: "T100",
      wsb_test: "1",
      wsb_currency_id: "933",
      wsb_total: "100.00",
      wsb_operation_type: "payment",
      secret_key: "secret",
    });

    expect(signature).toMatch(/^[a-f0-9]{40}$/);
  });

  it("verifies notify signature", () => {
    const secret = "notify-secret";
    const payload = {
      batch_timestamp: "20250101010101",
      currency_id: "933",
      amount: "100.00",
      payment_method: "CC",
      order_id: "123",
      site_order_id: "T100",
      transaction_id: "TRX100",
      payment_type: "payment",
      rrn: "RRN1",
    };
    const str =
      payload.batch_timestamp +
      payload.currency_id +
      payload.amount +
      payload.payment_method +
      payload.order_id +
      payload.site_order_id +
      payload.transaction_id +
      payload.payment_type +
      payload.rrn +
      secret;
    const signature = md5(str);

    expect(
      verifyNotifySignature({
        ...payload,
        wsb_signature: signature,
        secret_key: secret,
      }),
    ).toBe(true);
  });
});
