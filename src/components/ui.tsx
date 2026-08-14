import React from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

const shadow = Platform.select({
  web: { boxShadow: '0 1px 3px rgba(15, 23, 42, 0.07)' },
  default: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
}) as object;

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CardTitle({ title, meta }: { title: string; meta?: string }) {
  return (
    <View style={styles.cardTitleRow}>
      <Text style={styles.cardTitle}>{title}</Text>
      {!!meta && <Text style={styles.cardMeta}>{meta}</Text>}
    </View>
  );
}

export function Pill({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </View>
  );
}

export function StatCard({
  Icon,
  label,
  value,
  hint,
  tone = '#0d9488',
  toneBg = '#ccfbf1',
}: {
  Icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  tone?: string;
  toneBg?: string;
}) {
  return (
    <View style={[styles.card, styles.statCard]}>
      <View style={[styles.statIcon, { backgroundColor: toneBg }]}>
        <Icon color={tone} size={18} strokeWidth={2.4} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {!!hint && <Text style={styles.statHint}>{hint}</Text>}
    </View>
  );
}

export function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{String(value)}</Text>
    </View>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  required,
  error,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad' | 'email-address';
  required?: boolean;
  error?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        keyboardType={keyboardType ?? 'default'}
      />
    </View>
  );
}

export function ChoiceField({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <View style={styles.choiceWrap}>
        {options.map((option) => {
          const active = option === value;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.choice, active && styles.choiceActive]}
              onPress={() => onChange(option)}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  Icon,
  full,
}: {
  label: string;
  onPress: () => void;
  Icon?: LucideIcon;
  full?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.primaryBtn, full && styles.fullBtn]}
      onPress={onPress}
      accessibilityRole="button"
    >
      {Icon ? <Icon color="#ffffff" size={16} strokeWidth={2.4} /> : null}
      <Text style={styles.primaryBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function GhostButton({
  label,
  onPress,
  Icon,
}: {
  label: string;
  onPress: () => void;
  Icon?: LucideIcon;
}) {
  return (
    <TouchableOpacity style={styles.ghostBtn} onPress={onPress} accessibilityRole="button">
      {Icon ? <Icon color="#0f766e" size={16} strokeWidth={2.2} /> : null}
      <Text style={styles.ghostBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function EmptyState({ Icon, title, body }: { Icon: LucideIcon; title: string; body: string }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Icon color="#0d9488" size={22} strokeWidth={2.2} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 20,
    ...shadow,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: '#0f172a',
  },
  cardMeta: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#64748b',
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11.5,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: 180,
    minWidth: 160,
    gap: 4,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#64748b',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 26,
    color: '#0f172a',
    letterSpacing: -0.6,
  },
  statHint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11.5,
    color: '#94a3b8',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#64748b',
    flexShrink: 0,
  },
  infoValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#0f172a',
    flex: 1,
    textAlign: 'right',
  },
  field: {
    flexGrow: 1,
    flexBasis: 220,
    minWidth: 200,
    marginBottom: 14,
  },
  fieldLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#475569',
    marginBottom: 6,
  },
  required: {
    color: '#dc2626',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#ffffff',
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : null),
  },
  inputError: {
    borderColor: '#f87171',
    backgroundColor: '#fef2f2',
  },
  choiceWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  choice: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  choiceActive: {
    borderColor: '#0d9488',
    backgroundColor: '#f0fdfa',
  },
  choiceText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12.5,
    color: '#475569',
  },
  choiceTextActive: {
    fontFamily: 'Inter_600SemiBold',
    color: '#0f766e',
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0d9488',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  fullBtn: {
    width: '100%',
  },
  primaryBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#ffffff',
  },
  ghostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#99f6e4',
    backgroundColor: '#f0fdfa',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 10,
  },
  ghostBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13.5,
    color: '#0f766e',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 34,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#ccfbf1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13.5,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 380,
  },
});
