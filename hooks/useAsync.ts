import { useCallback, useState } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (asyncFunction: () => Promise<T>) => Promise<void>;
  reset: () => void;
}

export function useAsync<T = any>(): UseAsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro na operação async:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}

// Hook específico para dados do Supabase
export function useSupabaseQuery<T = any>() {
  const { data, loading, error, execute, reset } = useAsync<T>();

  const executeQuery = useCallback(
    (queryFunction: () => Promise<T>) => {
      return execute(async () => {
        try {
          return await queryFunction();
        } catch (error) {
          // Log específico para erros do Supabase
          if (error instanceof Error) {
            console.error('Erro Supabase:', {
              message: error.message,
              stack: error.stack,
            });
          }
          throw error;
        }
      });
    },
    [execute]
  );

  return {
    data,
    loading,
    error,
    executeQuery,
    reset,
  };
}
