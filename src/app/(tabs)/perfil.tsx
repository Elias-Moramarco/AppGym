import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function PerfilScreen() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Cuenta</Text>
      <Text style={styles.subtitle}>Gestión de perfil y preferencias</Text>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
        accessibilityRole="button"
        accessibilityLabel="Cerrar sesión"
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 20 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#A0A0A0', fontSize: 16, marginBottom: 40 },
  logoutButton: { backgroundColor: '#FF3B30', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8, width: '100%', maxWidth: 300, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' }
});