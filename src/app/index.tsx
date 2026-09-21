import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

// --- COMPONENTE CORREGIDO ---
const OrbitingBubble = ({ imageSource, positionStyle, counterSpin }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handleHoverIn = () => Animated.spring(scale, { toValue: 1.3, friction: 4, useNativeDriver: false }).start();
  const handleHoverOut = () => Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: false }).start();

  return (
    <Animated.View style={[styles.appBubble, positionStyle, { transform: [{ rotate: counterSpin }, { scale }] }]}>
      <Pressable 
        onPressIn={handleHoverIn} 
        onPressOut={handleHoverOut}
        // @ts-ignore
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        style={styles.bubblePressable}
      >
        <Image 
          source={imageSource} 
          style={styles.bubbleImage} 
          resizeMode="contain" // ESTO EVITA QUE SE CORTEN LOS LOGOS
        />
      </Pressable>
    </Animated.View>
  );
};

export default function LandingScreen() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();

  // Animaciones iniciales
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Animación del círculo giratorio
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entradas iniciales
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1000, useNativeDriver: false })
    ]).start();

    // Bucle infinito para hacer girar el círculo de integraciones (tarda 15 segs por vuelta)
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: false
      })
    ).start();
  }, []);

  // --- Animaciones Scroll ---
  const slideInLeft = scrollY.interpolate({
    inputRange: [0, height * 0.2, height * 0.5], 
    outputRange: [-300, -100, 0],
    extrapolate: 'clamp',
  });
  const opacityLeft = scrollY.interpolate({
    inputRange: [0, height * 0.2, height * 0.5],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const slideInRight = scrollY.interpolate({
    inputRange: [height * 0.4, height * 0.7, height * 1.2], 
    outputRange: [300, 150, 0],
    extrapolate: 'clamp',
  });
  const opacityRight = scrollY.interpolate({
    inputRange: [height * 0.4, height * 0.7, height * 1.2],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const scaleApps = scrollY.interpolate({
    inputRange: [height * 0.9, height * 1.3, height * 1.8],
    outputRange: [0, 1.1, 1], 
    extrapolate: 'clamp',
  });
  const opacityApps = scrollY.interpolate({
    inputRange: [height * 0.9, height * 1.3, height * 1.8],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  });

  // --- Cálculos de rotación ---
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const counterSpin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'] // Gira al revés para que las fotos no queden boca abajo
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } 
        )}
      >
        
        {/* NAVBAR */}
        <View style={[styles.navbar, isDesktop && styles.navbarDesktop]}>
        <Text 
          onPress={() => router.push('/')} 
          style={styles.brand}
          accessibilityRole="link"
        >
          Fitness OS
        </Text>
          <View style={styles.navActions}>
            <Pressable style={styles.loginButton} onPress={() => router.push('/login')}>
              <Text style={styles.loginButtonText}>Ingresar</Text>
            </Pressable>
          </View>
        </View>

        {/* HERO SECTION */}
        <Animated.View style={[styles.hero, isDesktop && styles.heroDesktop, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={[styles.title, isDesktop && styles.titleDesktop]}>
            Tu bienestar, a tu propio ritmo.
          </Text>
          <Text style={[styles.subtitle, isDesktop && styles.subtitleDesktop]}>
            Un ecosistema claro y sereno para controlar tus calorías, registrar tus pasos y armar tu rutina.
          </Text>
          <Pressable 
            style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaButtonPressed]}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.ctaButtonText}>COMENZÁ AHORA</Text>
          </Pressable>
        </Animated.View>

        {/* SECCIÓN 1 */}
        <View style={[styles.featureSection, isDesktop && styles.featureSectionDesktop]}>
          <Animated.View style={[styles.mediaPlaceholder, isDesktop && styles.mediaDesktop, { opacity: opacityLeft, transform: [{ translateX: slideInLeft }] }]}>
            <Image source={require('../../assets/foto1.png')} style={styles.realImage} resizeMode="cover" />
          </Animated.View>
          <View style={[styles.textContainer, isDesktop && styles.textContainerDesktop]}>
            <Text style={styles.featureTitle}>Movimiento Consciente</Text>
            <Text style={styles.featureBody}>
              Visualizá tus pasos diarios y tu progreso físico sin métricas abrumadoras. Solo lo que necesitas para mantenerte en forma.
            </Text>
          </View>
        </View>

        {/* SECCIÓN 2 */}
        <View style={[styles.featureSection, isDesktop && styles.featureSectionDesktop, isDesktop && styles.featureReverse]}>
          <Animated.View style={[styles.mediaPlaceholder, isDesktop && styles.mediaDesktop, { opacity: opacityRight, transform: [{ translateX: slideInRight }] }]}>
            <Image source={require('../../assets/foto1.png')} style={styles.realImage} resizeMode="cover" />
          </Animated.View>
          <View style={[styles.textContainer, isDesktop && styles.textContainerDesktop]}>
            <Text style={styles.featureTitle}>Nutrición Simple</Text>
            <Text style={styles.featureBody}>
              Un registro de comidas rápido e intuitivo. Olvidate de las tablas infinitas y concéntrate en comer mejor.
            </Text>
          </View>
        </View>

        {/* NUEVA SECCIÓN: INTEGRACIONES ORBITALES */}
        <View style={styles.integrationsSection}>
          <Text style={styles.featureTitle}>Se conecta con tu mundo.</Text>
          <Text style={styles.featureBody}>
            Vinculá fácilmente tu cuenta con las aplicaciones que ya usás para tener toda tu salud en un solo lugar.
          </Text>
          
          <Animated.View style={[
            styles.orbitWrapper, 
            { opacity: opacityApps, transform: [{ scale: scaleApps }] }
          ]}>
            
            {/* Burbuja Central Estática */}
            <View style={styles.appBubbleMain}>
              <Text style={styles.appBubbleTextMain}>OS</Text>
            </View>

{/* Contenedor Giratorio con las 4 apps */}
            <Animated.View style={[styles.orbitContainer, { transform: [{ rotate: spin }] }]}>
              
              <OrbitingBubble 
                imageSource={{ uri: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Samsung_Health_2025_logo.png" }} 
                positionStyle={{ top: 0, left: 110 }} 
                counterSpin={counterSpin} 
              />
              <OrbitingBubble 
                imageSource={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Icon_-_Apple_Health.png" }} 
                positionStyle={{ top: 110, right: 0 }} 
                counterSpin={counterSpin} 
              />
              <OrbitingBubble 
                imageSource={{ uri: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/garmin-connect.webp" }} 
                positionStyle={{ bottom: 0, left: 110 }} 
                counterSpin={counterSpin} 
              />
              <OrbitingBubble 
                imageSource={{ uri: "https://w7.pngwing.com/pngs/847/180/png-transparent-fitbit-app-logo-tech-companies.png" }} 
                positionStyle={{ top: 110, left: 0 }} 
                counterSpin={counterSpin} 
              />
              
            </Animated.View>

          </Animated.View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={[styles.footerContent, isDesktop && styles.footerContentDesktop]}>
            <View style={styles.footerColumn}>
              <Text style={styles.footerTitle}>COMUNIDAD</Text>
              <Text style={styles.footerLink}>Blog</Text>
              <Text style={styles.footerLink}>Foro de usuarios</Text>
              <Text style={styles.footerLink}>Historias de éxito</Text>
            </View>
            <View style={styles.footerColumn}>
              <Text style={styles.footerTitle}>PRODUCTO</Text>
              <Text style={styles.footerLink}>Planes Premium</Text>
              <Text style={styles.footerLink}>Contador de calorías</Text>
              <Text style={styles.footerLink}>Calculadora de macros</Text>
            </View>
            <View style={styles.footerColumn}>
              <Text style={styles.footerTitle}>LEGAL</Text>
              <Text style={styles.footerLink}>Términos y condiciones</Text>
              <Text style={styles.footerLink}>Privacidad</Text>
              <Text style={styles.footerLink}>Cookies</Text>
            </View>
          </View>
          <View style={styles.footerBottom}>
            <Text style={styles.copyright}>© 2026 Fitness OS, Inc. Todos los derechos reservados.</Text>
          </View>
        </View>

      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#D7F0E2' },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, overflow: 'hidden' }, 
  
  navbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20 },
  navbarDesktop: { paddingHorizontal: 80, paddingVertical: 32 },
  brand: { fontSize: 22, fontWeight: '900', color: '#1A3B2E', letterSpacing: -0.5 },
  navActions: { flexDirection: 'row' },
  loginButton: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: 'rgba(26, 59, 46, 0.05)' },
  loginButtonText: { fontSize: 16, fontWeight: '700', color: '#1A3B2E' },
  
  hero: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 80, alignItems: 'center' },
  heroDesktop: { paddingTop: 80, paddingBottom: 120 },
  title: { fontSize: 42, fontWeight: '900', color: '#1A3B2E', textAlign: 'center', lineHeight: 48, marginBottom: 20, letterSpacing: -1 },
  titleDesktop: { fontSize: 72, lineHeight: 80, maxWidth: 800, letterSpacing: -2 },
  subtitle: { fontSize: 18, color: '#3A6351', textAlign: 'center', lineHeight: 28, marginBottom: 40, maxWidth: '90%' },
  subtitleDesktop: { fontSize: 22, lineHeight: 34, maxWidth: 600 },
  ctaButton: { backgroundColor: '#C2EABD', paddingHorizontal: 40, paddingVertical: 20, borderRadius: 100, boxShadow: '0px 4px 12px rgba(26, 59, 46, 0.15)' },
  ctaButtonPressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  ctaButtonText: { color: '#12291B', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  
  featureSection: { paddingHorizontal: 24, paddingVertical: 40, alignItems: 'center', gap: 32 },
  featureSectionDesktop: { flexDirection: 'row', paddingHorizontal: 120, paddingVertical: 80, justifyContent: 'space-between', alignItems: 'center', gap: 80 },
  featureReverse: { flexDirection: 'row-reverse' },
  mediaPlaceholder: { width: '100%', aspectRatio: 1, backgroundColor: 'transparent', borderRadius: 32, alignItems: 'center', justifyContent: 'center', boxShadow: '0px 12px 24px rgba(26, 59, 46, 0.15)' },
  mediaDesktop: { flex: 1, aspectRatio: 4/3 },
  realImage: { width: '100%', height: '100%', borderRadius: 32 },
  textContainer: { width: '100%', alignItems: 'center' },
  textContainerDesktop: { flex: 1, width: 'auto' },
  featureTitle: { fontSize: 32, fontWeight: '800', color: '#1A3B2E', marginBottom: 16, textAlign: 'center', letterSpacing: -1 },
  featureBody: { fontSize: 18, color: '#3A6351', textAlign: 'center', lineHeight: 28, maxWidth: 600 },
  
  // INTEGRACIONES ORBITALES
  integrationsSection: { paddingHorizontal: 24, paddingTop: 100, paddingBottom: 140, alignItems: 'center' },
  orbitWrapper: { width: 300, height: 300, marginTop: 60, alignItems: 'center', justifyContent: 'center' },
  orbitContainer: { position: 'absolute', top: 0, left: 0, width: 300, height: 300 },
  appBubbleMain: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1A3B2E', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0px 8px 24px rgba(26, 59, 46, 0.3)' },
  appBubbleTextMain: { color: '#C2EABD', fontWeight: '900', fontSize: 32 },
  appBubble: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFFFFF', boxShadow: '0px 4px 12px rgba(26, 59, 46, 0.15)' },
  bubblePressable: { width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden' },
  bubbleImage: { width: '100%', height: '100%' },

  // FOOTER
  footer: { backgroundColor: '#FFFFFF', paddingTop: 60, paddingBottom: 40, borderTopWidth: 1, borderTopColor: 'rgba(26, 59, 46, 0.1)' },
  footerContent: { paddingHorizontal: 24, flexDirection: 'column', gap: 40 },
  footerContentDesktop: { flexDirection: 'row', justifyContent: 'center', gap: 120 },
  footerColumn: { alignItems: 'center', gap: 16 },
  footerTitle: { fontSize: 14, fontWeight: '900', color: '#1A3B2E', marginBottom: 8, letterSpacing: 1 },
  footerLink: { fontSize: 14, color: '#555555', fontWeight: '500' },
  footerBottom: { marginTop: 60, alignItems: 'center' },
  copyright: { fontSize: 12, color: '#999999' }
});