import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatusPill({
  label,
  color,
  bg,
}: {
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  text: { fontSize: 11, fontWeight: '700' },
});
