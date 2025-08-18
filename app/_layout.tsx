import type { Session } from '@supabase/supabase-js';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import ErrorBoundary from '../components/ErrorBoundary';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Só executa autenticação no lado cliente
    if (typeof window !== 'undefined' || Platform.OS !== 'web') {
      let mounted = true;

      const initializeAuth = async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) {
            console.warn('Erro ao obter sessão:', error.message);
          }
          
          if (mounted) {
            setSession(session);
          }
        } catch (error) {
          console.error('Erro na inicialização da autenticação:', error);
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (mounted) {
            setSession(session);
          }
        }
      );

      initializeAuth();

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <StatusBar backgroundColor="#013974" barStyle="light-content" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#013974' },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerBackButtonDisplayMode: 'minimal',
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ title: 'Boas Vindas' }} />
            <Stack.Screen name="niveis/[id]" options={{ title: '' }} />
            <Stack.Screen name="pre-exercicios/[id]" options={{ title: '' }} />
            <Stack.Screen name="dicionario/[id]" options={{ title: '' }} />
            <Stack.Screen name="pre-modulo/[id]" options={{ title: '' }} />
            <Stack.Screen name="exercicios/[id]" options={{ title: '' }} />
            <Stack.Screen name="configuracoes" options={{ title: 'Configurações' }} />
            <Stack.Screen name="termosDeUso" options={{ title: 'Termos de Uso e Privacidade' }} />
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}