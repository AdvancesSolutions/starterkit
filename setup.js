#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 BeepApp Figma Integration - Setup Automático\n');

// Verificar se figma.env existe
if (!fs.existsSync('./figma.env')) {
  console.log('❌ Arquivo figma.env não encontrado!');
  console.log('📝 Criando arquivo de configuração...');
  
  const envContent = `FIGMA_API_KEY=SEU_FIGMA_API_KEY_AQUI
FIGMA_FILE_ID=COLOQUE_SEU_FILE_ID_AQUI`;

  fs.writeFileSync('./figma.env', envContent);
  console.log('✅ Arquivo figma.env criado!');
}

// Verificar estrutura de diretórios
const dirs = ['android', 'assets', 'utils'];
dirs.forEach(dir => {
  if (!fs.existsSync(`./${dir}`)) {
    fs.mkdirSync(`./${dir}`);
    console.log(`📁 Diretório ${dir} criado!`);
  }
});

console.log('\n🎉 Setup concluído com sucesso!');
console.log('\n📋 Próximos passos:');
console.log('1. Edite figma.env e configure seu FIGMA_FILE_ID');
console.log('2. Execute: npm install');
console.log('3. Execute: npm run android');
console.log('\n💡 Para testar a integração Figma:');
console.log('- npm run figma:pages');
console.log('- npm run figma:colors');
console.log('- npm run figma:components');
console.log('\n🎯 O projeto está pronto para usar!');