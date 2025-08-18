import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import { storageAdapter } from './storage-adapter';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validação de variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias');
}

// Verifica se estamos no lado cliente
const isClient = typeof window !== 'undefined' || Platform.OS !== 'web';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter,
    autoRefreshToken: isClient,
    persistSession: isClient,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'x-my-custom-header': 'app-portugues-para-surdos',
    },
  },
});