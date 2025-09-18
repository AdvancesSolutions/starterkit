import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';

// Funções de teste para simular integração com Figma
const testConnection = async () => {
  return {
    status: 'success',
    message: 'Conexão com API do Figma estabelecida!',
    timestamp: new Date().toISOString(),
    user: 'usuario@exemplo.com'
  };
};

const testPages = async () => {
  return {
    pages: [
      { id: '1', name: 'Homepage', type: 'CANVAS' },
      { id: '2', name: 'Login', type: 'CANVAS' },
      { id: '3', name: 'Dashboard', type: 'CANVAS' }
    ],
    file: {
      name: 'StarterKit Advances Design System',
      lastModified: new Date().toISOString()
    }
  };
};

const testColors = async () => {
  return {
    colors: [
      { name: 'Primary Blue', hex: '#007AFF', id: '1' },
      { name: 'Success Green', hex: '#34C759', id: '2' },
      { name: 'Warning Orange', hex: '#FF9500', id: '3' },
      { name: 'Error Red', hex: '#FF3B30', id: '4' },
      { name: 'Neutral Gray', hex: '#8E8E93', id: '5' }
    ],
    file: {
      name: 'StarterKit Advances Design System',
      lastModified: new Date().toISOString()
    }
  };
};

const testComponents = async () => {
  return {
    components: [
      { name: 'Button Primary', id: '1', type: 'COMPONENT', description: 'Botão principal do app' },
      { name: 'Input Field', id: '2', type: 'COMPONENT', description: 'Campo de entrada de texto' },
      { name: 'Card Container', id: '3', type: 'COMPONENT', description: 'Container para cards' },
      { name: 'Navigation Bar', id: '4', type: 'COMPONENT', description: 'Barra de navegação' }
    ],
    file: {
      name: 'StarterKit Advances Design System',
      lastModified: new Date().toISOString()
    }
  };
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [resultType, setResultType] = useState('');

  const handleAction = async (action, type) => {
    setLoading(true);
    setResult('');
    setResultType(type);

    try {
      let data;
      
      switch (action) {
        case 'connection':
          data = await testConnection();
          break;
        case 'pages':
          data = await testPages();
          break;
        case 'colors':
          data = await testColors();
          break;
        case 'components':
          data = await testComponents();
          break;
        default:
          throw new Error('Ação não reconhecida');
      }

      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Erro: ${error.message}`);
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
              StarterKit Advances
            </Text>
            <Text style={{ fontSize: 18, color: '#666', textAlign: 'center' }}>
              React Native + Figma Integration
            </Text>
          </View>

          {/* Botões de Ação */}
          <View style={{ gap: 16, marginBottom: 24 }}>
            <TouchableOpacity
              onPress={() => handleAction('connection', 'connection')}
              style={{
                backgroundColor: '#007AFF',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
              disabled={loading}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                🔌 Verificar Conexão
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAction('pages', 'pages')}
              style={{
                backgroundColor: '#34C759',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
              disabled={loading}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                📄 Listar Páginas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAction('colors', 'colors')}
              style={{
                backgroundColor: '#AF52DE',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
              disabled={loading}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                🎨 Listar Cores
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAction('components', 'components')}
              style={{
                backgroundColor: '#FF9500',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
              disabled={loading}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                🧩 Listar Componentes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Área de Resultados */}
          {loading && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <ActivityIndicator size="small" color="#007AFF" style={{ marginRight: 8 }} />
              <Text style={{ color: '#666', fontSize: 16 }}>Carregando...</Text>
            </View>
          )}

          {result ? (
            <View style={{ 
              backgroundColor: 'white', 
              padding: 16, 
              borderRadius: 8, 
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
              width: '100%',
              maxWidth: 400
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
                Resultados ({resultType}):
              </Text>
              <ScrollView style={{ maxHeight: 300 }}>
                <Text style={{ color: '#666', fontSize: 14, fontFamily: 'monospace' }}>
                  {result}
                </Text>
              </ScrollView>
            </View>
          ) : (
            <Text style={{ color: '#999', fontSize: 16, marginTop: 16 }}>
              Pressione um botão para testar a integração.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}