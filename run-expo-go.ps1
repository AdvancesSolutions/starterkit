# Script PowerShell para executar app via Expo Go
# BeepApp Figma Integration

Write-Host "Iniciando app via Expo Go..." -ForegroundColor Green

# 1. Verificar se emulador esta rodando
Write-Host "Verificando se emulador esta rodando..." -ForegroundColor Yellow
$adbOutput = & "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices 2>$null

if ($adbOutput -match "emulator-5554\s+device") {
    Write-Host "Emulador detectado!" -ForegroundColor Green
} else {
    Write-Host "Emulador nao encontrado! Iniciando emulador..." -ForegroundColor Yellow
    
    # Reiniciar ADB
    & "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" kill-server
    Start-Sleep -Seconds 2
    & "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" start-server
    Start-Sleep -Seconds 3
    
    # Iniciar emulador
    Start-Process -FilePath "C:\Users\Advances\AppData\Local\Android\Sdk\emulator\emulator.exe" -ArgumentList "-avd", "Pixel_API_34" -WindowStyle Minimized
    
    # Aguardar emulador
    Write-Host "Aguardando emulador inicializar..." -ForegroundColor Yellow
    $maxAttempts = 60
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
            Write-Host "Aguardando emulador... 5 segundos" -ForegroundColor Yellow
            Start-Sleep -Seconds 5
        }
    }
    
    if (-not $deviceOnline) {
        Write-Host "Timeout: Emulador nao ficou online" -ForegroundColor Red
        exit 1
    }
}

# 2. Entrar na pasta do projeto
Write-Host "Entrando na pasta do projeto..." -ForegroundColor Yellow
Set-Location "D:\CLIENTES\BeepApp\app"

# 3. Iniciar servidor Expo
Write-Host "Iniciando servidor Expo..." -ForegroundColor Yellow
Write-Host "Acesse o QR code no terminal ou use: exp://127.0.0.1:8081" -ForegroundColor Cyan
Write-Host "Instale o Expo Go no emulador e escaneie o QR code" -ForegroundColor Cyan

try {
    npx expo start
} catch {
    Write-Host "Erro ao iniciar servidor Expo: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
