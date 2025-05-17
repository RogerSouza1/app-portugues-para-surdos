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

export async function recuperarNiveis() {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_levels');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Erro ao recuperar níveis:', error);
    return null;
  }
}

export async function salvarPreferencias(usuario: any) {
    try {
      await AsyncStorage.setItem('@usuario', JSON.stringify(usuario));
    } catch (error) {
      console.error('Erro ao salvar informações do usuário:', error);
    }
  }
  
export async function recuperarPreferencias() {
  try {
    const jsonValue = await AsyncStorage.getItem('@usuario');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Erro ao recuperar informações do usuário:', error);
    return null;
  }
}

export async function salvarExercicioConcluido(id: string, status: boolean) {
  try {
    const jsonValue = await AsyncStorage.getItem('@exercicios_concluidos');
    const concluidos = jsonValue ? JSON.parse(jsonValue) : {};
    concluidos[id] = status;
    await AsyncStorage.setItem('@exercicios_concluidos', JSON.stringify(concluidos));
  } catch (error) {
    console.error('Erro ao salvar exercício concluído:', error);
  }
}

export async function recuperarExerciciosConcluidos() {
  try {
    const jsonValue = await AsyncStorage.getItem('@exercicios_concluidos');
    return jsonValue ? JSON.parse(jsonValue) : {};
  } catch (error) {
    console.error('Erro ao recuperar exercícios concluídos:', error);
    return {};
  }
}