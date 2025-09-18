# Script de emergencia para resolver problemas do emulador
# StarterKit Advances

Write-Host "=== CORRECAO DE EMULADOR ===" -ForegroundColor Red

# 1. Parar todos os processos do emulador
Write-Host "Parando todos os processos do emulador..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*emulator*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process | Where-Object {$_.ProcessName -like "*qemu*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process | Where-Object {$_.ProcessName -like "*adb*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 3

# 2. Limpar cache do emulador
Write-Host "Limpando cache do emulador..." -ForegroundColor Yellow
$avdPath = "$env:USERPROFILE\.android\avd\Pixel_API_34.avd"
if (Test-Path $avdPath) {
    Remove-Item "$avdPath\*.lock" -Force -ErrorAction SilentlyContinue
    Remove-Item "$avdPath\snapshots" -Recurse -Force -ErrorAction SilentlyContinue
}

# 3. Reiniciar ADB
Write-Host "Reiniciando ADB..." -ForegroundColor Yellow
& "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" kill-server
Start-Sleep -Seconds 2
& "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" start-server

# 4. Verificar se AVD existe
Write-Host "Verificando AVDs disponiveis..." -ForegroundColor Yellow
& "C:\Users\Advances\AppData\Local\Android\Sdk\emulator\emulator.exe" -list-avds

Write-Host "=== CORRECAO CONCLUIDA ===" -ForegroundColor Green
Write-Host "Agora execute: .\run-android-fixed.ps1" -ForegroundColor Cyan
