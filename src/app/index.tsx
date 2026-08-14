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
import { Play, Activity, Microscope, ShieldAlert } from 'lucide-react-native';
import { Link } from 'expo-router';
import Svg, { Polygon } from 'react-native-svg';

export default function LandingScreen() {
  const { width, height } = useWindowDimensions();
  const isTablet = width <= 1200;
  const isMobile = width <= 992;

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
            <Link href={"/portals" as any} asChild>
              <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.btnLoginText}>Login / Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Hero Section */}
        <View style={[styles.hero, isMobile && styles.heroMobile]}>
          
          {/* Left Content */}
          <View style={[styles.heroContent, isMobile && styles.heroContentMobile]}>
            <Text style={[styles.heroTitle, isTablet && styles.heroTitleTablet]}>
              Antimicrobial Resistance (AMR) Clinical Decision Support
            </Text>
            <Text style={styles.heroSubtitle}>
              Real-time risk stratification, antibiotic exposure telemetry, and clinical override protocols for critical care units.
            </Text>
            
            <View style={[styles.heroButtons, isMobile && styles.heroButtonsMobile]}>
              <Link href={"/portals" as any} asChild>
                <TouchableOpacity style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>Access Portals</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={styles.btnSecondary}>
                <View style={styles.iconWrapper}>
                  <Play color="#65dfd2" size={18} fill="#65dfd2" />
                </View>
                <Text style={styles.btnSecondaryText}>View Demo</Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.heroStats, isTablet && styles.heroStatsTablet, isMobile && styles.heroStatsMobile]}>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Activity color="#ffffff" size={22} />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>0.2s</Text>
                  <Text style={styles.statLabel}>Risk Stratification</Text>
                </View>
              </View>
              
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Microscope color="#ffffff" size={22} />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>12+</Text>
                  <Text style={styles.statLabel}>Live Biomarkers</Text>
                </View>
              </View>
              
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <ShieldAlert color="#ffffff" size={22} />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>100%</Text>
                  <Text style={styles.statLabel}>Override Logging</Text>
                </View>
              </View>
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
              {/* Fallback for Native if clipPath is missing: absolute SVG to cover the clipped area */}
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
            <Image 
              source={require('../../assets/images/landing_doctor_new.png')}
              style={[
                styles.visualImage, 
                isTablet && styles.visualImageTablet, 
                isMobile && styles.visualImageMobile,
                { right: '5%', bottom: '-5%' }
              ]}
              resizeMode={"contain"}
            />
          </View>

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
});
