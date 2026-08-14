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
import { router } from 'expo-router';
import { Stethoscope, ClipboardList, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react-native';

const ROLES = [
  {
    key: 'doctor',
    href: '/login/doctor',
    Icon: Stethoscope,
    title: 'Doctor',
    portal: 'Clinical Portal',
    body: 'Review AMR risk scores with their drivers, then accept or override the recommended regimen.',
    tasks: ['Patient risk review', 'Antibiotic decisions', 'AST reports'],
  },
  {
    key: 'staff',
    href: '/login/staff',
    Icon: ClipboardList,
    title: 'Hospital Staff',
    portal: 'Operations Portal',
    body: 'Register and locate patients, keep records clean, and schedule the right consultation.',
    tasks: ['Patient search', 'New registrations', 'Appointments'],
  },
] as const;

export default function RoleSelectScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 860;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/')}>
          <ArrowLeft color="#64748b" size={15} strokeWidth={2.4} />
          <Text style={styles.backText}>Back to home</Text>
        </TouchableOpacity>

        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <ShieldCheck color="#ffffff" size={18} strokeWidth={2.6} />
          </View>
          <Text style={styles.brandName}>AMR-GUARD</Text>
        </View>

        <Text style={[styles.title, isMobile && styles.titleMobile]}>Welcome to AMR-GUARD</Text>
        <Text style={styles.subtitle}>
          Choose how you are signing in. Each portal shows only the tools that role is responsible
          for.
        </Text>

        <View style={[styles.cardRow, isMobile && styles.cardRowMobile]}>
          {ROLES.map(({ key, href, Icon, title, portal, body, tasks }) => (
            <TouchableOpacity
              key={key}
              style={styles.roleCard}
              onPress={() => router.push(href)}
              accessibilityRole="button"
              accessibilityLabel={`${title} ${portal}`}
            >
              <View style={styles.roleIcon}>
                <Icon color="#0d9488" size={22} strokeWidth={2.3} />
              </View>
              <Text style={styles.rolePortal}>{portal}</Text>
              <Text style={styles.roleTitle}>{title}</Text>
              <Text style={styles.roleBody}>{body}</Text>

              <View style={styles.taskList}>
                {tasks.map((task) => (
                  <View key={task} style={styles.taskChip}>
                    <Text style={styles.taskChipText}>{task}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.roleCta}>
                <Text style={styles.roleCtaText}>Continue</Text>
                <ArrowRight color="#0f766e" size={16} strokeWidth={2.4} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 44,
    maxWidth: 940,
    width: '100%',
    alignSelf: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 26,
  },
  backText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#64748b',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'flex-start',
    marginBottom: 22,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#0d9488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16.5,
    color: '#0f172a',
    letterSpacing: 0.6,
  },
  title: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 36,
    color: '#0f172a',
    letterSpacing: -1,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  titleMobile: {
    fontSize: 28,
    letterSpacing: -0.7,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    maxWidth: 560,
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
  },
  cardRowMobile: {
    flexDirection: 'column',
  },
  roleCard: {
    flex: 1,
    flexBasis: 300,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1fae5',
    borderRadius: 18,
    padding: 24,
    ...Platform.select({
      web: { boxShadow: '0 12px 30px -18px rgba(13, 148, 136, 0.35)' },
      default: {
        shadowColor: 'rgba(13,148,136,0.3)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 5,
      },
    }),
  },
  roleIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  rolePortal: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11.5,
    color: '#0f766e',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  roleTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: '#0f172a',
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  roleBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: '#64748b',
    lineHeight: 21,
    marginBottom: 18,
  },
  taskList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 22,
  },
  taskChip: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  taskChipText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11.5,
    color: '#475569',
  },
  roleCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  roleCtaText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#0f766e',
  },
});
