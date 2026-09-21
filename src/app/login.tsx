import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase'; // Importamos tu conexión

export default function LoginScreen() {
  const router = useRouter();
  
  // Estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Función funcional de Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atención', 'Por favor completá todos los campos.');
      return;
    }

    setLoading(true);
    
    // Llamada real a Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error de acceso', error.message);
    } else {
      // Si salió todo bien, lo mandamos adentro de la app (a las tabs)
      router.replace('/(tabs)/pasos');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        
    <Pressable 
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/'); // Si no hay historial, lo saca a la landing page
        }
      }} 
      style={styles.backButton}
    >
      <Text style={styles.backButtonText}>← Volver</Text>
    </Pressable>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Bienvenido de nuevo</Text>
          <Text style={styles.subtitle}>Ingresá tus datos para continuar.</Text>

          {/* Input de Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@email.com"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Input de Contraseña */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Botón de Login */}
          <Pressable 
            style={({ pressed }) => [styles.primaryButton, (pressed || loading) && styles.primaryButtonPressed]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Ingresando...' : 'INGRESAR'}
            </Text>
          </Pressable>

          {/* Link a Registro */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tenés una cuenta? </Text>
            <Pressable onPress={() => router.push('/register')}>
              <Text style={styles.registerLink}>Registrate acá</Text>
            </Pressable>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#D7F0E2' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  backButton: { position: 'absolute', top: 40, left: 24, padding: 10, zIndex: 10 },
  backButtonText: { fontSize: 16, fontWeight: '700', color: '#3A6351' },
  formContainer: { width: '100%', maxWidth: 400, alignSelf: 'center', backgroundColor: '#FFFFFF', padding: 32, borderRadius: 24, boxShadow: '0px 12px 24px rgba(26, 59, 46, 0.1)' },
  title: { fontSize: 32, fontWeight: '900', color: '#1A3B2E', marginBottom: 8, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: '#3A6351', marginBottom: 32 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '700', color: '#1A3B2E', marginBottom: 8 },
  input: { backgroundColor: '#F4F9F6', borderWidth: 1, borderColor: '#C2EABD', borderRadius: 12, padding: 16, fontSize: 16, color: '#1A3B2E' },
  primaryButton: { backgroundColor: '#1A3B2E', paddingVertical: 18, borderRadius: 100, alignItems: 'center', marginTop: 12 },
  primaryButtonPressed: { opacity: 0.8 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  registerText: { color: '#555', fontSize: 14 },
  registerLink: { color: '#1A3B2E', fontSize: 14, fontWeight: '800' }
});