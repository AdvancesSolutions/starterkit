// Versão React Native do figmaUtil.js (sem axios, usando fetch nativo)

// Valores hardcoded para React Native
const FIGMA_API_KEY = 'SEU_FIGMA_API_KEY_AQUI';
const FIGMA_FILE_ID = 'COLOQUE_SEU_FILE_ID_AQUI';
const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Converte cor RGB para HEX
 * @param {Object} color - Objeto de cor do Figma
 * @returns {string} Cor em formato HEX
 */
const rgbToHex = (color) => {
  if (!color) return '#000000';
  
  const r = Math.round((color.r || 0) * 255);
  const g = Math.round((color.g || 0) * 255);
  const b = Math.round((color.b || 0) * 255);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * Função para fazer requisições HTTP usando fetch nativo
 * @param {string} url - URL da requisição
 * @param {Object} options - Opções da requisição
 * @returns {Promise<Object>} Resposta da requisição
 */
const makeRequest = async (url, options = {}) => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'X-Figma-Token': FIGMA_API_KEY,
      'Content-Type': 'application/json',
      ...options.headers
    },
    timeout: 10000
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
};

/**
 * Lista todas as páginas do arquivo Figma
 * @param {string} fileId - ID do arquivo Figma
 * @returns {Promise<Object>} Dados das páginas em JSON
 */
const getPages = async (fileId = FIGMA_FILE_ID) => {
  try {
    if (!fileId || fileId === 'COLOQUE_SEU_FILE_ID_AQUI') {
      throw new Error('File ID não configurado. Edite FIGMA_FILE_ID no arquivo figma.env');
    }

    console.log('🔍 Buscando páginas do Figma...');
    console.log(`📁 File ID: ${fileId}`);

    const fileData = await makeRequest(`${FIGMA_API_BASE}/files/${fileId}`);

    // Extrair páginas do documento
    const pages = fileData.document.children.map(page => ({
      id: page.id,
      name: page.name,
      type: page.type
    }));
    
    const result = {
      file: {
        name: fileData.name,
        lastModified: fileData.lastModified
      },
      pages: pages
    };
    
    console.log('📄 Páginas encontradas:');
    console.log(JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao buscar páginas:', error.message);
    if (error.message.includes('403')) {
      console.error('💡 Verifique se a FIGMA_API_KEY tem permissões adequadas');
    }
    throw error;
  }
};

/**
 * Lista todas as cores do design system do arquivo Figma
 * @param {string} fileId - ID do arquivo Figma
 * @returns {Promise<Object>} Dados das cores em JSON com valores HEX
 */
const getColors = async (fileId = FIGMA_FILE_ID) => {
  try {
    if (!fileId || fileId === 'COLOQUE_SEU_FILE_ID_AQUI') {
      throw new Error('File ID não configurado. Edite FIGMA_FILE_ID no arquivo figma.env');
    }

    console.log('🎨 Buscando cores do design system...');
    console.log(`📁 File ID: ${fileId}`);

    const fileData = await makeRequest(`${FIGMA_API_BASE}/files/${fileId}`);

    // Buscar por estilos de cor
    const colorStyles = [];
    
    // Função recursiva para buscar cores em todos os nós
    const findColors = (node) => {
      if (node.fills) {
        node.fills.forEach(fill => {
          if (fill.type === 'SOLID' && fill.color) {
            const hexColor = rgbToHex(fill.color);
            colorStyles.push({
              name: node.name || 'Cor sem nome',
              id: node.id,
              hex: hexColor,
              rgb: fill.color
            });
          }
        });
      }
      
      if (node.children) {
        node.children.forEach(child => findColors(child));
      }
    };

    // Buscar em todas as páginas
    fileData.document.children.forEach(page => {
      findColors(page);
    });
    
    const result = {
      file: {
        name: fileData.name,
        lastModified: fileData.lastModified
      },
      colors: colorStyles
    };
    
    console.log('🌈 Cores encontradas:');
    console.log(JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao buscar cores:', error.message);
    if (error.message.includes('403')) {
      console.error('💡 Verifique se a FIGMA_API_KEY tem permissões adequadas');
    }
    throw error;
  }
};

/**
 * Lista todos os componentes principais do arquivo Figma
 * @param {string} fileId - ID do arquivo Figma
 * @returns {Promise<Object>} Dados dos componentes em JSON
 */
const getComponents = async (fileId = FIGMA_FILE_ID) => {
  try {
    if (!fileId || fileId === 'COLOQUE_SEU_FILE_ID_AQUI') {
      throw new Error('File ID não configurado. Edite FIGMA_FILE_ID no arquivo figma.env');
    }

    console.log('🧩 Buscando componentes do Figma...');
    console.log(`📁 File ID: ${fileId}`);

    const fileData = await makeRequest(`${FIGMA_API_BASE}/files/${fileId}`);

    // Buscar por componentes
    const components = [];
    
    // Função recursiva para buscar componentes em todos os nós
    const findComponents = (node) => {
      if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          description: node.description || 'Sem descrição'
        });
      }
      
      if (node.children) {
        node.children.forEach(child => findComponents(child));
      }
    };

    // Buscar em todas as páginas
    fileData.document.children.forEach(page => {
      findComponents(page);
    });
    
    const result = {
      file: {
        name: fileData.name,
        lastModified: fileData.lastModified
      },
      components: components
    };
    
    console.log('🔧 Componentes encontrados:');
    console.log(JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao buscar componentes:', error.message);
    if (error.message.includes('403')) {
      console.error('💡 Verifique se a FIGMA_API_KEY tem permissões adequadas');
    }
    throw error;
  }
};

/**
 * Verifica se a conexão com a API do Figma está funcionando
 * @returns {Promise<boolean>} True se conectado, false caso contrário
 */
const checkConnection = async () => {
  try {
    console.log('🔌 Verificando conexão com API do Figma...');
    
    const userData = await makeRequest(`${FIGMA_API_BASE}/me`);
    
    console.log('✅ Conexão com API do Figma estabelecida!');
    console.log('👤 Usuário:', userData.email);
    
    return true;
  } catch (error) {
    console.error('❌ Erro na conexão com API do Figma:', error.message);
    if (error.message.includes('403')) {
      console.error('💡 Verifique se a FIGMA_API_KEY está correta e tem permissões adequadas');
    }
    return false;
  }
};

/**
 * Função utilitária para formatar dados do Figma para exibição
 * @param {Object} data - Dados do Figma
 * @param {string} type - Tipo de dados (pages, colors, components)
 * @returns {string} Dados formatados para exibição
 */
const formatFigmaData = (data, type) => {
  if (!data) return 'Nenhum dado encontrado';

  switch (type) {
    case 'pages':
      return data.pages?.map(page => 
        `📄 ${page.name} (ID: ${page.id})`
      ).join('\n') || 'Nenhuma página encontrada';
    
    case 'colors':
      return data.colors?.map(color => 
        `🎨 ${color.name}: ${color.hex || color.value}`
      ).join('\n') || 'Nenhuma cor encontrada';
    
    case 'components':
      return data.components?.map(component => 
        `🧩 ${component.name} (ID: ${component.id})`
      ).join('\n') || 'Nenhum componente encontrado';
    
    default:
      return JSON.stringify(data, null, 2);
  }
};

export default {
  getPages,
  getColors,
  getComponents,
  checkConnection,
  formatFigmaData,
  rgbToHex
};