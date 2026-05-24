# VPS deploy (Docker, single host)

## 1) First login

```bash
ssh root@<YOUR_IPV4>
apt update && apt upgrade -y
apt install -y ca-certificates curl git ufw
```

## 2) Install Docker + Compose plugin

```bash
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable docker
systemctl start docker
```

## 3) Open firewall ports

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw --force enable
ufw status
```

## 4) Clone project and configure env

```bash
mkdir -p /opt
cd /opt
git clone https://github.com/Hnt899/trip-spark-90
cd /opt/trip-spark-90
cp .env.vps.example .env.vps
```

Edit `/opt/trip-spark-90/.env.vps`:

- set `JWT_SECRET` and `POSTGRES_PASSWORD`
- set `ALLOWED_ORIGINS=http://<YOUR_IPV4>`
- set `YOOKASSA_SHOP_ID`, `YOOKASSA_SECRET_KEY`
- keep `SKIP_WEBPAY=false` for demo payments

## 5) First start

```bash
docker compose --env-file .env.vps up -d --build
docker compose ps
docker compose logs -f app
```

Health checks:

```bash
curl http://<YOUR_IPV4>/api/ping
```

## 6) Setup backup cron (daily, keep 7)

```bash
chmod +x /opt/trip-spark-90/scripts/backup-db.sh
crontab -e
```

Add:

```cron
0 3 * * * /opt/trip-spark-90/scripts/backup-db.sh >> /opt/trip-spark-90/backups/backup.log 2>&1
```

## 7) GitHub auto-deploy on push main

Workflow: `.github/workflows/deploy-vps.yml`

Add repository secrets:

- `VPS_HOST` = your IPv4
- `VPS_USER` = `root`
- `VPS_SSH_KEY` = private key content used for ssh auth
- `VPS_PORT` = `22` (optional)

The workflow will:

1. SSH to VPS
2. Pull latest `main`
3. Run `docker compose --env-file .env.vps up -d --build --remove-orphans`

## 8) Manual rollback (if needed)

```bash
cd /opt/trip-spark-90
git log --oneline -n 5
git checkout <old_commit_sha>
docker compose --env-file .env.vps up -d --build
```

## 9) After first start (CORS, content, login, bot)

### Fix `Error: CORS` in logs

In `.env.vps` set **exactly** the URL you open in browser (no trailing slash):

```env
ALLOWED_ORIGINS=http://87.232.65.135
```

Then restart app:

```bash
cd /opt/trip-spark-90
docker compose --env-file .env.vps up -d --force-recreate app
```

Check: open site → F12 → Network → `/api/...` should be **200**, not failed/CORS.

### Fill blog / routes / reference / guide (empty DB)

Run once inside the app container:

```bash
cd /opt/trip-spark-90
docker compose --env-file .env.vps exec app node scripts/seed-content.js
docker compose --env-file .env.vps exec app node scripts/seed-reference.js
docker compose --env-file .env.vps exec app node scripts/seed-guide.js
```

Refresh the site.

### Create demo user (password login)

```bash
docker compose --env-file .env.vps exec app node scripts/create-user.js you@mail.com YourPassword123 --admin
```

Log in via **«Войти по паролю»** (email + password).  
Email OTP needs `SMTP_*` in `.env.vps`.

### Trains schedule (RZD) empty or error

On VPS test API:

```bash
curl -s "http://127.0.0.1/api/train-search/rzd?from=Москва&to=Санкт-Петербург&date=2026-05-26" | head -c 400
docker compose --env-file .env.vps logs app --tail 30
```

If timeout — add to `.env.vps`:

```env
RZD_FETCH_TIMEOUT_MS=20000
RZD_MAX_RID_ATTEMPTS=12
```

Then `docker compose --env-file .env.vps up -d --force-recreate app`.

Cities must match `integrations/rzd-pass/station-codes.json` exactly: `Москва`, `Санкт-Петербург`, `Казань`, etc.

If RZD returns **403** on VPS, the API serves **demo trains** (`RZD_DEMO_FALLBACK=1`, default). Disable with `RZD_DEMO_FALLBACK=0` in `.env.vps`.

### AI support chat

Set `HF_API_TOKEN=hf_...` in `.env.vps`, then:

```bash
docker compose --env-file .env.vps up -d --force-recreate app
```
