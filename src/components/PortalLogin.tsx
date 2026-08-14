import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { DEMO_CREDENTIALS, type Role } from '../data/mockData';

type Props = {
  role: Role;
  heading: string;
  kicker: string;
  blurb: string;
  bullets: string[];
  destination: string;
};

export default function PortalLogin({ role, heading, kicker, blurb, bullets, destination }: Props) {
  const { width } = useWindowDimensions();
  const isMobile = width <= 860;
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const result = login(role, email, password);
    if (result.ok) {
      setError('');
      router.replace(destination as any);
    } else {
      setError(result.error);
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS[role].email);
    setPassword(DEMO_CREDENTIALS[role].password);
    setError('');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={[styles.card, isMobile && styles.cardMobile]}>
            {/* Brand panel */}
            <LinearGradient
              colors={['#0d9488', '#14b8a6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.left, isMobile && styles.leftMobile]}
            >
              <View style={styles.circleDeco} />
              <View style={styles.brandRow}>
                <View style={styles.brandMark}>
                  <ShieldCheck color="#0d9488" size={18} strokeWidth={2.6} />
                </View>
                <Text style={styles.brandName}>AMR-GUARD</Text>
              </View>

              <Text style={styles.leftKicker}>{kicker}</Text>
              <Text style={styles.leftBlurb}>{blurb}</Text>

              <View style={styles.bulletList}>
                {bullets.map((bullet) => (
                  <View key={bullet} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>

            {/* Form panel */}
            <View style={[styles.right, isMobile && styles.rightMobile]}>
              <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/login')}>
                <ArrowLeft color="#64748b" size={15} strokeWidth={2.4} />
                <Text style={styles.backText}>Change portal</Text>
              </TouchableOpacity>

              <Text style={styles.formTitle}>{heading}</Text>
              <Text style={styles.formSub}>Sign in with your hospital-issued credentials.</Text>

              <View style={styles.field}>
                <Text style={styles.label}>Work email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(v) => {
                    setEmail(v);
                    setError('');
                  }}
                  placeholder="name@amrguard.health"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordWrap}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    value={password}
                    onChangeText={(v) => {
                      setPassword(v);
                      setError('');
                    }}
                    placeholder="Enter your password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    onSubmitEditing={handleSubmit}
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setShowPassword(!showPassword)}
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <Eye color="#94a3b8" size={17} />
                    ) : (
                      <EyeOff color="#94a3b8" size={17} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {!!error && (
                <View style={styles.errorBox}>
                  <AlertCircle color="#dc2626" size={15} strokeWidth={2.3} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit}
                accessibilityRole="button"
              >
                <Text style={styles.submitText}>Sign in</Text>
              </TouchableOpacity>

              <View style={styles.demoBox}>
                <Text style={styles.demoTitle}>Demo credentials</Text>
                <Text style={styles.demoLine}>{DEMO_CREDENTIALS[role].email}</Text>
                <Text style={styles.demoLine}>{DEMO_CREDENTIALS[role].password}</Text>
                <TouchableOpacity onPress={fillDemo} accessibilityRole="button">
                  <Text style={styles.demoFill}>Fill automatically</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 940,
    backgroundColor: '#ffffff',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d1fae5',
    ...Platform.select({
      web: { boxShadow: '0 24px 55px -20px rgba(13, 148, 136, 0.28)' },
      default: {
        shadowColor: 'rgba(13,148,136,0.28)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 45,
        elevation: 10,
      },
    }),
  },
  cardMobile: {
    flexDirection: 'column',
    maxWidth: 460,
  },
  left: {
    width: 400,
    paddingHorizontal: 34,
    paddingVertical: 40,
    overflow: 'hidden',
  },
  leftMobile: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  circleDeco: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    bottom: -110,
    right: -100,
    pointerEvents: 'none',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16.5,
    color: '#ffffff',
    letterSpacing: 0.6,
  },
  leftKicker: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.82)',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  leftBlurb: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: '#ffffff',
    lineHeight: 31,
    letterSpacing: -0.4,
    marginBottom: 26,
  },
  bulletList: {
    gap: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 21,
  },
  right: {
    flex: 1,
    paddingHorizontal: 38,
    paddingVertical: 34,
  },
  rightMobile: {
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 22,
  },
  backText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#64748b',
  },
  formTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 25,
    color: '#0f172a',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  formSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: '#64748b',
    marginBottom: 26,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#ffffff',
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null),
  },
  passwordWrap: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 44,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 10,
    padding: 11,
    marginBottom: 16,
  },
  errorText: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#b91c1c',
    lineHeight: 19,
  },
  submitBtn: {
    backgroundColor: '#0d9488',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 22,
  },
  submitText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14.5,
    color: '#ffffff',
  },
  demoBox: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 14,
  },
  demoTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11.5,
    color: '#475569',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  demoLine: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12.5,
    color: '#0f172a',
    lineHeight: 20,
  },
  demoFill: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12.5,
    color: '#0d9488',
    marginTop: 8,
  },
});
