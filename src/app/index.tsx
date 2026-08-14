import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Platform,
  ScrollView,
  Animated,
  Modal,
} from 'react-native';
import { 
  Play, 
  Activity, 
  Microscope, 
  ShieldAlert, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Stethoscope, 
  Users, 
  TrendingUp, 
  Cpu, 
  Zap 
} from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import Svg, { Polygon } from 'react-native-svg';

export default function LandingScreen() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const isTablet = width <= 1200;
  const isMobile = width <= 992;
  const isSmallMobile = width <= 600;

  // Modals state
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showPortalModal, setShowPortalModal] = useState(false);

  // Interactive Live Demo Simulator State
  const [demoBiomarker, setDemoBiomarker] = useState<'mild' | 'moderate' | 'severe'>('severe');
  const [demoExposure, setDemoExposure] = useState<number>(7); // Days of exposure
  
  // Dynamic calculation for the interactive demo
  const calculateAmrScore = () => {
    let base = demoBiomarker === 'mild' ? 28 : demoBiomarker === 'moderate' ? 62 : 88;
    let exposureAdd = Math.min(12, demoExposure * 1.5);
    return Math.min(99, Math.round(base + exposureAdd));
  };

  const amrScore = calculateAmrScore();
  const isEscalationNeeded = amrScore >= 75;

  // Floating animations for telemetry badges
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Float animation 1
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -8,
          duration: 2600,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();

    // Float animation 2 (staggered)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 7,
          duration: 3200,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 3200,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    ).start();
  }, [floatAnim1, floatAnim2, pulseAnim]);

  return (
    <View style={styles.container}>
      {/* Background Decorations */}
      <View style={[styles.bgCircle, styles.bgCircle1]} />
      <View style={[styles.bgCircle, styles.bgCircle2]} />
      <View style={[styles.bgCircle, styles.bgCircle3]} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation */}
        <View style={[styles.navbar, isMobile && styles.navbarMobile]}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.navBrand}>
              <Image 
                source={require('../../assets/images/logo.png')} 
                style={styles.logoImg}
                resizeMode="contain" 
              />
            </TouchableOpacity>
          </Link>

          <View style={styles.navActions}>
            <TouchableOpacity 
              style={styles.btnLogin}
              onPress={() => setShowPortalModal(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.btnLoginText}>Access Portals</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={[styles.hero, isMobile && styles.heroMobile]}>
          
          {/* Left Content */}
          <View style={[styles.heroContent, isMobile && styles.heroContentMobile]}>
            {/* Live Reactive Badge */}
            <View style={styles.liveStatusPill}>
              <Animated.View style={[styles.liveDot, { transform: [{ scale: pulseAnim }] }]} />
              <Text style={styles.liveStatusText}>Live CDS Telemetry • Real-Time AI Inference Active</Text>
            </View>

            <Text style={[styles.heroTitle, isTablet && styles.heroTitleTablet, isSmallMobile && styles.heroTitleSmallMobile]}>
              Antimicrobial Resistance (AMR) Clinical Decision Support
            </Text>
            <Text style={styles.heroSubtitle}>
              Real-time risk stratification, antibiotic exposure telemetry, and clinical override protocols for critical care units.
            </Text>
            
            <View style={[styles.heroButtons, isMobile && styles.heroButtonsMobile]}>
              <TouchableOpacity 
                style={styles.btnPrimary} 
                onPress={() => setShowPortalModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.btnPrimaryText}>Access Portals</Text>
                <ArrowRight color="#ffffff" size={18} style={{ marginLeft: 8 }} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.btnSecondary} 
                onPress={() => setShowDemoModal(true)}
                activeOpacity={0.85}
              >
                <View style={styles.iconWrapper}>
                  <Play color="#65dfd2" size={18} fill="#65dfd2" />
                </View>
                <Text style={styles.btnSecondaryText}>View Interactive Demo</Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.heroStats, isTablet && styles.heroStatsTablet, isMobile && styles.heroStatsMobile]}>
              <TouchableOpacity 
                style={styles.statItem} 
                activeOpacity={0.8}
                onPress={() => setShowDemoModal(true)}
              >
                <View style={styles.statIcon}>
                  <Activity color="#ffffff" size={22} />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>0.2s</Text>
                  <Text style={styles.statLabel}>Risk Stratification</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.statItem} 
                activeOpacity={0.8}
                onPress={() => setShowDemoModal(true)}
              >
                <View style={styles.statIcon}>
                  <Microscope color="#ffffff" size={22} />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>12+</Text>
                  <Text style={styles.statLabel}>Live Biomarkers</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.statItem} 
                activeOpacity={0.8}
                onPress={() => setShowPortalModal(true)}
              >
                <View style={styles.statIcon}>
                  <ShieldAlert color="#ffffff" size={22} />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>100%</Text>
                  <Text style={styles.statLabel}>Override Logging</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Right Visuals */}
          <View style={[styles.heroVisual, isMobile && styles.heroVisualMobile]}>
            <View style={[
              styles.visualShape, 
              isMobile ? styles.visualShapeMobile : null,
              Platform.OS === 'web' 
                ? { clipPath: isMobile ? 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)' : 'polygon(45% 0, 100% 0, 100% 100%, 0% 100%)' } as any
                : {}
            ]}>
              {/* Fallback for Native if clipPath is missing */}
              {Platform.OS !== 'web' && (
                <View style={StyleSheet.absoluteFill}>
                  <Svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <Polygon points={isMobile ? "0,15 100,0 100,100 0,100" : "45,0 100,0 100,100 0,100"} fill="#65dfd2" />
                  </Svg>
                </View>
              )}

              {/* Background circles on the teal shape */}
              <View style={[styles.shapeCircle, styles.shapeCircle1]} />
              <View style={[styles.shapeCircle, styles.shapeCircle2]} />
              <View style={[styles.shapeCircle, styles.shapeCircle3]} />
            </View>

            {/* Reactive Floating Telemetry Card 1 */}
            {!isMobile && (
              <Animated.View style={[
                styles.telemetryCardTop,
                { transform: [{ translateY: floatAnim1 }] }
              ]}>
                <View style={styles.telemetryDotWrap}>
                  <View style={styles.pulseDotRed} />
                </View>
                <View>
                  <Text style={styles.telemetryTag}>AMR Risk Index</Text>
                  <Text style={styles.telemetryTitle}>84% • Critical Escalation</Text>
                </View>
              </Animated.View>
            )}

            {/* Reactive Floating Telemetry Card 2 */}
            {!isMobile && (
              <Animated.View style={[
                styles.telemetryCardBottom,
                { transform: [{ translateY: floatAnim2 }] }
              ]}>
                <View style={styles.telemetryIconWrap}>
                  <Zap color="#0d9488" size={16} />
                </View>
                <View>
                  <Text style={styles.telemetryTag}>Real-time AST Inference</Text>
                  <Text style={styles.telemetryTitle}>Meropenem Active (0.2s)</Text>
                </View>
              </Animated.View>
            )}

            <Image 
              source={require('../../assets/images/doctor_female_transparent_cropped.png')}
              style={[styles.visualImage, isTablet && styles.visualImageTablet, isMobile && styles.visualImageMobile]}
              resizeMode={isMobile ? "cover" : "contain"}
            />
          </View>

        </View>
      </ScrollView>

      {/* --- MODAL 1: Interactive Live AMR Demo Simulator --- */}
      <Modal visible={showDemoModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.demoModalCard, isMobile && styles.demoModalCardMobile]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleWrap}>
                <Sparkles color="#0d9488" size={20} />
                <Text style={styles.modalTitle}>Interactive AMR Risk Simulator</Text>
              </View>
              <TouchableOpacity 
                style={styles.closeBtn} 
                onPress={() => setShowDemoModal(false)}
              >
                <X color="#64748b" size={20} />
              </TouchableOpacity>
            </View>

            <Text style={styles.demoDesc}>
              Experience how Vyuha's Clinical Decision Support engine stratifies patient biomarkers and suggests automated escalation protocols in real time.
            </Text>

            {/* Interactive Biomarker Controls */}
            <View style={styles.simulatorControls}>
              <Text style={styles.controlSectionLabel}>1. Select Patient Infection Severity:</Text>
              <View style={styles.tabButtonGroup}>
                <TouchableOpacity 
                  style={[styles.tabButton, demoBiomarker === 'mild' && styles.tabButtonActive]}
                  onPress={() => setDemoBiomarker('mild')}
                >
                  <Text style={[styles.tabButtonText, demoBiomarker === 'mild' && styles.tabButtonTextActive]}>Mild (PCT 0.5)</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.tabButton, demoBiomarker === 'moderate' && styles.tabButtonActive]}
                  onPress={() => setDemoBiomarker('moderate')}
                >
                  <Text style={[styles.tabButtonText, demoBiomarker === 'moderate' && styles.tabButtonTextActive]}>Moderate (PCT 2.1)</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.tabButton, demoBiomarker === 'severe' && styles.tabButtonActive]}
                  onPress={() => setDemoBiomarker('severe')}
                >
                  <Text style={[styles.tabButtonText, demoBiomarker === 'severe' && styles.tabButtonTextActive]}>Critical (PCT 4.8+)</Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.controlSectionLabel, { marginTop: 16 }]}>
                2. Prior Broad-Spectrum Exposure Duration: <Text style={{ color: '#0d9488', fontWeight: '700' }}>{demoExposure} Days</Text>
              </Text>
              <View style={styles.exposureButtonsRow}>
                {[3, 5, 7, 10, 14].map((days) => (
                  <TouchableOpacity
                    key={days}
                    style={[styles.exposureChip, demoExposure === days && styles.exposureChipActive]}
                    onPress={() => setDemoExposure(days)}
                  >
                    <Text style={[styles.exposureChipText, demoExposure === days && styles.exposureChipTextActive]}>
                      {days}d
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Reactive Output Card */}
            <View style={[
              styles.demoResultBox, 
              isEscalationNeeded ? styles.demoResultBoxCritical : styles.demoResultBoxNormal
            ]}>
              <View style={styles.resultScoreHeader}>
                <View>
                  <Text style={styles.resultScoreSub}>Real-Time Calculated AMR Score</Text>
                  <Text style={[
                    styles.resultScoreVal, 
                    isEscalationNeeded ? { color: '#ef4444' } : { color: '#0d9488' }
                  ]}>
                    {amrScore}% Index
                  </Text>
                </View>
                <View style={[
                  styles.resultPill, 
                  isEscalationNeeded ? { backgroundColor: '#fee2e2' } : { backgroundColor: '#ccfbf1' }
                ]}>
                  {isEscalationNeeded ? (
                    <AlertTriangle color="#ef4444" size={16} />
                  ) : (
                    <CheckCircle2 color="#0d9488" size={16} />
                  )}
                  <Text style={[
                    styles.resultPillText, 
                    isEscalationNeeded ? { color: '#b91c1c' } : { color: '#0f766e' }
                  ]}>
                    {isEscalationNeeded ? 'High Resistance Risk' : 'Standard Response'}
                  </Text>
                </View>
              </View>

              <View style={styles.recommendationLine}>
                <Text style={styles.recommendationLabel}>Clinical Decision Recommendation:</Text>
                <Text style={styles.recommendationText}>
                  {isEscalationNeeded 
                    ? "Immediate protocol escalation from Ceftriaxone to Meropenem advised due to high AMR risk telemetry."
                    : "Maintain conservative de-escalation regimen. Continue serial Procalcitonin tracking."}
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.demoModalActions}>
              <TouchableOpacity 
                style={styles.demoActionPrimary}
                onPress={() => {
                  setShowDemoModal(false);
                  router.push('/dashboard' as any);
                }}
              >
                <Text style={styles.demoActionPrimaryText}>Explore Full Doctor CDS Portal</Text>
                <ArrowRight color="#ffffff" size={16} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.demoActionSecondary}
                onPress={() => setShowDemoModal(false)}
              >
                <Text style={styles.demoActionSecondaryText}>Close Simulator</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- MODAL 2: Quick Portal Access --- */}
      <Modal visible={showPortalModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.portalModalCard, isMobile && styles.portalModalCardMobile]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Your Access Portal</Text>
              <TouchableOpacity 
                style={styles.closeBtn} 
                onPress={() => setShowPortalModal(false)}
              >
                <X color="#64748b" size={20} />
              </TouchableOpacity>
            </View>

            <Text style={styles.portalSub}>
              Select your clinical role to open the dedicated AMR decision interface:
            </Text>

            <View style={styles.portalGrid}>
              {/* Doctor Portal Card */}
              <TouchableOpacity 
                style={styles.portalCardItem}
                activeOpacity={0.85}
                onPress={() => {
                  setShowPortalModal(false);
                  router.push('/dashboard' as any);
                }}
              >
                <View style={[styles.portalIconBox, { backgroundColor: 'rgba(101, 223, 210, 0.18)' }]}>
                  <Stethoscope color="#0d9488" size={28} />
                </View>
                <Text style={styles.portalCardTitle}>Doctor CDS Portal</Text>
                <Text style={styles.portalCardDesc}>
                  Real-time patient risk stratification, AST reports, and clinical override management.
                </Text>
                <View style={styles.portalCardLink}>
                  <Text style={styles.portalCardLinkText}>Launch Doctor Workspace</Text>
                  <ArrowRight color="#0d9488" size={14} />
                </View>
              </TouchableOpacity>

              {/* Staff Portal Card */}
              <TouchableOpacity 
                style={styles.portalCardItem}
                activeOpacity={0.85}
                onPress={() => {
                  setShowPortalModal(false);
                  router.push('/staff' as any);
                }}
              >
                <View style={[styles.portalIconBox, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
                  <Users color="#2563eb" size={28} />
                </View>
                <Text style={styles.portalCardTitle}>Staff & Records Portal</Text>
                <Text style={styles.portalCardDesc}>
                  Manage patient admission, record new biomarkers, vitals, and antibiotic intake.
                </Text>
                <View style={styles.portalCardLink}>
                  <Text style={[styles.portalCardLinkText, { color: '#2563eb' }]}>Launch Staff Workspace</Text>
                  <ArrowRight color="#2563eb" size={14} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    bottom: -100,
    left: -150,
  },
  bgCircle3: {
    width: 150,
    height: 150,
    bottom: 50,
    right: '40%',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 16,
    zIndex: 10,
  },
  navbarMobile: {
    paddingHorizontal: 20,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    height: 80,
    width: 160,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 32,
    marginLeft: 'auto',
    marginRight: 40,
  },
  navLink: {
    color: '#6b7280',
    fontSize: 15.2, // 0.95rem
    fontWeight: '500',
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#65dfd2',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 99,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(79, 209, 197, 0.3)' },
      default: { shadowColor: 'rgba(79,209,197,0.3)', shadowOffset: {width:0, height:4}, shadowOpacity: 1, shadowRadius: 12 }
    })
  },
  btnLoginText: {
    color: 'white',
    fontSize: 15.2,
    fontWeight: '600',
  },
  hero: {
    flexDirection: 'row',
    flex: 1,
    minHeight: Platform.OS === 'web' ? 'calc(100vh - 112px)' as any : 600,
    paddingLeft: 80,
    alignItems: 'center',
    position: 'relative',
  },
  heroMobile: {
    flexDirection: 'column',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroContent: {
    flex: 1,
    maxWidth: 580,
    paddingRight: 40,
    zIndex: 2,
  },
  heroContentMobile: {
    maxWidth: '100%',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 60,
    paddingRight: 0,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1f2937',
    lineHeight: 56,
    marginBottom: 16,
    letterSpacing: -1,
  },
  heroTitleTablet: {
    fontSize: 44.8, // 2.8rem
    lineHeight: 52,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 24,
    maxWidth: 500,
  },
  heroButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 32,
  },
  heroButtonsMobile: {
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#65dfd2',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 99,
    ...Platform.select({
      web: { boxShadow: '0 8px 24px rgba(79, 209, 197, 0.35)' },
      default: { shadowColor: 'rgba(79,209,197,0.35)', shadowOffset: {width:0, height:8}, shadowOpacity: 1, shadowRadius: 24 }
    })
  },
  btnPrimaryText: {
    color: 'white',
    fontSize: 16.8, // 1.05rem
    fontWeight: '600',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(101, 223, 210, 0.15)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: '#65dfd2',
    fontSize: 16.8,
    fontWeight: '600',
  },
  heroStats: {
    flexDirection: 'row',
    gap: 48,
  },
  heroStatsTablet: {
    gap: 24,
  },
  heroStatsMobile: {
    justifyContent: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#65dfd2',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    flexDirection: 'column',
  },
  statValue: {
    fontSize: 20, // 1.25rem
    fontWeight: '700',
    color: '#1f2937',
    lineHeight: 24,
  },
  statLabel: {
    fontSize: 13.6, // 0.85rem
    color: '#6b7280',
    fontWeight: '500',
  },
  heroVisual: {
    flex: 1.2,
    alignSelf: 'stretch',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  heroVisualMobile: {
    width: '100%',
    justifyContent: 'center',
    minHeight: 400,
  },
  visualShape: {
    position: 'absolute',
    top: -112,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Platform.OS === 'web' ? '#65dfd2' : 'transparent',
    zIndex: 1,
    overflow: 'hidden',
  },
  visualShapeMobile: {
    width: '100vw' as any,
    right: -40,
    top: '10%',
  },
  shapeCircle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 24,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    pointerEvents: 'none',
  },
  shapeCircle1: {
    width: 320,
    height: 320,
    top: '15%',
    right: '18%',
  },
  shapeCircle2: {
    width: 220,
    height: 220,
    bottom: '12%',
    right: -40,
  },
  shapeCircle3: {
    width: 160,
    height: 160,
    top: '52%',
    left: '22%',
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
    maxHeight: 350,
    marginTop: 40,
  },
  liveStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 99,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  liveStatusText: {
    color: '#065f46',
    fontSize: 12.5,
    fontWeight: '600',
  },
  heroTitleSmallMobile: {
    fontSize: 32,
    lineHeight: 40,
  },
  telemetryCardTop: {
    position: 'absolute',
    top: '22%',
    left: '-8%',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
    ...Platform.select({
      web: { boxShadow: '0 12px 28px rgba(15, 23, 42, 0.15)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16 },
    }),
  },
  telemetryCardBottom: {
    position: 'absolute',
    bottom: '12%',
    right: '8%',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
    ...Platform.select({
      web: { boxShadow: '0 12px 28px rgba(15, 23, 42, 0.15)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16 },
    }),
  },
  telemetryDotWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseDotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
  },
  telemetryIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  telemetryTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  telemetryTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0f172a',
  },
  // Modal Common Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...Platform.select({
      web: { backdropFilter: 'blur(8px)' } as any,
    }),
  },
  demoModalCard: {
    width: '100%',
    maxWidth: 640,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    ...Platform.select({
      web: { boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.25, shadowRadius: 32 },
    }),
  },
  demoModalCardMobile: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoDesc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 20,
  },
  simulatorControls: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  controlSectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },
  tabButtonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#0d9488',
    borderColor: '#0d9488',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  tabButtonTextActive: {
    color: '#ffffff',
  },
  exposureButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  exposureChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
  },
  exposureChipActive: {
    backgroundColor: '#ccfbf1',
    borderColor: '#0d9488',
  },
  exposureChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  exposureChipTextActive: {
    color: '#0d9488',
  },
  demoResultBox: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    marginBottom: 20,
  },
  demoResultBoxCritical: {
    backgroundColor: '#fff5f5',
    borderColor: '#fca5a5',
  },
  demoResultBoxNormal: {
    backgroundColor: '#f0fdfa',
    borderColor: '#99f6e4',
  },
  resultScoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultScoreSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  resultScoreVal: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  resultPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 99,
  },
  resultPillText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  recommendationLine: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
    paddingTop: 12,
  },
  recommendationLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#1e293b',
    lineHeight: 20,
  },
  demoModalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  demoActionPrimary: {
    flex: 1,
    backgroundColor: '#0d9488',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  demoActionPrimaryText: {
    color: '#ffffff',
    fontSize: 14.5,
    fontWeight: '600',
  },
  demoActionSecondary: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  demoActionSecondaryText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  // Portal Modal
  portalModalCard: {
    width: '100%',
    maxWidth: 580,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    ...Platform.select({
      web: { boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.25, shadowRadius: 32 },
    }),
  },
  portalModalCardMobile: {
    padding: 20,
  },
  portalSub: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 20,
  },
  portalGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  portalCardItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    padding: 20,
    justifyContent: 'space-between',
  },
  portalIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  portalCardTitle: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  portalCardDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 16,
  },
  portalCardLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  portalCardLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0d9488',
  },
});
