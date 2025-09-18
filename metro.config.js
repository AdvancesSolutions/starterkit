const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configurações otimizadas para resolver problemas de módulos
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configurações para resolver problemas de polyfills
config.resolver.alias = {
  'crypto': 'react-native-crypto',
  'stream': 'readable-stream',
  'buffer': '@craftzdog/react-native-buffer',
};

// Configurações de transformação
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;