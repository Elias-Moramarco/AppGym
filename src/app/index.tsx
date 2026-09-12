import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* El View agrupa el contenido y le da un contexto a los lectores de pantalla */}
      <View 
        accessible={true} 
        accessibilityLabel="Pantalla principal de inicio"
        style={styles.content}
      >
        <Text 
          style={styles.title} 
          accessibilityRole="header"
        >
          Personal Fitness OS
        </Text>
        
        <Text style={styles.subtitle}>
          ¡Base de datos conectada! Listo para descansar. 🌙
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0', // Texto secundario con buen contraste
    textAlign: 'center',
  },
});