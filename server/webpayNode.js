import crypto from "crypto";
import md5 from "md5";

export function createInitSignatureV2(params) {
  const {
    wsb_seed,
    wsb_storeid,
    wsb_customer_id = "",
    wsb_order_num,
    wsb_test,
    wsb_currency_id,
    wsb_total,
    wsb_operation_type,
    secret_key,
  } = params;

  const signatureString =
    wsb_seed +
    wsb_storeid +
    wsb_customer_id +
    wsb_order_num +
    wsb_test +
    wsb_currency_id +
    wsb_total +
    wsb_operation_type +
    secret_key;

  return crypto.createHash("sha1").update(signatureString, "utf8").digest("hex");
}

/**
 * @param {Record<string, string> & { secret_key: string }} params
 */
export function verifyNotifySignature(params) {
  const { wsb_signature, secret_key, ...otherParams } = params;

  if (!wsb_signature || !secret_key) {
    return false;
  }

  const fieldOrder = [
    "batch_timestamp",
    "currency_id",
    "amount",
    "payment_method",
    "order_id",
    "site_order_id",
    "transaction_id",
    "payment_type",
    "rrn",
  ];

  let signatureString = fieldOrder.map((f) => otherParams[f] || "").join("");
  if (otherParams.card) {
    signatureString += otherParams.card;
  }
  signatureString += secret_key;

  const calculatedSignature = md5(signatureString);
  const receivedSignature = (wsb_signature || "").toLowerCase().trim();
  return calculatedSignature.toLowerCase() === receivedSignature;
}

export function parseBoolLike(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const lower = value.toLowerCase().trim();
    if (lower === "true" || lower === "1") return true;
    if (lower === "false" || lower === "0") return false;
  }
  return null;
}
