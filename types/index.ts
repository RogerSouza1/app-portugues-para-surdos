// Types para o projeto
export interface Usuario {
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

export interface Modulo {
  id: string;
  tema: string;
  descricao?: string;
  ordem: number;
  icon?: string;
  completo?: boolean;
}

export interface Exercicio {
  id: string;
  id_modulo: string;
  nome: string;
  tipo: 'multiple_choice' | 'video' | 'audio';
  nivel: 'FÁCIL' | 'MÉDIO' | 'DIFÍCIL';
  ordem: number;
  concluido?: boolean;
  locked?: boolean;
}

export interface Alternativa {
  id: string;
  opcao: string;
  is_correta: boolean;
}

export interface ExercicioAlternativa {
  id: string;
  id_exercicio: string;
  is_correta: boolean;
  alternativa: Alternativa;
}

export interface Media {
  id: string;
  id_exercicio: string;
  url: string;
  tipo: 'video_libras' | 'audio' | 'imagem';
  nome?: string;
  ordem: number;
}

export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: SupabaseError | null;
}
