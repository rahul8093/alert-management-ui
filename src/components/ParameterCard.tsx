import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Parameter } from '../data/mock';
import { colors, shadow } from '../theme';
import StatusPill from './StatusPill';
import Sparkline from './Sparkline';

const STATUS_MAP = {
  normal: { label: 'NORMAL', color: colors.green, bg: colors.greenSoft },
  warning: { label: 'WARNING', color: colors.amber, bg: colors.amberSoft },
  critical: { label: 'CRITICAL', color: colors.red, bg: colors.redSoft },
};

export default function ParameterCard({
  param,
  compact = false,
  onPress,
}: {
  param: Parameter;
  compact?: boolean;
  onPress?: () => void;
}) {
  const status = STATUS_MAP[param.status];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        shadow,
        compact && styles.cardCompact,
        pressed && { opacity: 0.9 },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.name}>{param.name}</Text>
        <StatusPill label={status.label} color={status.color} bg={status.bg} />
      </View>

      <View style={styles.valueRow}>
        <Text style={[styles.value, compact && styles.valueCompact]}>{param.value}</Text>
        <Text style={styles.unit}>{param.unit}</Text>
      </View>

      <Text style={styles.meta}>Limit: {param.limit}</Text>
      {!compact && <Text style={styles.meta}>Received {param.received}</Text>}

      <View style={styles.sparkRow}>
        <Sparkline data={param.trend} width={compact ? 96 : 132} height={compact ? 22 : 28} />
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.tick}>12:00</Text>
        <Text style={styles.tick}>Now</Text>
      </View>
      <Text style={styles.avg}>24h avg {param.avg}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  cardCompact: { width: '48%', marginBottom: 12 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 13, fontWeight: '700', color: colors.ink },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 },
  value: { fontSize: 24, fontWeight: '800', color: colors.ink },
  valueCompact: { fontSize: 20 },
  unit: { fontSize: 11, color: colors.gray, marginLeft: 4, marginBottom: 3 },
  meta: { fontSize: 10.5, color: colors.gray, marginTop: 3 },
  sparkRow: { marginTop: 8, alignItems: 'flex-end' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  tick: { fontSize: 9, color: colors.grayLight },
  avg: { fontSize: 11, fontWeight: '700', color: colors.ink, marginTop: 4 },
});
