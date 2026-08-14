import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
import { Eye, EyeOff, ChevronDown } from 'lucide-react-native';
import { Link } from 'expo-router';

// SVG components to replace exactly the HTML inline SVGs
import Svg, { Path, Circle, Ellipse, G, Rect } from 'react-native-svg';

export default function AuthScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 760;
  const [showPassword, setShowPassword] = useState(false);
  
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
                <Text style={styles.formTitle}>Create Account</Text>

                <View style={styles.ssoRow}>
                  <Link href="/dashboard" asChild>
                    <TouchableOpacity style={styles.ssoPill}>
                      <Svg width={15} height={15} viewBox="0 0 24 24">
                        <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </Svg>
                      <Text style={styles.ssoPillText}>Sign up with Google</Text>
                    </TouchableOpacity>
                  </Link>
                  
                  <Link href="/dashboard" asChild>
                    <TouchableOpacity style={styles.ssoPill}>
                      <Svg width={15} height={15} viewBox="0 0 24 24" fill="#1877F2">
                        <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </Svg>
                      <Text style={styles.ssoPillText}>Sign up with Facebook</Text>
                    </TouchableOpacity>
                  </Link>
                </View>

                <View style={styles.orDivider}>
                  <View style={styles.orLine} />
                  <Text style={styles.orText}>-OR-</Text>
                  <View style={styles.orLine} />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Full Name:</Text>
                  <View style={styles.underlineInputWrap}>
                    <TextInput style={styles.input} placeholderTextColor="#c0c0d8" />
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Email:</Text>
                  <View style={styles.underlineInputWrap}>
                    <TextInput style={styles.input} placeholderTextColor="#c0c0d8" keyboardType="email-address" />
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Password:</Text>
                  <View style={styles.underlineInputWrap}>
                    <TextInput 
                      style={styles.input} 
                      placeholderTextColor="#c0c0d8" 
                      secureTextEntry={!showPassword} 
                    />
                    <TouchableOpacity 
                      style={styles.eyeBtn}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye color="#a0a0c0" size={18} /> : <EyeOff color="#a0a0c0" size={18} />}
                    </TouchableOpacity>
                  </View>
                </View>

                <Link href="/dashboard" asChild>
                  <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Create Account</Text>
                  </TouchableOpacity>
                </Link>

                <View style={styles.switchRow}>
                  <Text style={styles.switchQuestion}>Already have an Account?</Text>
                  <TouchableOpacity>
                    <Text style={styles.switchLink}>Log in</Text>
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
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 22,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e8e8f5',
  },
  orText: {
    fontSize: 11.52,
    fontWeight: '600',
    color: '#a0a0c0',
    letterSpacing: 0.69, // 0.06em
  },
  fieldGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 12.48,
    fontWeight: '500',
    color: '#5a5a7a',
    marginBottom: 4,
  },
  underlineInputWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#d0d0e8',
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    paddingRight: 32,
    fontSize: 14.4,
    color: '#1a1a2e',
    backgroundColor: 'transparent',
    outlineStyle: 'none', // for web
  } as any,
  eyeBtn: {
    position: 'absolute',
    right: 0,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
      },
      default: {
        shadowColor: 'rgba(37, 99, 235, 0.3)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 14,
      }
    })
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 14.72,
    fontWeight: '600',
    letterSpacing: 0.29, // 0.02em
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  switchQuestion: {
    fontSize: 12.8,
    color: '#8a8aaa',
  },
  switchLink: {
    color: '#2563eb',
    fontSize: 12.8,
    fontWeight: '700',
    textDecorationLine: 'underline',
  }
});
