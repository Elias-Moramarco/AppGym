import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function PasosScreen() {
  const [pasos, setPasos] = useState(8432);
  const metaPasos = 10000;
  const progreso = (pasos / metaPasos) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* HEADER: Mayúsculas, limpio, fuerte */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>RESUMEN DE HOY</Text>
          <Text style={styles.headline}>MOVIMIENTO</Text>
        </View>

        {/* MÉTRICA PRINCIPAL: Gigante, sin cajas, directo al fondo */}
        <View style={styles.mainMetric}>
          <Text style={styles.massiveNumber}>{pasos}</Text>
          <Text style={styles.metricLabel}>PASOS TOTALES</Text>
          
          {/* BARRA DE PROGRESO: Fina y agresiva */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progreso}%` }]} />
            </View>
            <Text style={styles.progressText}>{metaPasos} META</Text>
          </View>
        </View>

        {/* MÉTRICAS SECUNDARIAS: Separadores finos en lugar de tarjetas */}
        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>78.5<Text style={styles.statUnit}> KG</Text></Text>
            <Text style={styles.statLabel}>PESO ACTUAL</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>420<Text style={styles.statUnit}> KCAL</Text></Text>
            <Text style={styles.statLabel}>QUEMADAS</Text>
          </View>
        </View>

        {/* BOTÓN NTC: Bordes más cuadrados, alto contraste (blanco sobre negro) */}
        <View style={styles.footer}>
          <Pressable 
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed
            ]}
          >
            <Text style={styles.primaryButtonText}>REGISTRAR ACTIVIDAD</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Negro puro
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 48,
  },
  subtitle: {
    color: '#888888',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 1,
  },
  mainMetric: {
    marginBottom: 48,
  },
  massiveNumber: {
    color: '#FFFFFF',
    fontSize: 84,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
    letterSpacing: -2,
    lineHeight: 90,
  },
  metricLabel: {
    color: '#D4FE00', // Nike Volt Yellow
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: -4,
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4FE00', 
    borderRadius: 2,
  },
  progressText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222222',
    paddingVertical: 24,
  },
  statBlock: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#222222',
    marginHorizontal: 16,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  statUnit: {
    fontSize: 16,
    color: '#888888',
  },
  statLabel: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF', // Botón blanco para máximo contraste
    paddingVertical: 20,
    borderRadius: 8, // Bordes menos redondeados, más agresivos
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
});