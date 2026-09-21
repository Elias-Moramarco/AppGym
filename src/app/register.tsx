import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function RegisterScreen() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Atención', 'Por favor completá todos los campos.');
      return;
    }

    setLoading(true);
    
    // Llamada de creación a Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log('SIGN UP DATA:', data);
  console.log('SIGN UP ERROR:', error);

    setLoading(false);

    if (error) {
      Alert.alert('Error al registrarse', error.message);
    } else {
      Alert.alert('¡Cuenta creada!', 'Ya podés iniciar sesión con tus datos.');
      // Lo mandamos al login para que entre
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </Pressable>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Creá tu cuenta</Text>
          <Text style={styles.subtitle}>Empezá a controlar tu bienestar hoy.</Text>

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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Pressable 
            style={({ pressed }) => [styles.primaryButton, (pressed || loading) && styles.primaryButtonPressed]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Registrando...' : 'CREAR CUENTA'}
            </Text>
          </Pressable>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿Ya tenés una cuenta? </Text>
            <Pressable onPress={() => router.replace('/login')}>
              <Text style={styles.registerLink}>Ingresá acá</Text>
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