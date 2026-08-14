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
  const isTablet = width <= 1100;
  const isMobile = width <= 850;
  const isSmallMobile = width <= 520;

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

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, isMobile && styles.scrollContentMobile]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation */}
        <View style={[styles.navbar, isMobile && styles.navbarMobile, isSmallMobile && styles.navbarSmallMobile]}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.navBrand} activeOpacity={0.8}>
              <Image 
                source={require('../../assets/images/logo.png')} 
                style={[styles.logoImg, isSmallMobile && styles.logoImgSmall]} 
                resizeMode="contain" 
              />
            </TouchableOpacity>
          </Link>

          <View style={styles.navActions}>
            <TouchableOpacity 
              style={[styles.btnLogin, isSmallMobile && styles.btnLoginSmall]}
              onPress={() => setShowPortalModal(true)}
              activeOpacity={0.85}
            >
              <Text style={[styles.btnLoginText, isSmallMobile && styles.btnLoginTextSmall]}>Access Portals</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={[styles.hero, isMobile && styles.heroMobile]}>
          
          {/* Left Content */}
          <View style={[styles.heroContent, isMobile && styles.heroContentMobile]}>
            {/* Live Reactive Badge */}
            <View style={[styles.liveStatusPill, isMobile && styles.liveStatusPillMobile]}>
              <Animated.View style={[styles.liveDot, { transform: [{ scale: pulseAnim }] }]} />
              <Text style={styles.liveStatusText} numberOfLines={1}>
                {isSmallMobile ? 'Live CDS Active' : 'Live CDS Telemetry • Real-Time AI Inference Active'}
              </Text>
            </View>

            <Text style={[
              styles.heroTitle, 
              isTablet && styles.heroTitleTablet, 
              isMobile && styles.heroTitleMobile,
              isSmallMobile && styles.heroTitleSmallMobile
            ]}>
              Antimicrobial Resistance (AMR) Clinical Decision Support
            </Text>
            
            <Text style={[styles.heroSubtitle, isMobile && styles.heroSubtitleMobile]}>
              Real-time risk stratification, antibiotic exposure telemetry, and clinical override protocols for critical care units.
            </Text>
            
            {/* Buttons Group */}
            <View style={[
              styles.heroButtons, 
              isMobile && styles.heroButtonsMobile,
              isSmallMobile && styles.heroButtonsSmallMobile
            ]}>
              <TouchableOpacity 
                style={[styles.btnPrimary, isSmallMobile && styles.btnPrimarySmall]} 
                onPress={() => setShowPortalModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.btnPrimaryText}>Access Portals</Text>
                <ArrowRight color="#ffffff" size={18} style={{ marginLeft: 8 }} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.btnSecondary, isSmallMobile && styles.btnSecondarySmall]} 
                onPress={() => setShowDemoModal(true)}
                activeOpacity={0.85}
              >
                <View style={styles.iconWrapper}>
                  <Play color="#0d9488" size={16} fill="#0d9488" />
                </View>
                <Text style={styles.btnSecondaryText}>View Interactive Demo</Text>
              </TouchableOpacity>
            </View>
            
            {/* Stats Group: Desktop/Tablet vs Mobile compact 3-col card */}
            {!isSmallMobile ? (
              <View style={[styles.heroStats, isTablet && styles.heroStatsTablet, isMobile && styles.heroStatsMobile]}>
                <TouchableOpacity 
                  style={styles.statItem} 
                  activeOpacity={0.8}
                  onPress={() => setShowDemoModal(true)}
                >
                  <View style={styles.statIcon}>
                    <Activity color="#ffffff" size={20} />
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
                    <Microscope color="#ffffff" size={20} />
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
                    <ShieldAlert color="#ffffff" size={20} />
                  </View>
                  <View style={styles.statInfo}>
                    <Text style={styles.statValue}>100%</Text>
                    <Text style={styles.statLabel}>Override Logging</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.statsCardCompactMobile}>
                <TouchableOpacity style={styles.statColMobile} onPress={() => setShowDemoModal(true)}>
                  <View style={styles.statIconMini}>
                    <Activity color="#0d9488" size={16} />
                  </View>
                  <Text style={styles.statValueCompact}>0.2s</Text>
                  <Text style={styles.statLabelCompact}>Stratification</Text>
                </TouchableOpacity>

                <View style={styles.statColDivider} />

                <TouchableOpacity style={styles.statColMobile} onPress={() => setShowDemoModal(true)}>
                  <View style={styles.statIconMini}>
                    <Microscope color="#0d9488" size={16} />
                  </View>
                  <Text style={styles.statValueCompact}>12+</Text>
                  <Text style={styles.statLabelCompact}>Biomarkers</Text>
                </TouchableOpacity>

                <View style={styles.statColDivider} />

                <TouchableOpacity style={styles.statColMobile} onPress={() => setShowPortalModal(true)}>
                  <View style={styles.statIconMini}>
                    <ShieldAlert color="#0d9488" size={16} />
                  </View>
                  <Text style={styles.statValueCompact}>100%</Text>
                  <Text style={styles.statLabelCompact}>Overrides</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {/* Right Visuals - Desktop and Tablet Only */}
          {!isMobile && (
            <View style={styles.heroVisual}>
              <View style={[
                styles.visualShape, 
                Platform.OS === 'web'
                  ? { clipPath: 'polygon(45% 0%, 100% 0%, 100% 100%, 0% 100%)' } as any
                  : {}
              ]}>
                {/* Background circles on the teal shape */}
                <View style={[styles.shapeCircle, styles.shapeCircle1]} />
                <View style={[styles.shapeCircle, styles.shapeCircle2]} />
                <View style={[styles.shapeCircle, styles.shapeCircle3]} />
              </View>

              <Image 
                source={require('../../assets/images/doctor_female_transparent_cropped.png')}
                style={[
                  styles.visualImage, 
                  isTablet && styles.visualImageTablet
                ]}
                resizeMode="contain"
              />
            </View>
          )}

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
    paddingVertical: 12,
  },
  navbarSmallMobile: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    height: 80,
    width: 160,
  },
  logoImgSmall: {
    height: 46,
    width: 110,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 32,
    marginLeft: 'auto',
    marginRight: 40,
  },
  navLink: {
    color: '#6b7280',
    fontSize: 15.2,
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
  btnLoginSmall: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  btnLoginText: {
    color: 'white',
    fontSize: 15.2,
    fontWeight: '600',
  },
  btnLoginTextSmall: {
    fontSize: 13,
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    minHeight: 'auto' as any,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    maxWidth: 580,
    paddingRight: 40,
    zIndex: 2,
  },
  heroContentMobile: {
    maxWidth: 520,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 0,
    paddingRight: 0,
    width: '100%',
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
    fontSize: 38,
    lineHeight: 46,
  },
  heroTitleMobile: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    marginBottom: 14,
  },
  heroTitleSmallMobile: {
    fontSize: 25,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 24,
    maxWidth: 500,
  },
  heroSubtitleMobile: {
    fontSize: 14.5,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 22,
    maxWidth: 440,
  },
  heroButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 32,
  },
  heroButtonsMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 28,
    width: '100%',
  },
  heroButtonsSmallMobile: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'stretch',
    gap: 10,
    marginBottom: 24,
  },
  btnPrimary: {
    backgroundColor: '#65dfd2',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0 8px 24px rgba(79, 209, 197, 0.35)' },
      default: { shadowColor: 'rgba(79,209,197,0.35)', shadowOffset: {width:0, height:8}, shadowOpacity: 1, shadowRadius: 24 }
    })
  },
  btnPrimarySmall: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  btnPrimaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  btnSecondarySmall: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 99,
    backgroundColor: 'rgba(101, 223, 210, 0.1)',
  },
  iconWrapper: {
    width: 34,
    height: 34,
    backgroundColor: 'rgba(101, 223, 210, 0.2)',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: '#0d9488',
    fontSize: 15.5,
    fontWeight: '600',
  },
  heroStats: {
    flexDirection: 'row',
    gap: 40,
  },
  heroStatsTablet: {
    gap: 20,
  },
  heroStatsMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    width: '100%',
  },
  heroStatsSmallMobile: {
    flexDirection: 'column',
    width: '100%',
    gap: 10,
    alignItems: 'stretch',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  statItemSmall: {
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '100%',
  },
  statIcon: {
    width: 42,
    height: 42,
    backgroundColor: '#65dfd2',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    flexDirection: 'column',
  },
  statValue: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1f2937',
    lineHeight: 22,
  },
  statLabel: {
    fontSize: 13,
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
    height: 340,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 24,
    marginTop: 16,
    marginBottom: 10,
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
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#65dfd2',
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
  shapeCircle1Mobile: {
    width: 220,
    height: 220,
    top: '-10%',
    right: '-10%',
  },
  shapeCircle2: {
    width: 220,
    height: 220,
    bottom: '12%',
    right: -40,
  },
  shapeCircle2Mobile: {
    width: 160,
    height: 160,
    bottom: '-10%',
    left: '-10%',
  },
  shapeCircle3: {
    width: 160,
    height: 160,
    top: '52%',
    left: '22%',
  },
  shapeCircle3Mobile: {
    width: 120,
    height: 120,
    top: '40%',
    right: '10%',
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
    position: 'absolute',
    bottom: 0,
    width: '90%',
    height: '95%',
    maxHeight: 330,
    zIndex: 2,
    pointerEvents: 'none',
    alignSelf: 'center',
  },
  visualImageSmallMobile: {
    height: '95%',
    maxHeight: 310,
  },
  // Compact 3-Column Mobile Stats Card
  statsCardCompactMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '100%',
    marginBottom: 8,
    ...Platform.select({
      web: { boxShadow: '0 4px 14px rgba(0,0,0,0.06)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
    }),
  },
  statColMobile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconMini: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statValueCompact: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  statLabelCompact: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 2,
  },
  statColDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#e2e8f0',
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
  liveStatusPillMobile: {
    alignSelf: 'center',
    marginBottom: 12,
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
