import { supabase } from '../lib/supabase';
import type { Exercicio, ExercicioAlternativa, Media, Modulo } from '../types';

const handleSupabaseError = (error: any, context: string) => {
  console.error(`Erro em ${context}:`, error);
  throw new Error(`Falha ao ${context}: ${error.message}`);
};

export async function buscarModulo(): Promise<Modulo[]> {
  try {
    const { data, error } = await supabase
      .from('modulo')
      .select('*')
      .order('ordem', { ascending: true });
    
    if (error) handleSupabaseError(error, 'buscar módulos');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar módulos');
    return [];
  }
}

export async function buscarExercicios(modulo_uuid: string): Promise<Exercicio[]> {
  try {
    if (!modulo_uuid) {
      throw new Error('ID do módulo é obrigatório');
    }

    const { data, error } = await supabase
      .from('exercicio')
      .select('*')
      .eq('id_modulo', modulo_uuid)
      .order('ordem', { ascending: true });
    
    if (error) handleSupabaseError(error, 'buscar exercícios');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar exercícios');
    return [];
  }
}

export async function contarExercicios(modulo_uuid: string): Promise<number> {
  try {
    if (!modulo_uuid) {
      throw new Error('ID do módulo é obrigatório');
    }

    const { count, error } = await supabase
      .from('exercicio')
      .select('*', { count: 'exact', head: true })
      .eq('id_modulo', modulo_uuid);
    
    if (error) handleSupabaseError(error, 'contar exercícios');
    return count || 0;
  } catch (error) {
    handleSupabaseError(error, 'contar exercícios');
    return 0;
  }
}

export async function contarTotalExercicios(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('exercicio')
      .select('*', { count: 'exact', head: true });
    
    if (error) handleSupabaseError(error, 'contar total de exercícios');
    return count || 0;
  } catch (error) {
    handleSupabaseError(error, 'contar total de exercícios');
    return 0;
  }
}

export async function buscarAlternativas(exercicio_uuid: string): Promise<ExercicioAlternativa[]> {
  try {
    if (!exercicio_uuid) {
      throw new Error('ID do exercício é obrigatório');
    }

    const { data, error } = await supabase
      .from('exercicio_alternativa')
      .select('*, alternativa(opcao)')
      .eq('id_exercicio', exercicio_uuid);

    if (error) handleSupabaseError(error, 'buscar alternativas');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar alternativas');
    return [];
  }
}

export async function buscarMidia(exercicio_uuid: string): Promise<Media[]> {
  try {
    if (!exercicio_uuid) {
      throw new Error('ID do exercício é obrigatório');
    }

    const { data, error } = await supabase
      .from("media")
      .select("*")
      .eq("id_exercicio", exercicio_uuid)
      .order('ordem', { ascending: true });
    
    if (error) handleSupabaseError(error, 'buscar mídia');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar mídia');
    return [];
  }
}

export async function buscarExercicioPorId(id: string): Promise<Exercicio | null> {
  try {
    if (!id) {
      throw new Error('ID do exercício é obrigatório');
    }

    const { data, error } = await supabase
      .from('exercicio')
      .select('*')
      .eq('id', id)
      .single();

    if (error) handleSupabaseError(error, 'buscar exercício por ID');
    return data;
  } catch (error) {
    handleSupabaseError(error, 'buscar exercício por ID');
    return null;
  }
}

export async function buscarVideoExercicioPorId(id: string): Promise<{ url: string }[]> {
  try {
    if (!id) {
      throw new Error('ID do exercício é obrigatório');
    }

    const { data, error } = await supabase
      .from('media')
      .select('url')
      .eq('id_exercicio', id)
      .eq('tipo', 'video_libras');

    if (error) handleSupabaseError(error, 'buscar vídeo do exercício');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar vídeo do exercício');
    return [];
  }
}

export async function buscarModuloPorId(id: string): Promise<string> {
  try {
    if (!id) {
      throw new Error('ID do módulo é obrigatório');
    }

    const { data, error } = await supabase
      .from('modulo')
      .select('tema')
      .eq('id', id)
      .single();

    if (error) handleSupabaseError(error, 'buscar módulo por ID');
    return data?.tema || '';
  } catch (error) {
    handleSupabaseError(error, 'buscar módulo por ID');
    return '';
  }
}

export async function buscarVideoModuloPorId(id: string): Promise<string> {
  try {
    if (!id) {
      throw new Error('ID do módulo é obrigatório');
    }

    const { data, error } = await supabase
      .from('modulo')
      .select('tema')
      .eq('id', id);
    
    if (error) handleSupabaseError(error, 'buscar tema do módulo');
    
    if (!data || data.length === 0) {
      throw new Error('Módulo não encontrado');
    }

    const tema = data[0].tema;

    const { data: dataVideo, error: errorVideo } = await supabase
      .from('media')
      .select('url')
      .eq('nome', tema)
      .single();
    
    if (errorVideo) handleSupabaseError(errorVideo, 'buscar vídeo do módulo');
    return dataVideo?.url || '';
  } catch (error) {
    handleSupabaseError(error, 'buscar vídeo do módulo');
    return '';
  }
}

// Funções para dicionário e outros recursos
export async function buscarDicionario() {
  try {
    const { data, error } = await supabase
      .from("dicionario")
      .select("*")
      .order('palavra', { ascending: true });
    
    if (error) handleSupabaseError(error, 'buscar dicionário');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar dicionário');
    return [];
  }
}

export async function buscarUsuarios() {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*");
    
    if (error) handleSupabaseError(error, 'buscar usuários');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar usuários');
    return [];
  }
}

export async function buscarExercicioPalavras(exercicio_uuid: string) {
  try {
    if (!exercicio_uuid) {
      throw new Error('ID do exercício é obrigatório');
    }

    const { data, error } = await supabase
      .from("exercicio_palavra")
      .select("*")
      .eq("id_exercicio", exercicio_uuid);

    if (error) handleSupabaseError(error, 'buscar palavras do exercício');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar palavras do exercício');
    return [];
  }
}

export async function buscarOnboarding() {
  try {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .eq("tipo", "video_onboarding")
    
    if (error) handleSupabaseError(error, 'buscar onboarding');
    return data || [];
  } catch (error) {
    handleSupabaseError(error, 'buscar onboarding');
    return [];
  }
}
  

