import { buscarExercicios } from "../services/supabase-query";
import { recuperarExerciciosConcluidos } from "./storage";

export async function verificarModuloCompleto(idModulo: string): Promise<boolean> {
  const exercicios = await buscarExercicios(idModulo);
  const concluidos = await recuperarExerciciosConcluidos();
  if (exercicios.length === 0) return false;
  return exercicios.every((ex: any) => concluidos[ex.id]);
}