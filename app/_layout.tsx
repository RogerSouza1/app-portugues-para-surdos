import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_e, s) => setSession(s));
  }, []);

  return (
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
        <Stack.Screen name="onboarding" options={{ title: 'Bem-vindo' }} />
        <Stack.Screen name="niveis/[id]" options={{ title: '' }} />
        <Stack.Screen name="pre-exercicios/[id]" options={{ title: '' }} />
        <Stack.Screen name="exercicios/[id]" options={{ title: '' }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} /> 
      </Stack>
    </PaperProvider>
  );
}