import { Session } from '@supabase/supabase-js';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import '../global.css';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Preguntamos a Supabase si el usuario ya tiene una sesión guardada
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitialized(true);
    });

    // Escuchamos activamente cuando el usuario entra o sale
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Lógica de redirección automática
  useEffect(() => {
    if (!initialized) return;

    const inProtectedGroup = segments[0] === '(tabs)';
    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register';

    if (!session && inProtectedGroup) {
      router.replace('/');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)/inicio' as never);
    }
  }, [session, initialized, segments]);

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D7F0E2' }}>
        <ActivityIndicator size="large" color="#1A3B2E" />
      </View>
    );
  }

  // 2. DEFINIMOS LA NAVEGACIÓN STACK RAÍZ Y OCULTAMOS EL MENÚ DE DESARROLLO
  return (
    <Stack>
      {/* 1. Ocultamos el encabezado de las pestañas para ver tu diseño limpio */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* 2. Ocultamos el encabezado de las pantallas de autenticación */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      
      {/* 3. Permitimos que la landing page tenga su propio encabezado o lo ocultamos si no tiene */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}