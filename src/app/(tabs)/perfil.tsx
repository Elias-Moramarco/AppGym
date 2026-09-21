import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function PerfilScreen() {
  const router = useRouter();

  const handleLogout = async () => {
      // Solo cerramos la sesión. El _layout.tsx se encarga automáticamente del viaje.
      await supabase.auth.signOut();
      router.replace('/')
    };
    
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarTextLarge}>EM</Text>
          </View>
          <Text style={styles.title}>Elias Moramarco</Text>
          <Text style={styles.subtitle}>Gestión de perfil y preferencias</Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Cerrar sesión"
          accessibilityHint="Cierra tu sesión actual en la aplicación"
        >
          <Text style={styles.buttonText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F9F6' },
  container: { 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 24, 
    paddingVertical: 60 
  },
  header: { 
    alignItems: 'center', 
    width: '100%' 
  },
  avatarLarge: { 
    width: 96, 
    height: 96, 
    borderRadius: 48, 
    backgroundColor: '#1A3B2E', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16, 
    borderWidth: 4, 
    borderColor: '#C2EABD' 
  },
  avatarTextLarge: { color: '#FFFFFF', fontSize: 36, fontWeight: '900' },
  title: { color: '#1A3B2E', fontSize: 28, fontWeight: '900', marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { color: '#3A6351', fontSize: 16 },
  logoutButton: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 2, 
    borderColor: '#FFD3D3', 
    paddingVertical: 18, 
    borderRadius: 100, 
    width: '100%', 
    maxWidth: 320, 
    alignItems: 'center',
    // Cumplimiento WCAG para áreas táctiles
    minHeight: 48,
    justifyContent: 'center'
  },
  buttonText: { color: '#D32F2F', fontSize: 16, fontWeight: '800', letterSpacing: 1 }
});