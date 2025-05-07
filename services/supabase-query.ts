import { supabase } from '../lib/supabase';

export async function buscarModulo() {
    const { data, error } = await supabase
    .from('modulo')
    .select('*')
    .order('ordem', {ascending: true});
  if (error) throw error;
  return data;
}

export async function buscarExercicios(modulo_uuid: string) {
  const { data, error } = await supabase
    .from('exercicio')
    .select('*')
    .eq('id_modulo', modulo_uuid)
    .order('ordem', {ascending: true});
  if (error) throw error;
  return data;
}

export async function contarExercicios(modulo_uuid: string) {
  const { count, error } = await supabase
    .from('exercicio')
    .select('*', { count: 'exact', head: true })
    .eq('id_modulo', modulo_uuid);
  if (error) throw error;
  return count;
}

export async function buscarAlternativas(exercicio_uuid: string) {
    const { data, error } = await supabase
      .from('exercicio_alternativa')
      .select('*, alternativa(opcao)')
      .eq('id_exercicio', exercicio_uuid);

    if (error) throw error;
    return data;
}

export async function buscarMidia(exercicio_uuid: string) {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .eq("id_exercicio", exercicio_uuid);

    if (error) throw error;
    return data;
  }

  export async function buscarExercicioPalavras(exercicio_uuid: string) {
    const { data, error } = await supabase
      .from("exercicio_palavra")
      .select("*")
      .eq("id_exercicio", exercicio_uuid);

    if (error) throw error;
    return data;
  }

  export async function buscarDicionario() {
    const { data, error } = await supabase
      .from("dicionario")
      .select("*")
    if (error) throw error;
    return data;
  }

  export async function buscarUsuarios() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
    if (error) throw error;
    return data;
  }


