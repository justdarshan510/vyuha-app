import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Animated,
  Platform,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stethoscope, ShieldPlus, ChevronDown } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';

// SVG components to replace exactly the HTML inline SVGs
import Svg, { Path, Circle, Ellipse, G, Rect } from 'react-native-svg';

export default function AuthScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 760;
  const router = useRouter();
  
  // Animation for the illustration
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 3500,
          useNativeDriver: Platform.OS !== 'web', // web doesn't support useNativeDriver for all props
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: Platform.OS !== 'web',
        })
      ])
    ).start();
  }, [floatAnim]);

  return (
    <LinearGradient
      colors={['#e8f4fd', '#dbeafe', '#bfdbfe']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={[styles.authCard, isMobile && styles.authCardMobile]}>
            
            {/* LEFT — Brand showcase */}
            <LinearGradient
              colors={['#4fd1c5', '#38b2ac']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.authLeft, isMobile && styles.authLeftMobile]}
            >
              {/* Subtle circle decoration */}
              <View style={styles.circleDecoration} />

              <Link href="/" asChild>
                <TouchableOpacity style={styles.brandLink}>
                  <Image 
                    source={require('../../assets/images/logo.png')} 
                    style={styles.brandLogo} 
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </Link>

              <Text style={styles.brandTagline}>
                We at <Text style={styles.brandTaglineStrong}>Vyuha CDS</Text> are always fully focused on helping your patient.
              </Text>

              {/* Stethoscope + Podium illustration */}
              {!isMobile && (
                <View style={styles.illustrationWrap}>
                  <Animated.View style={[styles.illusSvgContainer, { transform: [{ translateY: floatAnim }] }]}>
                    <Svg width={320} height={290} viewBox="0 0 260 240" fill="none">
                      {/* Podium shadow */}
                      <Ellipse cx="130" cy="200" rx="85" ry="20" fill="rgba(10, 50, 120, 0.18)"/>
                      {/* Podium cylinder body */}
                      <Path d="M45 172 L45 188 C45 207, 215 207, 215 188 L215 172 Z" fill="rgba(255,255,255,0.4)"/>
                      {/* Podium top face */}
                      <Ellipse cx="130" cy="172" rx="85" ry="22" fill="rgba(255,255,255,0.7)"/>
                      <Ellipse cx="130" cy="170" rx="79" ry="19" fill="#ffffff"/>

                      {/* Stethoscope group */}
                      <G y="-8">
                        {/* Tube shadow */}
                        <Path d="M95 125 C95 148, 168 148, 168 125 L168 88 C168 78, 180 78, 180 88 L180 102"
                              stroke="rgba(0,0,0,0.15)" strokeWidth="11" strokeLinecap="round" fill="none" x="3" y="5"/>
                        {/* Left earpiece arm */}
                        <Path d="M98 70 C98 55, 98 42, 98 42 C98 37, 104 35, 108 39"
                              stroke="#1e3a8a" strokeWidth="7" strokeLinecap="round" fill="none"/>
                        {/* Right earpiece arm */}
                        <Path d="M162 70 C162 55, 162 42, 162 42 C162 37, 156 35, 152 39"
                              stroke="#1e3a8a" strokeWidth="7" strokeLinecap="round" fill="none"/>
                        {/* Eartips */}
                        <Circle cx="110" cy="37" r="5" fill="#ffffff"/>
                        <Circle cx="150" cy="37" r="5" fill="#ffffff"/>
                        {/* U-bridge */}
                        <Path d="M98 70 C98 100, 162 100, 162 70"
                              stroke="#1e40af" strokeWidth="8" strokeLinecap="round" fill="none"/>
                        {/* Center clip */}
                        <Rect x="126" y="89" width="7" height="9" rx="3" fill="#93c5fd"/>
                        {/* Tube to chestpiece */}
                        <Path d="M130 97 C130 126, 100 134, 100 152 C100 170, 172 170, 172 150 L172 132"
                              stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" fill="none"/>
                        {/* Chestpiece */}
                        <Circle cx="172" cy="132" r="6" fill="#93c5fd"/>
                        <Circle cx="181" cy="140" r="15" fill="#1e3a8a"/>
                        <Circle cx="181" cy="140" r="12" fill="#bfdbfe"/>
                        <Circle cx="181" cy="140" r="6" fill="#1e3a8a"/>
                        <Circle cx="181" cy="140" r="3.5" fill="#60a5fa"/>
                      </G>
                    </Svg>
                  </Animated.View>
                </View>
              )}
            </LinearGradient>

            {/* RIGHT — Auth form */}
            <View style={[styles.authRight, isMobile && styles.authRightMobile]}>
              
              <View style={styles.langBar}>
                <TouchableOpacity style={styles.langBtn}>
                  <Text style={styles.langBtnText}>English(US)</Text>
                  <ChevronDown color="#8a8aaa" size={12} />
                </TouchableOpacity>
              </View>

              <View style={styles.formArea}>
                <Text style={styles.formTitle}>Select Portal</Text>
                <Text style={styles.formSubtitle}>Choose your role to continue to the appropriate workspace.</Text>

                <View style={styles.rolesContainer}>
                  <TouchableOpacity 
                    style={styles.roleCard}
                    onPress={() => router.push({ pathname: '/auth', params: { role: 'DOCTOR' } } as any)}
                  >
                    <View style={[styles.roleIconWrap, { backgroundColor: '#e6fffa' }]}>
                      <Stethoscope color="#0d9488" size={32} />
                    </View>
                    <View style={styles.roleContent}>
                      <Text style={styles.roleTitle}>Doctor Dashboard</Text>
                      <Text style={styles.roleDesc}>Access patient telemetry, AMR risk profiles, and clinical overrides.</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.roleCard}
                    onPress={() => router.push({ pathname: '/auth', params: { role: 'STAFF' } } as any)}
                  >
                    <View style={[styles.roleIconWrap, { backgroundColor: '#eff6ff' }]}>
                      <ShieldPlus color="#3b82f6" size={32} />
                    </View>
                    <View style={styles.roleContent}>
                      <Text style={styles.roleTitle}>Staff Portal</Text>
                      <Text style={styles.roleDesc}>Manage alerts, access reports, and review ward status.</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  keyboardView: {
    width: '100%',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  authCard: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    flexDirection: 'row',
    width: '100%',
    maxWidth: 980,
    minHeight: 640,
    overflow: 'hidden',
    // Box shadow translated from css
    ...Platform.select({
      web: {
        boxShadow: '0 25px 60px -15px rgba(37, 99, 235, 0.18), 0 10px 25px -5px rgba(0,0,0,0.04)',
      },
      default: {
        shadowColor: 'rgba(37, 99, 235, 0.18)',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 1,
        shadowRadius: 60,
        elevation: 10,
      }
    }),
  },
  authCardMobile: {
    flexDirection: 'column',
    maxWidth: 440,
    minHeight: 200,
  },
  authLeft: {
    width: 460,
    paddingHorizontal: 42,
    paddingVertical: 48,
    position: 'relative',
    overflow: 'hidden',
  },
  authLeftMobile: {
    width: '100%',
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 24,
    minHeight: 200,
  },
  circleDecoration: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    bottom: -100,
    right: -100,
    pointerEvents: 'none',
  },
  brandLink: {
    marginBottom: 16,
    marginLeft: -12,
  },
  brandLogo: {
    height: 90,
    width: 250,
  },
  brandTagline: {
    fontSize: 18.4,
    fontWeight: '400',
    lineHeight: 27.6,
    color: 'rgba(255,255,255,0.95)',
    maxWidth: 280,
  },
  brandTaglineStrong: {
    fontWeight: '700',
    color: '#ffffff',
  },
  illustrationWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  illusSvgContainer: {
    width: 320,
    height: 290,
    ...Platform.select({
      web: {
        filter: 'drop-shadow(0 12px 24px rgba(30, 30, 80, 0.25))',
      },
      default: {
        shadowColor: 'rgba(30, 30, 80, 0.25)',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 24,
      }
    })
  },
  authRight: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 42,
    paddingHorizontal: 64,
    paddingBottom: 48,
    zIndex: 1,
  },
  authRightMobile: {
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 36,
  },
  langBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  langBtnText: {
    fontSize: 12.48,
    color: '#8a8aaa',
  },
  formArea: {
    flex: 1,
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 28.8,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 26,
    letterSpacing: -0.576, // -0.02em
  },
  ssoRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 22,
  },
  ssoPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e0e0f0',
    borderRadius: 8,
  },
  ssoPillText: {
    fontSize: 12.16,
    fontWeight: '600',
    color: '#3a3a5c',
  },
  formSubtitle: {
    fontSize: 15.36,
    color: '#6b7280',
    marginBottom: 32,
    lineHeight: 24,
  },
  rolesContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  roleIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: 13.5,
    color: '#64748b',
    lineHeight: 20,
  }
});
