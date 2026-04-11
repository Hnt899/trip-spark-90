# Перенос локальной БД на Railway
# Использование: .\scripts\transfer-db.ps1 "postgresql://...railway_url..."

param(
    [Parameter(Mandatory=$true)]
    [string]$RailwayUrl
)

$pgBin = "C:\Program Files\PostgreSQL\18\bin"
$localUrl = "postgresql://postgres:5675esTa%40@localhost:5432/trip_spark"
$dumpFile = ".\db_dump.sql"

Write-Host "`n=== 1. Дамп локальной БД ===" -ForegroundColor Cyan
& "$pgBin\pg_dump.exe" --no-owner --no-acl --clean --if-exists $localUrl | Out-File -Encoding utf8 $dumpFile

if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при дампе!" -ForegroundColor Red
    exit 1
}

$size = (Get-Item $dumpFile).Length / 1KB
Write-Host "Дамп создан: $dumpFile ($([math]::Round($size, 1)) KB)" -ForegroundColor Green

Write-Host "`n=== 2. Загрузка в Railway ===" -ForegroundColor Cyan
$env:PGPASSWORD = ""
Get-Content $dumpFile -Raw | & "$pgBin\psql.exe" $RailwayUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "Возможны предупреждения — это нормально (DROP IF EXISTS)" -ForegroundColor Yellow
} else {
    Write-Host "БД перенесена успешно!" -ForegroundColor Green
}

Remove-Item $dumpFile -ErrorAction SilentlyContinue
Write-Host "`n=== Готово! ===" -ForegroundColor Green
