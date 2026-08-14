import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Stethoscope,
  ClipboardList,
  ArrowRight,
  Brain,
  MessageSquareQuote,
  Activity,
  RefreshCw,
  User,
  ShieldAlert,
  FileSearch,
  ClipboardCheck,
} from 'lucide-react-native';
import { router } from 'expo-router';
import Svg, { Polygon } from 'react-native-svg';

const PILLARS = [
  {
    Icon: Brain,
    title: 'Predict',
    body: 'Scores each patient’s antimicrobial resistance risk from history, cultures and prior exposure.',
  },
  {
    Icon: MessageSquareQuote,
    title: 'Explain',
    body: 'Shows the drivers behind every score, so the reasoning is auditable — never a black box.',
  },
  {
    Icon: Activity,
    title: 'Act',
    body: 'Recommends an escalation or de-escalation the clinician can accept or override on the spot.',
  },
  {
    Icon: RefreshCw,
    title: 'Learn',
    body: 'Feeds each decision and outcome back in, so the model sharpens against local resistance.',
  },
];

const FLOW = [
  { Icon: User, label: 'Patient', caption: 'Staff prepare the record' },
  { Icon: ShieldAlert, label: 'Risk', caption: 'Engine scores AMR risk' },
  { Icon: FileSearch, label: 'Explanation', caption: 'Drivers made visible' },
  { Icon: ClipboardCheck, label: 'Clinical Decision', caption: 'Doctor decides' },
];

export default function LandingScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width <= 1200;
  const isMobile = width <= 992;

  return (
    <View style={styles.container}>
      <View style={[styles.bgCircle, styles.bgCircle1]} />
      <View style={[styles.bgCircle, styles.bgCircle2]} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation */}
        <View style={[styles.navbar, isMobile && styles.navbarMobile]}>
          <TouchableOpacity style={styles.navBrand} onPress={() => router.push('/')}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={[styles.logoImg, isMobile && styles.logoImgMobile]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnLogin} onPress={() => router.push('/login')}>
            <Text style={styles.btnLoginText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={[styles.hero, isMobile && styles.heroMobile]}>
          <View style={[styles.heroContent, isMobile && styles.heroContentMobile]}>
            <View style={styles.eyebrow}>
              <View style={styles.eyebrowDot} />
              <Text style={styles.eyebrowText}>Antimicrobial resistance intelligence</Text>
            </View>

            <Text
              style={[
                styles.heroTitle,
                isTablet && styles.heroTitleTablet,
                isMobile && styles.heroTitleMobile,
              ]}
            >
              Predict earlier. Treat smarter. Protect patients.
            </Text>

            <Text style={[styles.heroSubtitle, isMobile && styles.heroSubtitleMobile]}>
              AMR-GUARD reads a patient’s history the moment they are registered, flags the risk that
              the usual antibiotic will fail, and explains why — so the clinician decides with the
              evidence already in front of them.
            </Text>

            <View style={[styles.portalRow, isMobile && styles.portalRowMobile]}>
              <TouchableOpacity
                style={styles.portalCardPrimary}
                onPress={() => router.push('/login/staff')}
                accessibilityRole="button"
              >
                <View style={styles.portalIconLight}>
                  <ClipboardList color="#0f766e" size={20} strokeWidth={2.3} />
                </View>
                <View style={styles.portalCopy}>
                  <Text style={styles.portalTitleLight}>Staff Portal</Text>
                  <Text style={styles.portalSubLight}>Register, search and schedule patients</Text>
                </View>
                <ArrowRight color="#ffffff" size={18} strokeWidth={2.4} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.portalCard}
                onPress={() => router.push('/login/doctor')}
                accessibilityRole="button"
              >
                <View style={styles.portalIcon}>
                  <Stethoscope color="#0f766e" size={20} strokeWidth={2.3} />
                </View>
                <View style={styles.portalCopy}>
                  <Text style={styles.portalTitle}>Doctor Portal</Text>
                  <Text style={styles.portalSub}>Review AMR risk and decide treatment</Text>
                </View>
                <ArrowRight color="#0f766e" size={18} strokeWidth={2.4} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Visual */}
          <View style={[styles.heroVisual, isMobile && styles.heroVisualMobile]}>
            <View
              style={[
                styles.visualShape,
                isMobile ? styles.visualShapeMobile : null,
                Platform.OS === 'web'
                  ? ({
                      clipPath: isMobile
                        ? 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)'
                        : 'polygon(18% 0, 100% 0, 100% 100%, 0% 100%)',
                    } as any)
                  : {},
              ]}
            >
              {Platform.OS !== 'web' && (
                <View style={StyleSheet.absoluteFill}>
                  <Svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <Polygon
                      points={isMobile ? '0,15 100,0 100,100 0,100' : '18,0 100,0 100,100 0,100'}
                      fill="#65dfd2"
                    />
                  </Svg>
                </View>
              )}
              <View style={[styles.shapeCircle, styles.shapeCircle1]} />
              <View style={[styles.shapeCircle, styles.shapeCircle2]} />
            </View>

            <Image
              source={require('../../assets/images/doctor_female_transparent_cropped.png')}
              style={[
                styles.visualImage,
                isTablet && styles.visualImageTablet,
                isMobile && styles.visualImageMobile,
              ]}
              resizeMode={isMobile ? 'cover' : 'contain'}
              accessibilityLabel="Clinician reviewing patient data"
            />
          </View>
        </View>

        {/* Pillars */}
        <View style={[styles.section, isMobile && styles.sectionMobile]}>
          <Text style={styles.sectionKicker}>Predict • Explain • Act • Learn</Text>
          <View style={styles.pillarGrid}>
            {PILLARS.map(({ Icon, title, body }) => (
              <View key={title} style={styles.pillarCard}>
                <View style={styles.pillarIcon}>
                  <Icon color="#0d9488" size={19} strokeWidth={2.3} />
                </View>
                <Text style={styles.pillarTitle}>{title}</Text>
                <Text style={styles.pillarBody}>{body}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Flow */}
        <View style={[styles.section, styles.flowSection, isMobile && styles.sectionMobile]}>
          <Text style={styles.flowHeading}>How a case moves through AMR-GUARD</Text>
          <View style={[styles.flowRow, isMobile && styles.flowRowMobile]}>
            {FLOW.map(({ Icon, label, caption }, index) => (
              <React.Fragment key={label}>
                <View style={styles.flowStep}>
                  <View style={styles.flowIcon}>
                    <Icon color="#0f766e" size={20} strokeWidth={2.3} />
                  </View>
                  <Text style={styles.flowLabel}>{label}</Text>
                  <Text style={styles.flowCaption}>{caption}</Text>
                </View>
                {index < FLOW.length - 1 && (
                  <View style={[styles.flowArrow, isMobile && styles.flowArrowMobile]}>
                    <ArrowRight
                      color="#5eead4"
                      size={18}
                      strokeWidth={2.6}
                      style={isMobile ? ({ transform: [{ rotate: '90deg' }] } as any) : undefined}
                    />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
          <Text style={styles.flowFootnote}>
            The model recommends and explains. The clinician remains the decision-maker, and every
            accept or override is logged back into the system.
          </Text>
        </View>

        <View style={[styles.footer, isMobile && styles.footerMobile]}>
          <Text style={styles.footerText}>AMR-GUARD • Clinical decision support prototype</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  bgCircle: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 15,
    borderColor: 'rgba(79, 209, 197, 0.1)',
    zIndex: -1,
  },
  bgCircle1: {
    width: 250,
    height: 250,
    top: -50,
    left: '10%',
  },
  bgCircle2: {
    width: 400,
    height: 400,
    top: 420,
    left: -170,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 18,
    zIndex: 10,
  },
  navbarMobile: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    height: 120,
    width: 240,
  },
  logoImgMobile: {
    height: 78,
    width: 156,
  },
  btnLogin: {
    backgroundColor: '#14b8a6',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 99,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(20, 184, 166, 0.28)' },
      default: {
        shadowColor: 'rgba(20,184,166,0.28)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
    }),
  },
  btnLoginText: {
    color: '#ffffff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14.5,
  },
  hero: {
    flexDirection: 'row',
    paddingLeft: 80,
    alignItems: 'center',
    position: 'relative',
    minHeight: 560,
  },
  heroMobile: {
    flexDirection: 'column',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 32,
    minHeight: 0,
  },
  heroContent: {
    flex: 1,
    maxWidth: 600,
    paddingRight: 40,
    paddingVertical: 40,
    zIndex: 2,
  },
  heroContentMobile: {
    maxWidth: '100%',
    marginBottom: 28,
    paddingRight: 0,
    paddingVertical: 8,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#99f6e4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginBottom: 20,
  },
  eyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#14b8a6',
  },
  eyebrowText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#0f766e',
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 54,
    color: '#0f172a',
    lineHeight: 60,
    marginBottom: 20,
    letterSpacing: -1.4,
  },
  heroTitleTablet: {
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -1,
  },
  heroTitleMobile: {
    fontSize: 33,
    lineHeight: 40,
    letterSpacing: -0.8,
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16.5,
    color: '#475569',
    lineHeight: 27,
    marginBottom: 34,
    maxWidth: 520,
  },
  heroSubtitleMobile: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 26,
  },
  portalRow: {
    flexDirection: 'row',
    gap: 14,
    flexWrap: 'wrap',
  },
  portalRowMobile: {
    flexDirection: 'column',
  },
  portalCardPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0d9488',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexGrow: 1,
    flexBasis: 260,
    ...Platform.select({
      web: { boxShadow: '0 10px 26px rgba(13, 148, 136, 0.28)' },
      default: {
        shadowColor: 'rgba(13,148,136,0.28)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 26,
        elevation: 6,
      },
    }),
  },
  portalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#99f6e4',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexGrow: 1,
    flexBasis: 260,
  },
  portalIconLight: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portalIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f0fdfa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portalCopy: {
    flex: 1,
  },
  portalTitleLight: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15.5,
    color: '#ffffff',
  },
  portalSubLight: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  portalTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15.5,
    color: '#0f172a',
  },
  portalSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12.5,
    color: '#64748b',
    marginTop: 2,
  },
  heroVisual: {
    flex: 1.1,
    alignSelf: 'stretch',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  heroVisualMobile: {
    width: '100%',
    justifyContent: 'center',
    minHeight: 320,
  },
  visualShape: {
    position: 'absolute',
    top: -90,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Platform.OS === 'web' ? '#65dfd2' : 'transparent',
    zIndex: 1,
    overflow: 'hidden',
  },
  visualShapeMobile: {
    right: -24,
    left: -24,
    top: '12%',
  },
  shapeCircle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 24,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    pointerEvents: 'none',
  },
  shapeCircle1: {
    width: 300,
    height: 300,
    top: '16%',
    right: '16%',
  },
  shapeCircle2: {
    width: 200,
    height: 200,
    bottom: '10%',
    right: -40,
  },
  visualImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '95%',
    width: '90%',
    zIndex: 2,
    pointerEvents: 'none',
  },
  visualImageTablet: {
    width: '95%',
    right: 20,
  },
  visualImageMobile: {
    position: 'relative',
    height: 'auto',
    maxHeight: 300,
    marginTop: 30,
  },
  section: {
    paddingHorizontal: 80,
    paddingVertical: 56,
  },
  sectionMobile: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sectionKicker: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12.5,
    color: '#0f766e',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 26,
  },
  pillarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
  pillarCard: {
    flexGrow: 1,
    flexBasis: 230,
    minWidth: 210,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 20,
  },
  pillarIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f0fdfa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  pillarTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 17,
    color: '#0f172a',
    marginBottom: 8,
  },
  pillarBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: '#64748b',
    lineHeight: 21,
  },
  flowSection: {
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  flowHeading: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 24,
    color: '#0f172a',
    letterSpacing: -0.5,
    marginBottom: 30,
  },
  flowRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
  },
  flowRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  flowStep: {
    flexGrow: 1,
    flexBasis: 160,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 18,
  },
  flowIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  flowLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
    color: '#0f172a',
    marginBottom: 4,
  },
  flowCaption: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12.5,
    color: '#64748b',
    lineHeight: 19,
  },
  flowArrow: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
  },
  flowArrowMobile: {
    width: '100%',
    paddingVertical: 4,
  },
  flowFootnote: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: '#64748b',
    lineHeight: 21,
    marginTop: 24,
    maxWidth: 620,
  },
  footer: {
    paddingHorizontal: 80,
    paddingVertical: 26,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerMobile: {
    paddingHorizontal: 24,
  },
  footerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12.5,
    color: '#94a3b8',
  },
});
