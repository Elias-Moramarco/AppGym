import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1A3B2E',
        tabBarInactiveTintColor: '#88A096',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2F0E9',
          minHeight: 65, 
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerStyle: { backgroundColor: '#D7F0E2' },
        headerTitleStyle: { fontWeight: '800', color: '#1A3B2E' },
        
        // Botón de Perfil circular en la esquina superior derecha
        headerRight: () => (
          <Pressable
            onPress={() => router.push('/(tabs)/perfil')}
            style={styles.profileButton}
            accessibilityRole="button"
            accessibilityLabel="Ir al perfil"
            accessibilityHint="Abre la configuración de tu cuenta"
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>EM</Text>
            </View>
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
          tabBarAccessibilityLabel: "Pestaña de Inicio",
        }}
      />

      <Tabs.Screen
        name="entrenamiento"
        options={{
          title: 'Entrenar',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="dumbbell" size={26} color={color} />,
          tabBarAccessibilityLabel: "Pestaña de Entrenamiento",
        }}
      />

      <Tabs.Screen
        name="pasos"
        options={{
          title: 'Pasos',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="shoe-sneaker" size={26} color={color} />,
          tabBarAccessibilityLabel: "Pestaña de Pasos",
        }}
      />

      <Tabs.Screen
        name="nutricion"
        options={{
          title: 'Nutrición',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="food-apple" size={26} color={color} />,
          tabBarAccessibilityLabel: "Pestaña de Nutrición",
        }}
      />

      {/* Ocultamos esta pestaña de la barra inferior */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Mi Perfil',
          href: null, 
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    marginRight: 16,
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1A3B2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C2EABD',
  },
  avatarText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 }
});