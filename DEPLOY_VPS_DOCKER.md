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
