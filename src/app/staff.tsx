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

import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { router } from 'expo-router';

export default function StaffPortalScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width <= 1280;
  const isMobile = width <= 1024;
  
  const { userRole, logout } = useAuth();
  const { patients, addPatient } = useAppState();

  const [activeNav, setActiveNav] = useState('overview');
  const [showNotif, setShowNotif] = useState(false);
  
  // Add Patient Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState('M');
  const [newPatientDiag, setNewPatientDiag] = useState('');

  const handleAddPatient = () => {
    addPatient({
      name: newPatientName || 'Unknown Patient',
      age: parseInt(newPatientAge) || 30,
      gender: newPatientGender,
      primaryDiagnosis: newPatientDiag || 'Observation',
      amrRiskScore: Math.floor(Math.random() * 100) // random score for new patient
    });
    setShowAddModal(false);
    setNewPatientName('');
    setNewPatientAge('');
    setNewPatientGender('M');
    setNewPatientDiag('');
  };

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
                <Text style={styles.greetingTitle}>Patient Records</Text>
              </View>
              
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.addPatientBtn} onPress={() => setShowAddModal(true)}>
                  <Plus color="#ffffff" size={16} />
                  <Text style={styles.addPatientBtnText}>Add Record</Text>
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

            {/* Patients List Grid */}
            <View style={styles.patientGrid}>
              {patients.map(patient => (
                <TouchableOpacity 
                  key={patient.id} 
                  style={styles.patientListCard} 
                  onPress={() => router.push(`/patient/${patient.id}` as any)}
                >
                  <View style={[styles.patientCardHeader, { gap: 12 }]}>
                    <View style={styles.patientCardAvatar}>
                      <Text style={styles.patientCardAvatarText}>
                        {patient.name.split(' ').map((n: string) => n[0]).join('')}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.patientName}>{patient.name}</Text>
                      <Text style={styles.patientBed}>{patient.bed} • {patient.age}y {patient.gender}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.patientCardBody}>
                    <Text style={styles.patientDiag} numberOfLines={2}>{patient.primaryDiagnosis}</Text>
                  </View>
                  
                  <View style={styles.patientCardFooter}>
                    <View style={styles.amrScoreWrap}>
                      <AlertCircle color={patient.amrRiskScore > 70 ? '#ef4444' : patient.amrRiskScore > 40 ? '#f59e0b' : '#10b981'} size={14} />
                      <Text style={[styles.amrScoreText, { color: patient.amrRiskScore > 70 ? '#ef4444' : patient.amrRiskScore > 40 ? '#f59e0b' : '#10b981' }]}>
                        AMR Risk: {patient.amrRiskScore}%
                      </Text>
                    </View>
                    <ChevronRight color="#94a3b8" size={16} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ height: 24 }} />
          </ScrollView>
        </View>
      </View>

      {/* Add Record Modal */}
      <Modal visible={showAddModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { maxWidth: 500 }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleWrap}>
                <View style={[styles.modalIconBadge, { backgroundColor: '#ccfbf1' }]}>
                  <Users color="#14b8a6" size={20} />
                </View>
                <View>
                  <Text style={styles.modalHeaderTitle}>Add Patient Record</Text>
                  <Text style={styles.modalSubtitle}>Create a new clinical entry</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowAddModal(false)}>
                <X color="#94a3b8" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Patient Name</Text>
                <TextInput 
                  style={styles.formInput} 
                  value={newPatientName}
                  onChangeText={setNewPatientName}
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#94a3b8"
                />
              </View>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Age</Text>
                  <TextInput 
                    style={styles.formInput} 
                    value={newPatientAge}
                    onChangeText={setNewPatientAge}
                    placeholder="e.g. 45"
                    keyboardType="numeric"
                    placeholderTextColor="#94a3b8"
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Gender</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity 
                      style={[styles.genderBtn, newPatientGender === 'M' && styles.genderBtnActive]}
                      onPress={() => setNewPatientGender('M')}
                    >
                      <Text style={[styles.genderBtnText, newPatientGender === 'M' && styles.genderBtnTextActive]}>M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.genderBtn, newPatientGender === 'F' && styles.genderBtnActive]}
                      onPress={() => setNewPatientGender('F')}
                    >
                      <Text style={[styles.genderBtnText, newPatientGender === 'F' && styles.genderBtnTextActive]}>F</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Primary Diagnosis</Text>
                <TextInput 
                  style={styles.formInput} 
                  value={newPatientDiag}
                  onChangeText={setNewPatientDiag}
                  placeholder="e.g. Community-Acquired Pneumonia"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.btnGhost} onPress={() => setShowAddModal(false)}>
                <Text style={styles.btnGhostText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnPrimaryAction} onPress={handleAddPatient}>
                <Text style={styles.btnPrimaryActionText}>Save Record</Text>
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
    flex: 1,
  },
  dashboardCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    flexDirection: 'row',
    height: Platform.OS === 'web' ? 'calc(100vh - 48px)' as any : '100%',
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    ...Platform.select({
      web: {
        display: 'grid',
        gridTemplateColumns: '84px 1fr',
        boxShadow: '0 25px 60px -15px rgba(20, 184, 166, 0.2), 0 10px 25px -5px rgba(0,0,0,0.04)',
      } as any,
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
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  genderBtnActive: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
  },
  genderBtnText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748b',
  },
  genderBtnTextActive: {
    color: '#ffffff',
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
  },
  patientGrid: {
    padding: 24,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  patientListCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: Platform.OS === 'web' ? 'calc(33.33% - 14px)' as any : '100%',
    minWidth: 280,
    ...Platform.select({
      web: { boxShadow: '0 10px 25px rgba(0,0,0,0.03)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 }
    })
  },

  addPatientBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14b8a6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    marginRight: 16,
  },
  addPatientBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  patientCardAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#14b8a6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patientCardAvatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  patientCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  patientName: {
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter_600SemiBold',
  },
  patientBed: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  patientCardBody: {
    marginBottom: 16,
  },
  patientDiag: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  patientCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  amrScoreWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  amrScoreText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  }
});
