# Script de automação para publicar no GitHub
# StarterKit Advances

Write-Host "=== AUTOMATIZACAO GITHUB ===" -ForegroundColor Green
Write-Host "Publicando StarterKit Advances no GitHub..." -ForegroundColor Yellow

# 1. Verificar se estamos no diretório correto
Write-Host "Verificando diretorio..." -ForegroundColor Cyan
$currentDir = Get-Location
Write-Host "Diretorio atual: $currentDir" -ForegroundColor White

# 2. Verificar se Git está instalado
Write-Host "Verificando Git..." -ForegroundColor Cyan
try {
    $gitVersion = git --version
    Write-Host "Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Git nao encontrado!" -ForegroundColor Red
    exit 1
}

# 3. Inicializar repositório Git
Write-Host "Inicializando repositorio Git..." -ForegroundColor Cyan
git init

# 4. Configurar usuário Git
Write-Host "Configurando usuario Git..." -ForegroundColor Cyan
git config user.name "AdvancesSolutions"
git config user.email "info@advances.com.br"

# 5. Adicionar arquivos
Write-Host "Adicionando arquivos ao Git..." -ForegroundColor Cyan
git add .

# 6. Verificar status
Write-Host "Verificando status do Git..." -ForegroundColor Cyan
git status

# 7. Fazer commit
Write-Host "Fazendo commit inicial..." -ForegroundColor Cyan
git commit -m "🚀 StarterKit Advances - Projeto inicial pronto"

# 8. Adicionar remote origin
Write-Host "Adicionando remote origin..." -ForegroundColor Cyan
git remote add origin https://github.com/AdvancesSolutions/starterkit.git

# 9. Configurar branch main
Write-Host "Configurando branch main..." -ForegroundColor Cyan
git branch -M main

# 10. Fazer push
Write-Host "Fazendo push para GitHub..." -ForegroundColor Cyan
git push -u origin main

# 11. Verificar resultado
Write-Host "Verificando resultado..." -ForegroundColor Cyan
git log --oneline
git remote -v

Write-Host "=== PROCESSO CONCLUIDO ===" -ForegroundColor Green
Write-Host "Projeto publicado em: https://github.com/AdvancesSolutions/starterkit" -ForegroundColor Cyan
Write-Host "Verifique o repositorio no GitHub!" -ForegroundColor Yellow
