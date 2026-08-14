import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  House, Users, BarChart2, BookOpen, Settings, LogOut, ChevronDown, Bell,
  Check, Pencil, CheckCheck, AlertCircle, Activity, TrendingUp, Droplet,
  HeartPulse, Plus, ChevronLeft, ChevronRight, BellRing, CheckSquare,
  FileCheck, ArrowRight, Edit3, X, Pin, LayoutGrid, FlaskConical
} from 'lucide-react-native';
import Svg, { Circle, Rect, Path, G } from 'react-native-svg';

import { useAuth } from '../../context/AuthContext';
import { MOCK_PATIENTS } from '../../data/mockData';
import { useLocalSearchParams, router } from 'expo-router';

export default function PatientDetailScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width <= 1280;
  const isMobile = width <= 1024;
  
  const { userRole, logout } = useAuth();
  const { id } = useLocalSearchParams();
  const activePatient = MOCK_PATIENTS.find(p => p.id === id) || MOCK_PATIENTS[0];

  const [activeNav, setActiveNav] = useState('overview');
  const [showNotif, setShowNotif] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAddMetricModal, setShowAddMetricModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [heroAccepted, setHeroAccepted] = useState(false);
  const [heroOverridden, setHeroOverridden] = useState(false);
  const [telemetryTab, setTelemetryTab] = useState<'levels' | 'trend'>('levels');

  return (
    <LinearGradient colors={['#e6fffa', '#b2f5ea', '#81e6d9']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.body}>
      <View style={styles.dashboardWrapper}>
        <View style={[styles.dashboardCard, isTablet && styles.dashboardCardTablet, isMobile && styles.dashboardCardMobile]}>
          
          {/* 1. Left Nav Dock */}
          <View style={[styles.navDock, isMobile && styles.navDockMobile]}>
            {!isMobile && (
              <View style={styles.navBrand}>
                {/* 4-Square Grid Logo */}
                <TouchableOpacity style={styles.gridLogoBtn}>
                  <LayoutGrid color="#14b8a6" size={24} />
                </TouchableOpacity>
              </View>
            )}

            <View style={[styles.navMenu, isMobile && styles.navMenuMobile]}>
              <TouchableOpacity style={[styles.navItem, activeNav === 'overview' && styles.navItemActive]} onPress={() => setActiveNav('overview')}>
                <House color={activeNav === 'overview' ? '#14b8a6' : '#64748b'} size={22} strokeWidth={2.5} />
                {activeNav === 'overview' && <View style={styles.navItemIndicator} />}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navItem, activeNav === 'patients' && styles.navItemActive]} onPress={() => setActiveNav('patients')}>
                <Users color={activeNav === 'patients' ? '#14b8a6' : '#64748b'} size={22} strokeWidth={2.5} />
                {activeNav === 'patients' && <View style={styles.navItemIndicator} />}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navItem, activeNav === 'analytics' && styles.navItemActive]} onPress={() => setActiveNav('analytics')}>
                <BarChart2 color={activeNav === 'analytics' ? '#14b8a6' : '#64748b'} size={22} strokeWidth={2.5} />
                {activeNav === 'analytics' && <View style={styles.navItemIndicator} />}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navItem, activeNav === 'guidelines' && styles.navItemActive]} onPress={() => setActiveNav('guidelines')}>
                <BookOpen color={activeNav === 'guidelines' ? '#14b8a6' : '#64748b'} size={22} strokeWidth={2.5} />
                {activeNav === 'guidelines' && <View style={styles.navItemIndicator} />}
              </TouchableOpacity>
            </View>

            <View style={[styles.navFooter, isMobile && styles.navMenuMobile]}>
              <TouchableOpacity style={styles.navItemFooter}>
                <Settings color="#64748b" size={22} strokeWidth={2.5} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navItemFooter, styles.navLogout]} onPress={logout}>
                <LogOut color="#f87171" size={22} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 2. Center Main Content */}
          <ScrollView
            style={styles.mainContent}
            contentContainerStyle={styles.mainContentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Header Row */}
            <View style={styles.contentHeader}>
              <View style={styles.userGreeting}>
                <Text style={styles.greetingSubtitle}>Hi, {userRole === 'DOCTOR' ? 'Dr. Sakif' : 'Clinician'}</Text>
                <Text style={styles.greetingTitle}>Patient Record</Text>
              </View>
              
              <View style={styles.headerActions}>
                {/* Back to Staff Portal Button */}
                <TouchableOpacity style={styles.patientPill} onPress={() => router.back()}>
                  <ChevronLeft color="#64748b" size={16} />
                  <View style={styles.patientMeta}>
                    <Text style={styles.patientTitle}>Back to Staff Portal</Text>
                  </View>
                </TouchableOpacity>

                {/* Notification Bell */}
                <View style={{ position: 'relative', zIndex: 100 }}>
                  <TouchableOpacity style={styles.iconCircleBtn} onPress={() => setShowNotif(!showNotif)}>
                    <Bell color="#1e293b" size={20} />
                    <View style={styles.notificationBadge} />
                  </TouchableOpacity>
                  
                  {showNotif && (
                    <View style={styles.notifPopover}>
                      <View style={styles.notifHeader}>
                        <Text style={styles.notifHeaderTitle}>Clinical Alerts</Text>
                        <Text style={styles.badgeTag}>3 New</Text>
                      </View>
                      <View style={styles.notifList}>
                        <View style={styles.notifItem}>
                          <View style={[styles.notifDot, { backgroundColor: '#ef4444' }]} />
                          <View style={{ flex: 1 }}>
                            <Text style={styles.notifMsg}><Text style={{fontWeight: 'bold'}}>AMR Alert:</Text> High resistance probability for Gram-negative bacilli.</Text>
                            <Text style={styles.notifTime}>10 mins ago</Text>
                          </View>
                        </View>
                        <View style={styles.notifItem}>
                          <View style={[styles.notifDot, { backgroundColor: '#f59e0b' }]} />
                          <View style={{ flex: 1 }}>
                            <Text style={styles.notifMsg}><Text style={{fontWeight: 'bold'}}>Lab Update:</Text> CRP increased to 88 mg/L (Baseline: 42 mg/L).</Text>
                            <Text style={styles.notifTime}>35 mins ago</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.notifFooter}>
                        <TouchableOpacity onPress={() => setShowNotif(false)}>
                          <Text style={styles.textLinkBtn}>Mark all as read</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Hero Clinical Recommendation Banner */}
            <LinearGradient colors={['#4fd1c5', '#38b2ac']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.heroBanner}>
              <View style={[styles.heroContent, isMobile && styles.heroContentMobile]}>
                <View style={styles.heroTag}>
                  <View style={styles.tagPulse} />
                  <Text style={styles.tagText}>AI Clinical Decision Support</Text>
                </View>
                <Text style={styles.heroHeading}>High AMR Risk Detected: Escalation Recommended</Text>
                <Text style={styles.heroDesc}>
                  Consider escalating from <Text style={{fontFamily: 'Inter_700Bold'}}>Ceftriaxone</Text> to <Text style={{fontFamily: 'Inter_700Bold'}}>Meropenem</Text> due to increasing AMR risk index (84%) and recent broad-spectrum beta-lactam exposure.
                </Text>
                
                {(!heroAccepted && !heroOverridden) && (
                  <View style={styles.heroActions}>
                    <TouchableOpacity style={styles.heroBtnPrimary} onPress={() => setHeroAccepted(true)}>
                      <Check color="#0d9488" size={16} strokeWidth={3} />
                      <Text style={styles.heroBtnPrimaryText}>Accept Recommendation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.heroBtnSecondary} onPress={() => setShowOverrideModal(true)}>
                      <Pencil color="#ffffff" size={16} />
                      <Text style={styles.heroBtnSecondaryText}>Clinical Override</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.heroBtnGhost} onPress={() => setShowReportModal(true)}>
                      <Text style={styles.heroBtnGhostText}>View AST Report</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {heroAccepted && (
                  <View style={[styles.heroStatusPill, { backgroundColor: '#10b981' }]}>
                    <CheckCheck color="#ffffff" size={16} />
                    <Text style={styles.heroStatusPillText}>Recommendation Accepted • Protocol updated in EHR</Text>
                  </View>
                )}
                {heroOverridden && (
                  <View style={[styles.heroStatusPill, { backgroundColor: '#f59e0b' }]}>
                    <AlertCircle color="#ffffff" size={16} />
                    <Text style={styles.heroStatusPillText}>Clinical Override Logged • Alternative regimen active</Text>
                  </View>
                )}
              </View>

              {!isMobile && (
                <View style={styles.heroVisual}>
                  <View style={styles.heroIllustration}>
                    <View style={styles.docBadge}>
                      <Activity color="#0d9488" size={14} />
                      <Text style={styles.docBadgeText}>Real-time AST</Text>
                    </View>
                    <Svg width={180} height={150} viewBox="0 0 200 180" fill="none" style={styles.docSvg}>
                      <Circle cx="110" cy="90" r="70" fill="rgba(255,255,255,0.22)" />
                      <Rect x="30" y="140" width="140" height="8" rx="4" fill="rgba(255,255,255,0.4)" />
                      <Rect x="50" y="105" width="80" height="42" rx="4" fill="#203a61" />
                      <Rect x="54" y="109" width="72" height="34" rx="2" fill="#d9efff" />
                      <Path d="M58 132 L68 126 L78 129 L88 120 L98 124 L108 116 L118 121" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
                      <Path d="M142 140 L146 128 L154 128 L158 140 Z" fill="#2d6a4f" />
                      <Circle cx="150" cy="122" r="6" fill="#52b788" />
                      <Circle cx="144" cy="126" r="4" fill="#74c69d" />
                      <Circle cx="156" cy="125" r="4.5" fill="#74c69d" />
                      <Circle cx="115" cy="55" r="18" fill="#ffdfba" />
                      <Path d="M100 52 C100 40, 130 38, 130 48 C128 44, 120 40, 112 42 Z" fill="#1e293b" />
                      <Path d="M96 74 C96 70, 102 68, 115 68 C128 68, 134 70, 134 74 L142 120 L88 120 Z" fill="#ffffff" />
                      <Path d="M106 72 C106 85, 124 85, 124 72" stroke="#14b8a6" strokeWidth="2.5" fill="none" />
                      <Circle cx="115" cy="88" r="3.5" fill="#14b8a6" />
                      <Path d="M113 70 L117 70 L116 82 L113 82 Z" fill="#3b82f6" />
                    </Svg>
                  </View>
                </View>
              )}
            </LinearGradient>

            {/* Pinned Key Information */}
            <View style={styles.pinnedSection}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.sectionTitle}>
                  <Pin color="#14b8a6" size={18} style={{ transform: [{ rotate: '45deg' }] }} />
                  <Text style={styles.sectionTitleText}>Pinned Key Informations</Text>
                </View>
                <TouchableOpacity style={styles.addNewBtn} onPress={() => setShowAddMetricModal(true)}>
                  <Text style={styles.addNewBtnText}>Add New</Text>
                  <Plus color="#1e293b" size={14} />
                </TouchableOpacity>
              </View>

              <View style={[styles.pinnedGrid, isTablet && styles.pinnedGridTablet, isMobile && styles.pinnedGridMobile]}>
                <View style={styles.pinnedCard}>
                  <View style={[styles.cardIconAvatar, { backgroundColor: '#fee2e2' }]}>
                    <TrendingUp color="#ef4444" size={20} />
                  </View>
                  <View style={styles.pinnedInfo}>
                    <Text style={styles.pinnedLabel}>AMR Risk Score</Text>
                    <View style={styles.pinnedValWrap}>
                      <Text style={styles.pinnedValue}>84%</Text>
                      <View style={[styles.statusChip, { backgroundColor: '#fee2e2' }]}><Text style={[styles.statusChipText, { color: '#dc2626' }]}>High Risk</Text></View>
                    </View>
                  </View>
                </View>

                <View style={styles.pinnedCard}>
                  <View style={[styles.cardIconAvatar, { backgroundColor: '#ffedd5' }]}>
                    <Droplet color="#f97316" size={20} />
                  </View>
                  <View style={styles.pinnedInfo}>
                    <Text style={styles.pinnedLabel}>WBC Count (10³/µL)</Text>
                    <View style={styles.pinnedValWrap}>
                      <Text style={styles.pinnedValue}>14.2</Text>
                      <View style={[styles.statusChip, { backgroundColor: '#fef3c7' }]}><Text style={[styles.statusChipText, { color: '#d97706' }]}>Elevated</Text></View>
                    </View>
                  </View>
                </View>

                <View style={styles.pinnedCard}>
                  <View style={[styles.cardIconAvatar, { backgroundColor: '#f3e8ff' }]}>
                    <HeartPulse color="#a855f7" size={20} />
                  </View>
                  <View style={styles.pinnedInfo}>
                    <Text style={styles.pinnedLabel}>Blood Pressure</Text>
                    <View style={styles.pinnedValWrap}>
                      <Text style={styles.pinnedValue}>128/84</Text>
                      <Text style={styles.pinnedUnit}>mmHg</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.pinnedCard}>
                  <View style={[styles.cardIconAvatar, { backgroundColor: '#dbeafe' }]}>
                    <Activity color="#3b82f6" size={20} />
                  </View>
                  <View style={styles.pinnedInfo}>
                    <Text style={styles.pinnedLabel}>eGFR (Renal)</Text>
                    <View style={styles.pinnedValWrap}>
                      <Text style={styles.pinnedValue}>62</Text>
                      <Text style={styles.pinnedUnit}>mL/min</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Telemetry Grid (Biomarker & Fluid Compositions + Antibiotic Exposure Share) */}
            <View style={[styles.telemetryGrid, (isTablet || isMobile) && styles.telemetryGridStacked]}>
              {/* Telemetry Card 1: Biomarker & Fluid Compositions */}
              <View style={styles.telemetryCard}>
                <View style={styles.telemetryHeader}>
                  <Text style={styles.telemetryTitle}>Biomarker & Fluid Compositions</Text>
                  <View style={styles.headerTabGroup}>
                    <TouchableOpacity
                      style={[styles.chartTabBtn, telemetryTab === 'levels' && styles.chartTabBtnActive]}
                      onPress={() => setTelemetryTab('levels')}
                    >
                      <Text style={[styles.chartTabBtnText, telemetryTab === 'levels' && styles.chartTabBtnTextActive]}>Live Levels</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.chartTabBtn, telemetryTab === 'trend' && styles.chartTabBtnActive]}
                      onPress={() => setTelemetryTab('trend')}
                    >
                      <Text style={[styles.chartTabBtnText, telemetryTab === 'trend' && styles.chartTabBtnTextActive]}>Risk Trend</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.biomarkerFluidWrapper}>
                  <View style={styles.fluidMeterItem}>
                    <Text style={styles.meterValue}>4.2</Text>
                    <View style={styles.meterBarTrack}>
                      <LinearGradient colors={['#f87171', '#ef4444']} style={[styles.meterBarFill, { height: '82%' }]} />
                    </View>
                    <Text style={styles.meterLabel}>PCT (µg/L)</Text>
                  </View>

                  <View style={styles.fluidMeterItem}>
                    <Text style={styles.meterValue}>3.1</Text>
                    <View style={styles.meterBarTrack}>
                      <LinearGradient colors={['#fbbf24', '#f59e0b']} style={[styles.meterBarFill, { height: '65%' }]} />
                    </View>
                    <Text style={styles.meterLabel}>Lactate</Text>
                  </View>

                  <View style={styles.fluidMeterItem}>
                    <Text style={styles.meterValue}>1.8</Text>
                    <View style={styles.meterBarTrack}>
                      <LinearGradient colors={['#2dd4bf', '#14b8a6']} style={[styles.meterBarFill, { height: '45%' }]} />
                    </View>
                    <Text style={styles.meterLabel}>Creatinine</Text>
                  </View>

                  <View style={styles.fluidMeterItem}>
                    <Text style={styles.meterValue}>140</Text>
                    <View style={styles.meterBarTrack}>
                      <LinearGradient colors={['#60a5fa', '#3b82f6']} style={[styles.meterBarFill, { height: '55%' }]} />
                    </View>
                    <Text style={styles.meterLabel}>Platelets</Text>
                  </View>
                </View>
              </View>

              {/* Telemetry Card 2: Antibiotic Exposure Share */}
              <View style={styles.telemetryCard}>
                <View style={styles.telemetryHeader}>
                  <Text style={styles.telemetryTitle}>Antibiotic Exposure Share</Text>
                  <TouchableOpacity>
                    <Text style={styles.viewMoreLink}>Full Log</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.donutChartContainer}>
                  <View style={styles.donutCanvasWrap}>
                    <Svg width={130} height={130} viewBox="0 0 130 130" style={{ transform: [{ rotate: '-90deg' }] }}>
                      {/* Background Ring */}
                      <Circle cx="65" cy="65" r="48" stroke="#f1f5f9" strokeWidth="18" fill="none" />
                      {/* Meropenem (42%) */}
                      <Circle
                        cx="65" cy="65" r="48"
                        stroke="#14b8a6" strokeWidth="18"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 48 * 0.42} ${2 * Math.PI * 48 * 0.58}`}
                        strokeDashoffset="0"
                      />
                      {/* Ceftriaxone (28%) */}
                      <Circle
                        cx="65" cy="65" r="48"
                        stroke="#3b82f6" strokeWidth="18"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 48 * 0.28} ${2 * Math.PI * 48 * 0.72}`}
                        strokeDashoffset={`${-2 * Math.PI * 48 * 0.42}`}
                      />
                      {/* Vancomycin (18%) */}
                      <Circle
                        cx="65" cy="65" r="48"
                        stroke="#f59e0b" strokeWidth="18"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 48 * 0.18} ${2 * Math.PI * 48 * 0.82}`}
                        strokeDashoffset={`${-2 * Math.PI * 48 * 0.70}`}
                      />
                      {/* Others (12%) */}
                      <Circle
                        cx="65" cy="65" r="48"
                        stroke="#94a3b8" strokeWidth="18"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 48 * 0.12} ${2 * Math.PI * 48 * 0.88}`}
                        strokeDashoffset={`${-2 * Math.PI * 48 * 0.88}`}
                      />
                    </Svg>
                    <View style={styles.donutCenterStat}>
                      <Text style={styles.donutNumber}>84%</Text>
                      <Text style={styles.donutSub}>Target</Text>
                    </View>
                  </View>

                  <View style={styles.donutLegendGrid}>
                    <View style={styles.legendBadge}>
                      <View style={[styles.legendDot, { backgroundColor: '#14b8a6' }]} />
                      <Text style={styles.legendName} numberOfLines={1}>Meropenem</Text>
                      <Text style={styles.legendPercent}>42%</Text>
                    </View>
                    <View style={styles.legendBadge}>
                      <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
                      <Text style={styles.legendName} numberOfLines={1}>Ceftriaxone</Text>
                      <Text style={styles.legendPercent}>28%</Text>
                    </View>
                    <View style={styles.legendBadge}>
                      <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
                      <Text style={styles.legendName} numberOfLines={1}>Vancomycin</Text>
                      <Text style={styles.legendPercent}>18%</Text>
                    </View>
                    <View style={styles.legendBadge}>
                      <View style={[styles.legendDot, { backgroundColor: '#94a3b8' }]} />
                      <Text style={styles.legendName} numberOfLines={1}>Others</Text>
                      <Text style={styles.legendPercent}>12%</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ height: 24 }} />
          </ScrollView>

          {/* 3. Right Schedule Column */}
          <ScrollView
            style={[styles.scheduleSidebar, isMobile && styles.scheduleSidebarMobile]}
            contentContainerStyle={styles.scheduleSidebarContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Upcoming Check-ups</Text>
              <TouchableOpacity style={styles.iconCircleBtnSmall} onPress={() => setShowScheduleModal(true)}>
                <Plus color="#1e293b" size={18} />
              </TouchableOpacity>
            </View>

            <View style={styles.calendarCard}>
              <View style={styles.calendarNavRow}>
                <View style={styles.calendarMonthYear}>
                  <Text style={styles.calMonth}>August</Text>
                  <Text style={styles.calYear}>2026</Text>
                </View>
                <View style={styles.calendarArrows}>
                  <TouchableOpacity style={styles.calArrowBtn}><ChevronLeft color="#64748b" size={14} /></TouchableOpacity>
                  <TouchableOpacity style={styles.calArrowBtn}><ChevronRight color="#64748b" size={14} /></TouchableOpacity>
                </View>
              </View>
              <View style={styles.calendarWeekdays}>
                <Text style={styles.calWeekday}>Su</Text><Text style={styles.calWeekday}>Mo</Text><Text style={styles.calWeekday}>Tu</Text>
                <Text style={styles.calWeekday}>We</Text><Text style={styles.calWeekday}>Th</Text><Text style={styles.calWeekday}>Fr</Text>
                <Text style={styles.calWeekday}>Sa</Text>
              </View>
              <View style={styles.calendarDaysGrid}>
                {Array.from({ length: 31 }).map((_, i) => (
                  <TouchableOpacity key={i} style={[styles.calDayBtn, i === 13 && styles.calDayBtnActive]}>
                    <Text style={[styles.calDayText, i === 13 && styles.calDayTextActive]}>{i + 1}</Text>
                    {(i === 13 || i === 15) && <View style={[styles.calDayEventDot, i === 13 && styles.calDayEventDotActive]} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.lineupSection}>
              <View style={styles.lineupHeader}>
                <Text style={styles.lineupTitle}>Line up Check-ups</Text>
                <Text style={styles.lineupDateBadge}>Today, 14 Aug</Text>
              </View>
              <View style={styles.lineupList}>
                <View style={styles.lineupItem}>
                  <View style={[styles.itemIconWrap, { backgroundColor: '#fee2e2' }]}><BellRing color="#ef4444" size={16} /></View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>Repeat Blood Culture & AST</Text>
                    <Text style={styles.itemTime}>At 10:00 AM • STAT Order</Text>
                  </View>
                  <TouchableOpacity style={styles.itemCheckBtn}><View style={styles.checkCircle} /></TouchableOpacity>
                </View>
                <View style={styles.lineupItem}>
                  <View style={[styles.itemIconWrap, { backgroundColor: '#ccfbf1' }]}><CheckSquare color="#0d9488" size={16} /></View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>Serum Creatinine & eGFR Check</Text>
                    <Text style={styles.itemTime}>At 01:30 PM • Renal Watch</Text>
                  </View>
                  <TouchableOpacity style={styles.itemCheckBtn}><View style={styles.checkCircle} /></TouchableOpacity>
                </View>
                <View style={styles.lineupItem}>
                  <View style={[styles.itemIconWrap, { backgroundColor: '#ede9fe' }]}><FileCheck color="#7c3aed" size={16} /></View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>ID Stewardship Team Round</Text>
                    <Text style={styles.itemTime}>At 04:00 PM • Bedside</Text>
                  </View>
                  <TouchableOpacity style={styles.itemCheckBtn}><View style={styles.checkCircle} /></TouchableOpacity>
                </View>
                <View style={styles.lineupItem}>
                  <View style={[styles.itemIconWrap, { backgroundColor: '#e0f2fe' }]}><FlaskConical color="#0284c7" size={16} /></View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>Procalcitonin Follow-up</Text>
                    <Text style={styles.itemTime}>At 06:30 PM • Lab Check</Text>
                  </View>
                  <TouchableOpacity style={styles.itemCheckBtn}><View style={styles.checkCircle} /></TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ height: 32 }} />
          </ScrollView>
        </View>
      </View>

      {/* Override Modal */}
      <Modal visible={showOverrideModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleWrap}>
                <View style={[styles.modalIconBadge, { backgroundColor: '#ccfbf1' }]}><Edit3 color="#14b8a6" size={20} /></View>
                <View>
                  <Text style={styles.modalHeaderTitle}>Clinical Override Justification</Text>
                  <Text style={styles.modalSubtitle}>Log reason for deviating from AI Recommendation</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowOverrideModal(false)}>
                <X color="#64748b" size={18} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.modalAlertBox}>
                <Text style={{color: '#1e293b', fontWeight: 'bold', fontSize: 13.6}}>Current AI Suggestion:</Text>
                <Text style={{color: '#64748b', fontSize: 13.6}}>Escalate from Ceftriaxone to Meropenem (AMR Risk: 84%)</Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Clinical Reason for Override <Text style={styles.req}>*</Text></Text>
                <TextInput style={styles.formInput} placeholder="Enter primary justification..." />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Detailed Notes & Alternative <Text style={styles.req}>*</Text></Text>
                <TextInput style={styles.formTextarea} multiline numberOfLines={4} placeholder="Enter clinical rationale..." />
              </View>
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.btnGhost} onPress={() => setShowOverrideModal(false)}><Text style={styles.btnGhostText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btnPrimaryAction} onPress={() => { setShowOverrideModal(false); setHeroOverridden(true); }}>
                <Text style={styles.btnPrimaryActionText}>Confirm & Log Override</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dashboardWrapper: {
    width: '100%',
    maxWidth: 1440,
    height: '100%',
  },
  dashboardCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    flexDirection: 'row',
    minHeight: Platform.OS === 'web' ? 'calc(100vh - 48px)' as any : '100%',
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    ...Platform.select({
      web: {
        display: 'grid',
        gridTemplateColumns: '84px 1fr 370px',
        boxShadow: '0 25px 60px -15px rgba(20, 184, 166, 0.2), 0 10px 25px -5px rgba(0,0,0,0.04)',
      },
      default: {
        shadowColor: 'rgba(20, 184, 166, 0.2)',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 1,
        shadowRadius: 60,
      },
    }),
  },
  dashboardCardTablet: {},
  dashboardCardMobile: {
    flexDirection: 'column',
    borderRadius: 20,
    ...Platform.select({
      web: {
        display: 'flex',
      },
    }),
  },
  navDock: {
    backgroundColor: '#ffffff',
    width: 84,
    flexShrink: 0,
    alignItems: 'center',
    paddingVertical: 24,
    justifyContent: 'space-between',
    borderRightWidth: 1,
    borderRightColor: '#edf2f7',
  },
  navDockMobile: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  navBrand: {
    marginBottom: 20,
  },
  gridLogoBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navMenu: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  navMenuMobile: {
    flexDirection: 'row',
  },
  navItem: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: '#ccfbf1',
  },
  navItemIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 18,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#14b8a6',
  },
  navItemFooter: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLogout: {},
  navFooter: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  mainContent: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#ffffff',
  },
  mainContentContainer: {
    padding: 32,
    gap: 24,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userGreeting: {
    flexDirection: 'column',
  },
  greetingSubtitle: {
    fontSize: 14.4,
    color: '#64748b',
    fontFamily: 'Inter_500Medium',
  },
  greetingTitle: {
    fontSize: 28,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#1e293b',
    marginTop: 2,
    letterSpacing: -0.56,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  patientPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
    paddingRight: 14,
    paddingLeft: 8,
    backgroundColor: '#f9fbfe',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 9999,
  },
  patientAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#14b8a6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientAvatarText: {
    color: 'white',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12.8,
  },
  patientMeta: {
    flexDirection: 'column',
  },
  patientTitle: {
    fontSize: 13.6,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
  },
  patientSub: {
    fontSize: 11.5,
    color: '#64748b',
    fontFamily: 'Inter_400Regular',
  },
  iconCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleBtnSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: '#ef4444',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  notifPopover: {
    position: 'absolute',
    top: 54,
    right: 0,
    width: 320,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    zIndex: 200,
    ...Platform.select({
      web: { boxShadow: '0 15px 35px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.05)' },
    })
  },
  notifHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  notifHeaderTitle: {
    fontSize: 15.2,
    fontFamily: 'Inter_700Bold',
    color: '#1e293b',
  },
  badgeTag: {
    fontSize: 11.2,
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  notifList: {
    flexDirection: 'column',
    gap: 10,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  notifMsg: {
    color: '#1e293b',
    fontSize: 12.8,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
  },
  notifTime: {
    fontSize: 11.2,
    color: '#64748b',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  notifFooter: {
    marginTop: 12,
    paddingTop: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
  },
  textLinkBtn: {
    color: '#14b8a6',
    fontSize: 12.8,
    fontFamily: 'Inter_600SemiBold',
  },
  heroBanner: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: { boxShadow: '0 12px 30px -5px rgba(20, 184, 166, 0.35)' },
      default: { shadowColor: 'rgba(20, 184, 166, 0.35)', shadowOffset: {width:0, height:12}, shadowOpacity: 1, shadowRadius: 30 }
    })
  },
  heroContent: {
    maxWidth: '65%',
    zIndex: 2,
  },
  heroContentMobile: {
    maxWidth: '100%',
  },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 9999,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  tagPulse: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#ffffff',
  },
  tagText: {
    fontSize: 12.5,
    fontFamily: 'Inter_600SemiBold',
    color: 'white',
  },
  heroHeading: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: 'white',
    lineHeight: 28,
    marginBottom: 6,
  },
  heroDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  heroBtnPrimary: {
    backgroundColor: '#ffffff',
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
    })
  },
  heroBtnPrimaryText: {
    color: '#0d9488',
    fontSize: 13.5,
    fontFamily: 'Inter_700Bold',
  },
  heroBtnSecondary: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroBtnSecondaryText: {
    color: 'white',
    fontSize: 13.5,
    fontFamily: 'Inter_600SemiBold',
  },
  heroBtnGhost: {
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  heroBtnGhostText: {
    color: 'white',
    fontSize: 13.2,
    fontFamily: 'Inter_600SemiBold',
    textDecorationLine: 'underline',
  },
  heroStatusPill: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  heroStatusPillText: {
    color: 'white',
    fontSize: 13.2,
    fontFamily: 'Inter_600SemiBold',
  },
  heroVisual: {
    width: '32%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroIllustration: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docBadge: {
    position: 'absolute',
    top: 6,
    left: -16,
    backgroundColor: 'white',
    borderRadius: 9999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 3,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    })
  },
  docBadgeText: {
    color: '#0d9488',
    fontSize: 11.5,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  docSvg: {
    width: 180,
    height: 150,
  },
  pinnedSection: {
    flexDirection: 'column',
    gap: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitleText: {
    fontSize: 16.5,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1e293b',
  },
  addNewBtn: {
    backgroundColor: '#f8fafc',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addNewBtnText: {
    color: '#1e293b',
    fontSize: 12.8,
    fontFamily: 'Inter_600SemiBold',
  },
  pinnedGrid: {
    flexDirection: 'row',
    gap: 14,
  },
  pinnedGridTablet: {
    flexWrap: 'wrap',
  },
  pinnedGridMobile: {
    flexDirection: 'column',
  },
  pinnedCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#edf2f7',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
    ...Platform.select({
      web: { boxShadow: '0 4px 20px -2px rgba(148,163,184,0.12)' },
    })
  },
  cardIconAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pinnedInfo: {
    flexDirection: 'column',
    gap: 2,
    flex: 1,
    minWidth: 0,
  },
  pinnedLabel: {
    fontSize: 11.5,
    color: '#64748b',
    fontFamily: 'Inter_500Medium',
  },
  pinnedValWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    flexWrap: 'wrap',
  },
  pinnedValue: {
    fontSize: 19,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#1e293b',
  },
  pinnedUnit: {
    fontSize: 11.5,
    color: '#64748b',
    fontFamily: 'Inter_500Medium',
  },
  statusChip: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
  },
  statusChipText: {
    fontSize: 10.5,
    fontFamily: 'Inter_700Bold',
  },
  /* Telemetry Grid */
  telemetryGrid: {
    flexDirection: 'row',
    gap: 18,
  },
  telemetryGridStacked: {
    flexDirection: 'column',
  },
  telemetryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#edf2f7',
    borderRadius: 20,
    padding: 20,
    ...Platform.select({
      web: { boxShadow: '0 4px 20px -2px rgba(148,163,184,0.12)' },
    })
  },
  telemetryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  telemetryTitle: {
    fontSize: 14.5,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1e293b',
  },
  headerTabGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chartTabBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    backgroundColor: '#f1f5f9',
  },
  chartTabBtnActive: {
    backgroundColor: '#ccfbf1',
  },
  chartTabBtnText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748b',
  },
  chartTabBtnTextActive: {
    color: '#0d9488',
  },
  viewMoreLink: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter_600SemiBold',
  },
  biomarkerFluidWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 160,
    paddingTop: 10,
  },
  fluidMeterItem: {
    alignItems: 'center',
    gap: 6,
    height: '100%',
    justifyContent: 'flex-end',
  },
  meterBarTrack: {
    width: 26,
    height: 100,
    backgroundColor: '#f1f5f9',
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  meterBarFill: {
    width: '100%',
    borderRadius: 13,
  },
  meterValue: {
    fontSize: 12.5,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1e293b',
  },
  meterLabel: {
    fontSize: 11,
    color: '#64748b',
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  donutChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    height: 160,
  },
  donutCanvasWrap: {
    position: 'relative',
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenterStat: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutNumber: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#1e293b',
    lineHeight: 22,
  },
  donutSub: {
    fontSize: 10.5,
    color: '#64748b',
    fontFamily: 'Inter_500Medium',
  },
  donutLegendGrid: {
    flex: 1,
    flexDirection: 'column',
    gap: 6,
  },
  legendBadge: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#edf2f7',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendName: {
    color: '#1e293b',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    flex: 1,
  },
  legendPercent: {
    color: '#64748b',
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
  },
  /* Right Sidebar */
  scheduleSidebar: {
    width: 370,
    flexShrink: 0,
    flexGrow: 0,
    backgroundColor: '#ffffff',
    borderLeftWidth: 1,
    borderLeftColor: '#edf2f7',
  },
  scheduleSidebarContainer: {
    padding: 28,
    gap: 20,
  },
  scheduleSidebarMobile: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sidebarTitle: {
    fontSize: 17.5,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1e293b',
  },
  calendarCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#edf2f7',
    borderRadius: 20,
    padding: 16,
    ...Platform.select({
      web: { boxShadow: '0 4px 20px -2px rgba(148,163,184,0.12)' },
    })
  },
  calendarNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  calendarMonthYear: {
    flexDirection: 'row',
    gap: 6,
  },
  calMonth: {
    fontSize: 14.5,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1e293b',
  },
  calYear: {
    fontSize: 14.5,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1e293b',
  },
  calendarArrows: {
    flexDirection: 'row',
    gap: 4,
  },
  calArrowBtn: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarWeekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  calWeekday: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: '#94a3b8',
    width: 30,
    textAlign: 'center',
  },
  calendarDaysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 2,
  },
  calDayBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  calDayBtnActive: {
    backgroundColor: '#14b8a6',
  },
  calDayText: {
    fontSize: 11.5,
    fontFamily: 'Inter_500Medium',
    color: '#1e293b',
  },
  calDayTextActive: {
    color: 'white',
    fontFamily: 'Inter_700Bold',
  },
  calDayEventDot: {
    position: 'absolute',
    bottom: 2,
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#14b8a6',
  },
  calDayEventDotActive: {
    backgroundColor: 'white',
  },
  lineupSection: {
    backgroundColor: '#ffffff',
    gap: 12,
  },
  lineupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineupTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1e293b',
  },
  lineupDateBadge: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748b',
  },
  lineupList: {
    flexDirection: 'column',
    gap: 10,
  },
  lineupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#edf2f7'
  },
  itemIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flexDirection: 'column',
    gap: 1,
    flex: 1,
  },
  itemName: {
    fontSize: 12.2,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
  },
  itemTime: {
    fontSize: 10.8,
    color: '#64748b',
    fontFamily: 'Inter_400Regular',
  },
  itemCheckBtn: {
    padding: 4,
  },
  checkCircle: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    borderColor: '#edf2f7',
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)' },
      default: { shadowColor: 'rgba(0,0,0,0.3)', shadowOffset: {width:0, height:25}, shadowOpacity: 1, shadowRadius: 60 }
    })
  },
  modalHeader: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderTitle: {
    fontSize: 17.6,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1e293b',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter_400Regular',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    flexDirection: 'column',
    gap: 16,
  },
  modalAlertBox: {
    backgroundColor: '#f8fafc',
    borderLeftWidth: 4,
    borderLeftColor: '#14b8a6',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    flexDirection: 'column',
    gap: 2,
  },
  formGroup: {
    flexDirection: 'column',
    gap: 6,
  },
  formLabel: {
    fontSize: 13.1,
    fontFamily: 'Inter_600SemiBold',
    color: '#1e293b',
  },
  req: {
    color: '#ef4444',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1e293b',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter_400Regular',
  },
  formTextarea: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1e293b',
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
    fontFamily: 'Inter_400Regular',
  },
  modalFooter: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    backgroundColor: '#fafbfc',
  },
  btnGhost: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
  },
  btnGhostText: {
    color: '#64748b',
    fontSize: 13.6,
    fontFamily: 'Inter_600SemiBold',
  },
  btnPrimaryAction: {
    backgroundColor: '#14b8a6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 9999,
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(20, 184, 166, 0.25)' },
    })
  },
  btnPrimaryActionText: {
    color: 'white',
    fontSize: 13.6,
    fontFamily: 'Inter_700Bold',
  }
});
