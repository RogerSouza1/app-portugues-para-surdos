import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar os níveis do usuário

// Exemplo de json
// const levels = {
//   id: 1 {
//   concluido: true,
//   data_conclusao: "2023-10-01",
//   data_inicio: "2023-09-01",
//   pontuacao: 100
//   }
//   
// };

export async function salvarNiveis(levels: any) {
  try {
    await AsyncStorage.setItem('@user_levels', JSON.stringify(levels));
  } catch (error) {
    console.error('Erro ao salvar níveis:', error);
  }
}

// Função para recuperar os níveis do usuário
export async function recuperarNiveis() {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_levels');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Erro ao recuperar níveis:', error);
    return null;
  }
}

// Função para salvar os informacoes do usuário
export async function salvarPreferencias(levels: any) {
    try {
      await AsyncStorage.setItem('@preferencias', JSON.stringify(levels));
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    }
  }
  
    //Exemplo de json
    // const preferencias = {
    // primeiro_acesso: true,
    // modo_escuro: false,
    // }

  // Função para recuperar os informacoes do usuário
  export async function recuperarPreferencias() {
    try {
      const jsonValue = await AsyncStorage.getItem('@preferencias');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Erro ao recuperar preferências:', error);
      return null;
    }
  }