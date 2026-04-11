import fetch from "node-fetch";

/**
 * @param {string} phone E.164 +7...
 * @param {string} message
 */
export async function sendExolveSms(phone, message) {
  const exolveApiKey = process.env.EXOLVE_API_KEY;
  if (!exolveApiKey) {
    throw new Error("EXOLVE_API_KEY is not configured");
  }

  const exolveSender = process.env.EXOLVE_SENDER || "";

  let normalizedPhone = phone.replace(/\D/g, "");
  if (normalizedPhone.startsWith("8") && normalizedPhone.length === 11) {
    normalizedPhone = "7" + normalizedPhone.substring(1);
  } else if (normalizedPhone.length === 10) {
    normalizedPhone = "7" + normalizedPhone;
  }

  const apiUrl = "https://api.exolve.ru/messaging/v1/SendSMS";

  let senderNumber = "";
  if (exolveSender) {
    senderNumber = exolveSender;
    if (/^[\d+]/.test(senderNumber)) {
      senderNumber = senderNumber.replace(/\D/g, "");
    }
  }

  const requestBody = {
    text: message,
    destination: normalizedPhone,
  };
  if (senderNumber) {
    requestBody.number = senderNumber;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  let response;
  try {
    response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${exolveApiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timeoutId);
    if (e.name === "AbortError") {
      throw new Error("МТС Exolve API timeout");
    }
    throw e;
  }
  clearTimeout(timeoutId);

  const responseText = await response.text();
  let result;
  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error(`МТС Exolve invalid JSON: ${responseText.slice(0, 200)}`);
  }

  if (response.ok && result.message_id) {
    return { success: true, message_id: result.message_id };
  }

  const errorMsg =
    typeof result.error === "object"
      ? JSON.stringify(result.error)
      : result.error || result.message || "Unknown error";
  throw new Error(`МТС Exolve: ${errorMsg}`);
}
