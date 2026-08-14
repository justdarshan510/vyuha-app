import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { router, usePathname } from 'expo-router';
import {
  LayoutDashboard,
  Search,
  UserPlus,
  CalendarDays,
  ShieldAlert,
  BellRing,
  FileBarChart,
  LogOut,
  ShieldCheck,
} from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

export const STAFF_NAV = [
  { label: 'Dashboard', href: '/staff', Icon: LayoutDashboard },
  { label: 'Patients & Records', href: '/staff/patients', Icon: Search },
  { label: 'New Patient', href: '/staff/new-patient', Icon: UserPlus },
  { label: 'Appointments', href: '/staff/appointments', Icon: CalendarDays },
  { label: 'Risk Assessments', href: '/staff/risk-assessments', Icon: ShieldAlert },
  { label: 'Alerts', href: '/staff/alerts', Icon: BellRing },
  { label: 'Reports', href: '/staff/reports', Icon: FileBarChart },
] as const;

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function StaffShell({ title, subtitle, children }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width <= 1024;
  const pathname = usePathname();
  const { session, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const navContent = (
    <>
      {STAFF_NAV.map(({ label, href, Icon }) => {
        const active = pathname === href;
        return (
          <TouchableOpacity
            key={href}
            style={[
              isCompact ? styles.navPill : styles.navRow,
              active && (isCompact ? styles.navPillActive : styles.navRowActive),
            ]}
            onPress={() => router.push(href)}
            accessibilityRole="link"
            accessibilityLabel={label}
          >
            <Icon color={active ? '#0d9488' : '#64748b'} size={18} strokeWidth={2.2} />
            <Text style={[styles.navText, active && styles.navTextActive]} numberOfLines={1}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </>
  );

  return (
    <View style={styles.root}>
      {!isCompact && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.brand} onPress={() => router.push('/')}>
            <View style={styles.brandMark}>
              <ShieldCheck color="#ffffff" size={18} strokeWidth={2.6} />
            </View>
            <View>
              <Text style={styles.brandName}>AMR-GUARD</Text>
              <Text style={styles.brandKicker}>Operations Portal</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.navList}>{navContent}</View>

          <View style={styles.sidebarFooter}>
            <Text style={styles.footerName}>{session?.name ?? 'Hospital Staff'}</Text>
            <Text style={styles.footerRole}>{session?.title ?? 'Operations'}</Text>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <LogOut color="#dc2626" size={16} strokeWidth={2.4} />
              <Text style={styles.logoutText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.main}>
        {isCompact && (
          <View style={styles.compactBar}>
            <View style={styles.compactBarTop}>
              <TouchableOpacity style={styles.brand} onPress={() => router.push('/')}>
                <View style={styles.brandMark}>
                  <ShieldCheck color="#ffffff" size={16} strokeWidth={2.6} />
                </View>
                <Text style={styles.brandName}>AMR-GUARD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <LogOut color="#dc2626" size={16} strokeWidth={2.4} />
                <Text style={styles.logoutText}>Sign out</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.compactNav}
            >
              {navContent}
            </ScrollView>
          </View>
        )}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollInner, isCompact && styles.scrollInnerCompact]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pageHead}>
            <Text style={styles.pageTitle}>{title}</Text>
            {!!subtitle && <Text style={styles.pageSubtitle}>{subtitle}</Text>}
          </View>
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

const shadow = Platform.select({
  web: { boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)' },
  default: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
}) as object;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
  },
  sidebar: {
    width: 258,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#0d9488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#0f172a',
    letterSpacing: 0.4,
  },
  brandKicker: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#64748b',
  },
  navList: {
    marginTop: 26,
    gap: 4,
    flex: 1,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  navRowActive: {
    backgroundColor: '#f0fdfa',
  },
  navPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  navPillActive: {
    backgroundColor: '#f0fdfa',
    borderColor: '#99f6e4',
  },
  navText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13.5,
    color: '#475569',
  },
  navTextActive: {
    fontFamily: 'Inter_600SemiBold',
    color: '#0f766e',
  },
  sidebarFooter: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 14,
    gap: 2,
  },
  footerName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13.5,
    color: '#0f172a',
  },
  footerRole: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11.5,
    color: '#64748b',
    marginBottom: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
    alignSelf: 'flex-start',
  },
  logoutText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12.5,
    color: '#dc2626',
  },
  main: {
    flex: 1,
  },
  compactBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  compactBarTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  compactNav: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 56,
    maxWidth: 1180,
    width: '100%',
  },
  scrollInnerCompact: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  pageHead: {
    marginBottom: 22,
  },
  pageTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 25,
    color: '#0f172a',
    letterSpacing: -0.4,
  },
  pageSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 21,
    maxWidth: 640,
  },
});

export const staffCard = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 20,
    ...shadow,
  },
});
