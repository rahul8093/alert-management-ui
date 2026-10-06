import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, ChevronLeft } from 'lucide-react-native';
import { Pressable } from 'react-native';
import GradientHeader from '../components/GradientHeader';
import BellButton from '../components/BellButton';
import ParameterCard from '../components/ParameterCard';
import { colors } from '../theme';
import { PARAMETERS } from '../data/mock';
import { useApp } from '../context/AppContext';

export default function TrendsScreen() {
  const navigation = useNavigation<any>();
  const { company } = useApp();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <GradientHeader height={130}>
        <View style={styles.topRow}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.backBtn}>
            <ChevronLeft size={20} color={colors.white} strokeWidth={2.4} />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <View style={styles.companyRow}>
              <Text style={styles.companyText} numberOfLines={1}>
                {company}
              </Text>
              <ChevronDown size={15} color={colors.white} strokeWidth={2.4} />
            </View>
            <Text style={styles.subText}>All sites · updates every 15 min</Text>
          </View>
          <BellButton count={3} onPress={() => navigation.navigate('Alerts')} />
        </View>
      </GradientHeader>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live parameters</Text>
          <View style={styles.scopePill}>
            <View style={styles.liveDot} />
            <Text style={styles.scopeText}>All sites · 15 min</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {PARAMETERS.map((p) => (
            <ParameterCard key={p.key} param={p} compact />
          ))}
        </View>

        <Text style={styles.hint}>Use date range and site filters on the Reports tab for longer historical periods.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  companyText: { fontSize: 15.5, fontWeight: '800', color: colors.white, flexShrink: 1 },
  subText: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  scroll: { padding: 20, paddingBottom: 32 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: colors.ink },
  scopePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.tealSoft,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.green },
  scopeText: { fontSize: 10.5, fontWeight: '700', color: colors.teal2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  hint: { fontSize: 11.5, color: colors.gray, textAlign: 'center', marginTop: 8 },
});
