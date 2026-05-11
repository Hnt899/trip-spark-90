/**
 * Запуск Stripe CLI: `npm run stripe:listen`
 */
import { execSync, spawn } from "node:child_process";
import process from "node:process";

const forwardTo =
  process.env.STRIPE_LISTEN_FORWARD_TO ||
  "http://127.0.0.1:4000/api/stripe-webhook";

function stripeAvailable() {
  try {
    execSync("stripe --version", { stdio: "ignore", shell: true, timeout: 8000 });
    return true;
  } catch {
    return false;
  }
}

if (!stripeAvailable()) {
  console.error("\n[stripe] Команда «stripe» не найдена. Установите Stripe CLI:\n");
  console.error("  Windows (winget):");
  console.error("    winget install Stripe.StripeCLI\n");
  console.error("  Затем закройте терминал, откройте новый и снова: npm run stripe:listen\n");
  console.error("  Либо скачайте .zip с GitHub:");
  console.error("    https://github.com/stripe/stripe-cli/releases/latest\n");
  process.exit(1);
}

const child = spawn("stripe", ["listen", "--forward-to", forwardTo], {
  stdio: "inherit",
  shell: true,
});

child.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

child.on("exit", (code) => process.exit(code ?? 0));
