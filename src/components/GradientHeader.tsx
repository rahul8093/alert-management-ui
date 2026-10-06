import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

export default function GradientHeader({
  children,
  height = 150,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <LinearGradient
      colors={[colors.navy, colors.navy2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.wrap, { minHeight: height }]}
    >
      <View style={styles.blobLarge} pointerEvents="none" />
      <View style={styles.blobSmall} pointerEvents="none" />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 22,
    overflow: 'hidden',
  },
  blobLarge: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.teal,
    opacity: 0.16,
    top: -110,
    right: -60,
  },
  blobSmall: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    opacity: 0.05,
    bottom: -80,
    left: -40,
  },
});
