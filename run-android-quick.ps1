# Script PowerShell rapido para executar app Android
# (quando emulador ja esta rodando)

Write-Host "Executando app Android rapidamente..." -ForegroundColor Green

# Verificar se emulador esta rodando
Write-Host "Verificando se emulador esta rodando..." -ForegroundColor Yellow
$adbOutput = & "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices 2>$null

if ($adbOutput -match "emulator-5554\s+device") {
    Write-Host "Emulador detectado!" -ForegroundColor Green
} else {
    Write-Host "Emulador nao encontrado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\run-android.ps1" -ForegroundColor Yellow
    exit 1
}

# Entrar na pasta do projeto
Write-Host "Entrando na pasta do projeto..." -ForegroundColor Yellow
Set-Location "D:\CLIENTES\BeepApp\app"

# Executar o app
Write-Host "Executando app no Android..." -ForegroundColor Yellow

try {
    npx expo run:android
    Write-Host "App iniciado no emulador Android com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao executar o app: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
