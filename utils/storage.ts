import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos para storage
interface ExerciciosConcluidos {
  [exercicioId: string]: boolean;
}

interface Usuario {
  id?: string;
  nome?: string;
  email?: string;
  primeiro_acesso?: boolean;
  avatar?: string;
  configuracoes?: {
    vibracao?: boolean;
    som?: boolean;
    tema?: 'claro' | 'escuro';
  };
}

interface NivelInfo {
  concluido: boolean;
  data_conclusao?: string;
  data_inicio?: string;
  pontuacao?: number;
}

interface Niveis {
  [nivelId: string]: NivelInfo;
}

// Constantes para chaves do storage
const STORAGE_KEYS = {
  USER_LEVELS: '@user_levels',
  USUARIO: '@usuario',
  EXERCICIOS_CONCLUIDOS: '@exercicios_concluidos',
} as const;

// Função helper para tratamento de erros
const handleStorageError = (operation: string, error: any) => {
  console.error(`Erro ao ${operation}:`, error);
  return null;
};

// Funções para níveis
export async function salvarNiveis(levels: Niveis): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_LEVELS, JSON.stringify(levels));
  } catch (error) {
    console.error('Erro ao salvar níveis:', error);
    throw new Error('Falha ao salvar níveis');
  }
}

export async function recuperarNiveis(): Promise<Niveis | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_LEVELS);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    return handleStorageError('recuperar níveis', error);
  }
}

// Funções para preferências do usuário
export async function salvarPreferencias(usuario: Usuario): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(usuario));
  } catch (error) {
    console.error('Erro ao salvar informações do usuário:', error);
    throw new Error('Falha ao salvar preferências do usuário');
  }
}

export async function recuperarPreferencias(): Promise<Usuario | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USUARIO);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    return handleStorageError('recuperar informações do usuário', error);
  }
}

// Funções para exercícios concluídos
export async function salvarExercicioConcluido(id: string, status: boolean): Promise<void> {
  try {
    if (!id) {
      throw new Error('ID do exercício é obrigatório');
    }

    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.EXERCICIOS_CONCLUIDOS);
    const concluidos: ExerciciosConcluidos = jsonValue ? JSON.parse(jsonValue) : {};
    
    concluidos[id] = status;
    
    await AsyncStorage.setItem(STORAGE_KEYS.EXERCICIOS_CONCLUIDOS, JSON.stringify(concluidos));
  } catch (error) {
    console.error('Erro ao salvar exercício concluído:', error);
    throw new Error('Falha ao salvar progresso do exercício');
  }
}

export async function recuperarExerciciosConcluidos(): Promise<ExerciciosConcluidos> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.EXERCICIOS_CONCLUIDOS);
    return jsonValue ? JSON.parse(jsonValue) : {};
  } catch (error) {
    console.error('Erro ao recuperar exercícios concluídos:', error);
    return {};
  }
}

// Funções para preferências de módulo
export async function salvarPreferenciasModulo(id_modulo: string, preferencias: any): Promise<void> {
  try {
    if (!id_modulo) {
      throw new Error('ID do módulo é obrigatório');
    }
    
    const key = `@preferencias_modulo_${id_modulo}`;
    await AsyncStorage.setItem(key, JSON.stringify(preferencias));
  } catch (error) {
    console.error('Erro ao salvar preferências do módulo:', error);
    throw new Error('Falha ao salvar preferências do módulo');
  }
}

export async function recuperarPreferenciasModulo(id_modulo: string): Promise<any | null> {
  try {
    if (!id_modulo) return null;
    
    const key = `@preferencias_modulo_${id_modulo}`;
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    return handleStorageError('recuperar preferências do módulo', error);
  }
}

// Função para limpar todos os dados (útil para logout ou reset)
export async function limparTodosOsDados(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw new Error('Falha ao limpar dados do aplicativo');
  }
}

// Função para verificar status de um exercício específico
export async function verificarExercicioConcluido(id: string): Promise<boolean> {
  try {
    if (!id) return false;
    
    const concluidos = await recuperarExerciciosConcluidos();
    return concluidos[id] || false;
  } catch (error) {
    console.error('Erro ao verificar exercício concluído:', error);
    return false;
  }
}

// Função para obter estatísticas de progresso
export async function obterEstatisticasProgresso(): Promise<{
  totalConcluidos: number;
  exerciciosConcluidos: string[];
}> {
  try {
    const concluidos = await recuperarExerciciosConcluidos();
    const exerciciosConcluidos = Object.keys(concluidos).filter(id => concluidos[id]);
    
    return {
      totalConcluidos: exerciciosConcluidos.length,
      exerciciosConcluidos,
    };
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return {
      totalConcluidos: 0,
      exerciciosConcluidos: [],
    };
  }
}