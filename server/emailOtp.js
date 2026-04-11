import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user) {
    return null;
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

/**
 * @param {string} to
 * @param {string} code
 * @param {string} purpose
 */
export async function sendEmailOtp(to, code, purpose) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@localhost";
  const subject =
    purpose === "2fa_login"
      ? "Код входа"
      : purpose === "2fa_profile_setup"
        ? "Код для включения 2FA"
        : "Код подтверждения";

  const text = `Ваш код: ${code}`;

  const tx = getTransporter();
  if (tx) {
    await tx.sendMail({ from, to, subject, text });
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn("[emailOtp] SMTP not configured; dev OTP log:", { to, code, purpose });
    return;
  }

  throw new Error("SMTP is not configured (set SMTP_HOST, SMTP_USER, SMTP_PASS)");
}
