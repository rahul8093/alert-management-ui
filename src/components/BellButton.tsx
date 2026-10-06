import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Bell, SlidersHorizontal } from 'lucide-react-native';
import { colors } from '../theme';

export default function BellButton({
  count = 0,
  icon = 'bell',
  onPress,
}: {
  count?: number;
  icon?: 'bell' | 'filter';
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.75 }]}
      accessibilityRole="button"
      accessibilityLabel={icon === 'bell' ? 'Notifications' : 'Filter'}
    >
      {icon === 'bell' ? (
        <Bell size={19} color={colors.white} strokeWidth={2.2} />
      ) : (
        <SlidersHorizontal size={18} color={colors.white} strokeWidth={2.2} />
      )}
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 3,
    borderRadius: 9,
    backgroundColor: colors.red,
    borderWidth: 2,
    borderColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: colors.white, fontSize: 9, fontWeight: '700' },
});
