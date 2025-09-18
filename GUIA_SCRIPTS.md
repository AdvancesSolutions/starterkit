# 🚀 Guia de Scripts PowerShell - BeepApp Figma Integration

## 📋 Scripts Disponíveis

### 1. `run-android.ps1` - Automação Completa
**Descrição**: Script completo que automatiza todo o processo
**Uso**: `.\run-android.ps1` ou `npm run android:auto`

**O que faz**:
1. ✅ Reinicia o servidor ADB
2. ✅ Inicia o emulador Pixel_API_34
3. ✅ Aguarda o emulador ficar online (até 5 minutos)
4. ✅ Entra na pasta do projeto
5. ✅ Executa `npx expo run:android`
6. ✅ Mostra mensagem de sucesso

### 2. `run-android-quick.ps1` - Execução Rápida
**Descrição**: Script rápido para quando o emulador já está rodando
**Uso**: `.\run-android-quick.ps1` ou `npm run android:quick`

**O que faz**:
1. ✅ Verifica se emulador está rodando
2. ✅ Entra na pasta do projeto
3. ✅ Executa `npx expo run:android`

## 🎯 Como Usar

### Opção 1: Scripts PowerShell Diretos
```powershell
# Automação completa (recomendado)
.\run-android.ps1

# Execução rápida (se emulador já estiver rodando)
.\run-android-quick.ps1
```

### Opção 2: Via npm Scripts
```bash
# Automação completa
npm run android:auto

# Execução rápida
npm run android:quick

# Execução manual (sem automação)
npm run android
```

## 🔧 Scripts Figma (Funcionando)
```bash
# Listar páginas do Figma
npm run figma:pages

# Listar cores em HEX
npm run figma:colors

# Listar componentes
npm run figma:components
```

## 📱 Status do Projeto

- ✅ **Servidor Expo**: Rodando com tunnel
- ✅ **Integração Figma**: Funcionando perfeitamente
- ✅ **Scripts CLI**: Todos funcionando
- ✅ **Automação Android**: Scripts criados
- ✅ **App React Native**: Pronto para execução

## 🎉 Próximos Passos

1. **Execute o script completo**:
   ```powershell
   .\run-android.ps1
   ```

2. **Aguarde a compilação** (pode levar alguns minutos)

3. **Teste o app** no emulador com os 4 botões:
   - 🔌 Verificar Conexão
   - 📄 Listar Páginas
   - 🎨 Listar Cores
   - 🧩 Listar Componentes

## 🐛 Solução de Problemas

### Erro: "Execution Policy"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Emulador não inicia
- Verifique se o Android Studio está instalado
- Execute: `& "C:\Users\Advances\AppData\Local\Android\Sdk\emulator\emulator.exe" -list-avds`

### App não compila
- Verifique se o emulador está online: `adb devices`
- Execute: `npx expo install --fix`

## 🎯 Resultado Esperado

Após executar `.\run-android.ps1`, você deve ver:
- ✅ Emulador iniciando
- ✅ App compilando
- ✅ App instalando no emulador
- ✅ App abrindo com 4 botões funcionais
- ✅ Integração Figma funcionando

**O projeto está 100% automatizado e pronto para uso!** 🚀
