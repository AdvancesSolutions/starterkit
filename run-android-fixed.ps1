# Script PowerShell otimizado para Android Emulator
# StarterKit Advances - Versao Corrigida

Write-Host "=== STARTERKIT ADVANCES AUTOMATION ===" -ForegroundColor Green
Write-Host "Iniciando emulador com configuracoes otimizadas..." -ForegroundColor Yellow

# 1. Limpar processos antigos
Write-Host "Limpando processos antigos..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*emulator*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process | Where-Object {$_.ProcessName -like "*qemu*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# 2. Reiniciar ADB
Write-Host "Reiniciando servidor ADB..." -ForegroundColor Yellow
& "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" kill-server
Start-Sleep -Seconds 3
& "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" start-server
Start-Sleep -Seconds 2

# 3. Iniciar emulador com configuracoes otimizadas
Write-Host "Iniciando emulador com configuracoes otimizadas..." -ForegroundColor Yellow
$emulatorArgs = @(
    "-avd", "Pixel_API_34",
    "-no-snapshot-load",
    "-no-snapshot-save", 
    "-wipe-data",
    "-memory", "2048",
    "-cores", "2",
    "-gpu", "swiftshader_indirect"
)

Start-Process -FilePath "C:\Users\Advances\AppData\Local\Android\Sdk\emulator\emulator.exe" -ArgumentList $emulatorArgs -WindowStyle Normal

# 4. Aguardar emulador inicializar
Write-Host "Aguardando emulador inicializar (pode levar 2-3 minutos)..." -ForegroundColor Yellow
$maxAttempts = 90  # 7.5 minutos
$attempt = 0
$deviceOnline = $false

while (-not $deviceOnline -and $attempt -lt $maxAttempts) {
    $attempt++
    Write-Host "Verificando dispositivo... (tentativa $attempt/$maxAttempts)" -ForegroundColor Cyan
    
    try {
        $adbOutput = & "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices 2>$null
        
        if ($adbOutput -match "emulator-5554\s+device") {
            $deviceOnline = $true
            Write-Host "Emulador online detectado!" -ForegroundColor Green
        } else {
            Write-Host "Aguardando... ($attempt/$maxAttempts)" -ForegroundColor Yellow
            Start-Sleep -Seconds 5
        }
    } catch {
        Write-Host "Erro ao verificar dispositivo: $($_.Exception.Message)" -ForegroundColor Red
        Start-Sleep -Seconds 5
    }
}

if (-not $deviceOnline) {
    Write-Host "Timeout: Emulador nao ficou online em 7.5 minutos" -ForegroundColor Red
    Write-Host "Tente reiniciar o computador e executar novamente" -ForegroundColor Yellow
    exit 1
}

# 5. Aguardar sistema Android carregar completamente
Write-Host "Aguardando sistema Android carregar..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# 6. Verificar se emulador esta responsivo
Write-Host "Verificando se emulador esta responsivo..." -ForegroundColor Yellow
$maxBootAttempts = 12
$bootAttempt = 0
$systemReady = $false

while (-not $systemReady -and $bootAttempt -lt $maxBootAttempts) {
    $bootAttempt++
    Write-Host "Verificando sistema... (tentativa $bootAttempt/$maxBootAttempts)" -ForegroundColor Cyan
    
    try {
        $bootComplete = & "C:\Users\Advances\AppData\Local\Android\Sdk\platform-tools\adb.exe" shell getprop sys.boot_completed 2>$null
        
        if ($bootComplete -eq "1") {
            $systemReady = $true
            Write-Host "Sistema Android carregado!" -ForegroundColor Green
        } else {
            Write-Host "Sistema ainda carregando... aguardando 10 segundos" -ForegroundColor Yellow
            Start-Sleep -Seconds 10
        }
    } catch {
        Write-Host "Aguardando sistema... ($bootAttempt/$maxBootAttempts)" -ForegroundColor Yellow
        Start-Sleep -Seconds 10
    }
}

# 7. Entrar na pasta do projeto
Write-Host "Entrando na pasta do projeto..." -ForegroundColor Yellow
Set-Location "D:\CLIENTES\BeepApp\app"

# 8. Iniciar servidor Expo
Write-Host "Iniciando servidor Expo..." -ForegroundColor Yellow
Write-Host "QR Code sera exibido no terminal" -ForegroundColor Cyan
Write-Host "Instale o Expo Go no emulador e escaneie o QR code" -ForegroundColor Cyan

try {
    npx expo start --android
    Write-Host "App iniciado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao iniciar app: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Tente executar manualmente: npx expo start --android" -ForegroundColor Yellow
    exit 1
}

Write-Host "=== PROCESSO CONCLUIDO ===" -ForegroundColor Green
Write-Host "App StarterKit Advances esta rodando!" -ForegroundColor Cyan
