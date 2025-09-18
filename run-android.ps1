# Script PowerShell para automatizar execucao do app Android
# BeepApp Figma Integration

Write-Host "Iniciando automacao do Android Emulator..." -ForegroundColor Green

# 1. Reiniciar o servidor ADB
Write-Host "Reiniciando servidor ADB..." -ForegroundColor Yellow
& "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" kill-server
Start-Sleep -Seconds 2
& "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" start-server
Start-Sleep -Seconds 3

# 2. Iniciar o emulador Pixel_API_34
Write-Host "Iniciando emulador Pixel_API_34..." -ForegroundColor Yellow
Start-Process -FilePath "C:\Users\Advances\AppData\Local\Android\Sdk\emulator\emulator.exe" -ArgumentList "-avd", "Pixel_API_34" -WindowStyle Minimized

# 3. Aguardar ate que o dispositivo esteja online
Write-Host "Aguardando emulador inicializar..." -ForegroundColor Yellow
$maxAttempts = 60  # 5 minutos maximo
$attempt = 0
$deviceOnline = $false

while (-not $deviceOnline -and $attempt -lt $maxAttempts) {
    $attempt++
    Write-Host "Verificando dispositivo... (tentativa $attempt/$maxAttempts)" -ForegroundColor Cyan
    
    $adbOutput = & "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices 2>$null
    
    if ($adbOutput -match "emulator-5554\s+device") {
        $deviceOnline = $true
        Write-Host "Emulador online detectado!" -ForegroundColor Green
    } else {
        Write-Host "Emulador ainda inicializando... aguardando 5 segundos" -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    }
}

if (-not $deviceOnline) {
    Write-Host "Timeout: Emulador nao ficou online em 5 minutos" -ForegroundColor Red
    Write-Host "Tente iniciar o emulador manualmente e execute novamente" -ForegroundColor Yellow
    exit 1
}

# 4. Entrar na pasta do projeto
Write-Host "Entrando na pasta do projeto..." -ForegroundColor Yellow
Set-Location "D:\CLIENTES\BeepApp\app"

# 5. Executar o app
Write-Host "Executando app no Android..." -ForegroundColor Yellow
Write-Host "O app sera compilado e instalado no emulador..." -ForegroundColor Cyan

try {
    npx expo run:android
    Write-Host "App iniciado no emulador Android com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao executar o app: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Verifique se o emulador esta funcionando corretamente" -ForegroundColor Yellow
    exit 1
}

Write-Host "Processo concluido!" -ForegroundColor Green
Write-Host "O app BeepApp Figma Integration esta rodando no emulador" -ForegroundColor Cyan
