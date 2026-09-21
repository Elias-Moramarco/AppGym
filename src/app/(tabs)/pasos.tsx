import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function PasosScreen() {
  // Estado temporal para simular los pasos antes de conectarlo a la base de datos
  const [pasos, setPasos] = useState(3240);
  const metaDiaria = 10000;
  const progreso = Math.min((pasos / metaDiaria) * 100, 100);

  const simularCaminata = () => {
    setPasos(prev => prev + 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Movimiento Diario</Text>
          <Text style={styles.subtitle}>Tu objetivo: {metaDiaria.toLocaleString()} pasos</Text>
        </View>

        {/* Indicador principal */}
        <View 
          style={styles.circleContainer}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: metaDiaria, now: pasos }}
          accessibilityLabel={`${pasos} pasos de ${metaDiaria}`}
        >
          <View style={styles.circle}>
            <Text style={styles.stepCount}>{pasos.toLocaleString()}</Text>
            <Text style={styles.stepLabel}>PASOS</Text>
          </View>
        </View>

        {/* Barra de progreso horizontal */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{Math.round(progreso)}% completado</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progreso}%` }]} />
          </View>
        </View>

        {/* Botón de carga manual (Área táctil mínima de 48px) */}
        <Pressable 
          style={styles.addButton} 
          onPress={simularCaminata}
          accessibilityRole="button"
          accessibilityLabel="Sumar 500 pasos manualmente"
          accessibilityHint="Añade 500 pasos a tu progreso actual"
        >
          <Text style={styles.addButtonText}>+ SIMULAR 500 PASOS</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F9F6' },
  container: { flex: 1, padding: 24, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 40 },
  
  header: { alignItems: 'center', width: '100%', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#1A3B2E', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#3A6351', marginTop: 4 },
  
  circleContainer: { 
    width: 240, 
    height: 240, 
    borderRadius: 120, 
    backgroundColor: '#E2F0E9', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 40
  },
  circle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#C2EABD'
  },
  stepCount: { fontSize: 48, fontWeight: '900', color: '#1A3B2E', letterSpacing: -2 },
  stepLabel: { fontSize: 14, fontWeight: '800', color: '#88A096', letterSpacing: 2, marginTop: -4 },
  
  progressContainer: { width: '100%', maxWidth: 400, marginBottom: 40 },
  progressText: { textAlign: 'right', marginBottom: 8, fontSize: 14, fontWeight: '700', color: '#3A6351' },
  track: { height: 16, backgroundColor: '#E2F0E9', borderRadius: 8, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#1A3B2E', borderRadius: 8 },
  
  addButton: { 
    backgroundColor: '#1A3B2E', 
    paddingVertical: 18, 
    borderRadius: 100, 
    width: '100%', 
    maxWidth: 320, 
    alignItems: 'center',
    minHeight: 48,
    boxShadow: '0px 4px 12px rgba(26, 59, 46, 0.2)'
  },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 1 }
});