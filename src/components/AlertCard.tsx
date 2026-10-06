import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AlertTriangle, CheckCircle2, CircleSlash2, TriangleAlert, Wrench } from 'lucide-react-native';
import { AlertItem, AlertType } from '../data/mock';
import { colors, shadow } from '../theme';

const META: Record<AlertType, { label: string; color: string; bg: string; Icon: any }> = {
  critical: { label: 'CRITICAL', color: colors.red, bg: colors.redSoft, Icon: AlertTriangle },
  warning: { label: 'WARNING', color: colors.amber, bg: colors.amberSoft, Icon: TriangleAlert },
  offline: { label: 'OFFLINE', color: colors.gray, bg: colors.graySoft, Icon: CircleSlash2 },
  sensor: { label: 'SENSOR', color: colors.purple, bg: colors.purpleSoft, Icon: Wrench },
  resolved: { label: 'RESOLVED', color: colors.green, bg: colors.greenSoft, Icon: CheckCircle2 },
};

export default function AlertCard({ item, onPress }: { item: AlertItem; onPress?: () => void }) {
  const m = META[item.type];
  const Icon = m.Icon;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, shadow, { borderLeftColor: m.color }, pressed && { opacity: 0.9 }]}
    >
      <View style={[styles.iconWrap, { backgroundColor: m.bg }]}>
        <Icon size={18} color={m.color} strokeWidth={2.2} />
      </View>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.tag, { backgroundColor: m.bg }]}>
            <Text style={[styles.tagText, { color: m.color }]}>{m.label}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.meta}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  body: { flex: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  tagText: { fontSize: 9.5, fontWeight: '700' },
  time: { fontSize: 10.5, color: colors.grayLight },
  title: { fontSize: 13, fontWeight: '700', color: colors.ink, marginTop: 5 },
  meta: { fontSize: 11, color: colors.gray, marginTop: 2 },
});
