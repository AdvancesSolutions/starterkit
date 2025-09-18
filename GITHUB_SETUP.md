# 🚀 Instruções para Subir no GitHub

## Passos para subir o StarterKit Advances no GitHub

### 1. Configurar Git (se ainda não configurado)
```bash
git config --global user.name "AdvancesSolutions"
git config --global user.email "info@advances.com.br"
```

### 2. Inicializar repositório
```bash
git init
git add .
git commit -m "Initial commit: StarterKit Advances - React Native + Figma Integration"
```

### 3. Conectar ao repositório remoto
```bash
git remote add origin https://github.com/AdvancesSolutions/starterkit.git
```

### 4. Fazer push para o GitHub
```bash
git branch -M main
git push -u origin main
```

### 5. Verificar no GitHub
Acesse: https://github.com/AdvancesSolutions/starterkit

## 📁 Arquivos que serão enviados

- ✅ **App.js** - Componente principal React Native
- ✅ **app.json** - Configuração Expo
- ✅ **package.json** - Dependências e scripts
- ✅ **metro.config.js** - Configuração Metro
- ✅ **figma.env** - Variáveis de ambiente Figma
- ✅ **utils/figmaUtilRN.js** - Utilitários Figma
- ✅ **scripts/** - Scripts PowerShell de automação
- ✅ **README.md** - Documentação completa
- ✅ **.gitignore** - Arquivos ignorados pelo Git

## 🔒 Arquivos NÃO enviados (por segurança)

- ❌ **node_modules/** - Dependências (serão reinstaladas)
- ❌ **.expo/** - Cache do Expo
- ❌ **android/build/** - Build do Android
- ❌ **ios/build/** - Build do iOS

## 🎯 Resultado Final

O repositório ficará com:
- Código fonte completo
- Documentação detalhada
- Scripts de automação
- Configurações prontas para uso
- Instruções de instalação

**Pronto para ser clonado e usado por qualquer desenvolvedor!** 🚀
