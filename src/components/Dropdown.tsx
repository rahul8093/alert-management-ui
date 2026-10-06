import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Building2, Check, ChevronDown, MapPin, X } from 'lucide-react-native';
import { colors, shadow } from '../theme';

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  icon = 'building',
  compact = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  icon?: 'building' | 'site';
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const Icon = icon === 'building' ? Building2 : MapPin;

  return (
    <View style={compact ? styles.wrapCompact : styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.field} onPress={() => setOpen(true)}>
        <Icon size={15} color={colors.teal2} strokeWidth={2.2} />
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
        <ChevronDown size={16} color={colors.gray} strokeWidth={2.2} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={[styles.sheet, shadow]} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={8}>
                <X size={20} color={colors.gray} />
              </Pressable>
            </View>
            {options.map((opt) => {
              const active = opt === value;
              return (
                <Pressable
                  key={opt}
                  style={[styles.option, active && styles.optionActive]}
                  onPress={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>{opt}</Text>
                  {active && <Check size={17} color={colors.teal2} strokeWidth={2.4} />}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  wrapCompact: { flex: 1 },
  label: { fontSize: 10.5, fontWeight: '700', color: colors.gray, marginBottom: 5, letterSpacing: 0.2 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  value: { flex: 1, fontSize: 13, fontWeight: '700', color: colors.ink },
  backdrop: { flex: 1, backgroundColor: 'rgba(15,34,51,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 34,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sheetTitle: { fontSize: 16, fontWeight: '800', color: colors.ink },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.bg,
  },
  optionActive: {},
  optionText: { fontSize: 14.5, color: colors.ink, fontWeight: '600' },
  optionTextActive: { color: colors.teal2, fontWeight: '800' },
});
