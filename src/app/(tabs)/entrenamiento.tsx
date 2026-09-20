import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PantallaBase() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estoy en una de las pestañas 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  text: { color: '#FFF', fontSize: 20 }
});