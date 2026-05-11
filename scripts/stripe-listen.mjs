/**
 * Запуск Stripe CLI: прокси webhook на localhost (необязательно).
 * Локально оплату можно подтверждать без CLI: на success редиректе есть session_id → POST /api/stripe-sync-checkout.
 * CLI нужен, если хотите именно входящие webhook-события или прод-образ webhook.
 */
import { execSync, spawn } from "node:child_process";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
dotenv.config({ path: path.join(root, ".env") });
dotenv.config({ path: path.join(root, ".env.local"), override: true });

const forwardTo =
  process.env.STRIPE_LISTEN_FORWARD_TO ||
  "http://127.0.0.1:4000/api/stripe-webhook";

function resolveStripeExe() {
  const override = process.env.STRIPE_CLI_EXE?.trim();
  if (override && fs.existsSync(override)) return override;

  if (process.platform === "win32") {
    const local = process.env.LOCALAPPDATA || "";
    const linksExe = path.join(local, "Microsoft", "WinGet", "Links", "stripe.exe");
    if (fs.existsSync(linksExe)) return linksExe;

    const pkgsRoot = path.join(local, "Microsoft", "WinGet", "Packages");
    if (fs.existsSync(pkgsRoot)) {
      try {
        for (const d of fs.readdirSync(pkgsRoot)) {
          if (!/stripe/i.test(d)) continue;
          const exe = path.join(pkgsRoot, d, "stripe.exe");
          if (fs.existsSync(exe)) return exe;
        }
      } catch {
        /* ignore */
      }
    }

    try {
      const out = execSync(`cmd.exe /c where stripe`, {
        encoding: "utf8",
        timeout: 5000,
        windowsHide: true,
      }).trim();
      const first = out.split(/\r?\n/).find((line) => /\.exe\b/i.test(line));
      if (first && fs.existsSync(first.trim())) return first.trim();
    } catch {
      /* PATH ещё не обновился */
    }
  } else {
    try {
      const out = execSync("which stripe", {
        encoding: "utf8",
        timeout: 5000,
      }).trim();
      if (out) return out;
    } catch {
      /* */
    }
  }

  try {
    execSync("stripe --version", {
      stdio: "ignore",
      shell: true,
      timeout: 8000,
    });
    return "stripe";
  } catch {
    return null;
  }
}

const stripeExe = resolveStripeExe();

if (!stripeExe) {
  console.error("\n[stripe] Команда «stripe» не найдена. Установите Stripe CLI:\n");
  console.error("  Windows (winget):");
  console.error("    winget install Stripe.StripeCLI\n");
  console.error("  После установки:");
  console.error("    — полностью закройте VS Code/Cursor и откройте заново ИЛИ");
  console.error("    — новое окно PowerShell; либо укажите путь:");
  console.error("    setx STRIPE_CLI_EXE \"C:\\Users\\Вы\\AppData\\Local\\Microsoft\\WinGet\\Links\\stripe.exe\"\n");
  console.error("  Релизы вручную: https://github.com/stripe/stripe-cli/releases/latest\n");
  process.exit(1);
}

const stripeApiKey =
  process.env.STRIPE_API_KEY?.trim() || process.env.STRIPE_SECRET_KEY?.trim();

const childEnv = {
  ...process.env,
  ...(stripeApiKey ? { STRIPE_API_KEY: stripeApiKey } : {}),
};

if (!stripeApiKey) {
  console.warn(
    "[stripe] Нет STRIPE_SECRET_KEY/STRIPE_API_KEY в .env/.env.local — выполните один раз: stripe login\n"
  );
}

const child = spawn(stripeExe, ["listen", "--forward-to", forwardTo], {
  stdio: "inherit",
  shell: false,
  env: childEnv,
});

child.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

child.on("exit", (code) => process.exit(code ?? 0));
