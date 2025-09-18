# 🚀 StarterKit Advances

Um projeto React Native (Expo) totalmente automatizado com integração direta à API do Figma, pronto para rodar no Android Emulator do Windows.

## ✨ Características

- **React Native + Expo**: Framework moderno para desenvolvimento mobile
- **Integração Figma**: Conexão direta com a API do Figma
- **Automação Completa**: Scripts PowerShell para Android Emulator
- **Design System**: Extração automática de cores, componentes e páginas
- **Interface Moderna**: UI responsiva com Tailwind RN
- **Configuração Zero**: Pronto para usar imediatamente

## 🚀 Instalação e Execução

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar File ID do Figma
Edite o arquivo `figma.env` e substitua `COLOQUE_SEU_FILE_ID_AQUI` pelo ID do seu arquivo Figma:

```env
FIGMA_API_KEY=SEU_FIGMA_API_KEY_AQUI
FIGMA_FILE_ID=SEU_FILE_ID_AQUI
```

**Como obter o File ID:**
1. Abra seu arquivo no Figma
2. Copie o ID da URL: `https://www.figma.com/file/SEU_FILE_ID_AQUI/nome-do-arquivo`

### 3. Executar no Android Emulator

#### Opção 1: Script Automatizado (Recomendado)
```bash
.\run-android-fixed.ps1
```

#### Opção 2: Execução Manual
```bash
npx expo start --android
```

#### Opção 3: Expo Go
```bash
npx expo start
# Escaneie o QR code com o app Expo Go
```

## 📱 Funcionalidades

### Interface Principal
- **Verificar Conexão**: Testa a conexão com a API do Figma
- **Listar Páginas**: Extrai todas as páginas do arquivo Figma
- **Listar Cores**: Extrai cores do design system em formato HEX
- **Listar Componentes**: Lista componentes principais do Figma

### Scripts CLI
```bash
# Listar páginas do Figma
npm run figma:pages

# Listar cores do design system
npm run figma:colors

# Listar componentes
npm run figma:components
```

## 🛠️ Estrutura do Projeto

```
starterkit-advances/
├── App.js                          # Componente principal
├── app.json                        # Configuração Expo
├── package.json                    # Dependências e scripts
├── metro.config.js                 # Configuração Metro
├── figma.env                       # Variáveis de ambiente Figma
├── utils/
│   └── figmaUtilRN.js             # Utilitários Figma (React Native)
├── scripts/
│   ├── run-android-fixed.ps1      # Script automatizado Android
│   ├── run-android-quick.ps1      # Script rápido Android
│   └── fix-emulator.ps1           # Script de correção emulador
└── README.md                       # Documentação
```

## 🔧 Configuração Avançada

### Android SDK
O projeto está configurado para usar o Android SDK em:
```
C:/Users/Advances/AppData/Local/Android/Sdk
```

### Emulador
- **AVD**: Pixel_API_34
- **Porta ADB**: 5037
- **Porta Expo**: 8081

## 📋 Requisitos

- **Node.js**: 18+ (recomendado 20+)
- **npm**: 9+
- **Android Studio**: Para emulador
- **Expo CLI**: `npm install -g @expo/cli`
- **PowerShell**: Para scripts de automação

## 🚀 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia servidor Expo |
| `npm run android` | Executa no Android |
| `npm run android:auto` | Script automatizado completo |
| `npm run android:quick` | Execução rápida (emulador já rodando) |
| `npm run figma:pages` | Lista páginas do Figma |
| `npm run figma:colors` | Lista cores do Figma |
| `npm run figma:components` | Lista componentes do Figma |

## 🔗 Integração Figma

O projeto se conecta diretamente à API do Figma usando:
- **API Base**: `https://api.figma.com/v1`
- **Autenticação**: Token via header `X-Figma-Token`
- **Métodos**: GET para extrair dados do arquivo

### Dados Extraídos
- **Páginas**: Nome, ID e tipo de cada página
- **Cores**: Cores do design system com valores HEX
- **Componentes**: Componentes principais com descrições

## 🐛 Solução de Problemas

### Emulador não inicia
```bash
.\fix-emulator.ps1
```

### Erro de conexão Metro
```bash
npx expo start --clear
```

### Problemas com ADB
```bash
# Reiniciar ADB
adb kill-server
adb start-server
```

## 📄 Licença

Este projeto é propriedade da **AdvancesSolutions** e está disponível para uso interno.

## 👥 Suporte

Para suporte técnico, entre em contato:
- **Email**: info@advances.com.br
- **GitHub**: [AdvancesSolutions/starterkit](https://github.com/AdvancesSolutions/starterkit)

---

**Desenvolvido com ❤️ pela AdvancesSolutions**