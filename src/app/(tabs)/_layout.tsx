import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#FFF',
        tabBarStyle: { backgroundColor: '#121212', borderTopColor: '#333' },
        tabBarActiveTintColor: '#2E66FF',
        tabBarInactiveTintColor: '#A0A0A0',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Resumen',
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pasos"
        options={{
          title: 'Pasos',
          tabBarIcon: ({ color }) => <Ionicons name="walk" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="entrenamiento"
        options={{
          title: 'Entrenar',
          tabBarIcon: ({ color }) => <Ionicons name="barbell" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="nutricion"
        options={{
          title: 'Nutricion',
          tabBarIcon: ({ color }) => <Ionicons name="restaurant" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}