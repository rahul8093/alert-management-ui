import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, shadow } from '../theme';

export default function SignInScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('priya@prashitech.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={[colors.navy, colors.navy2]} style={styles.hero}>
          <View style={styles.heroRing} />
          <View style={styles.brandPlate}><Text style={styles.brandName}>◉ APPRISA</Text><Text style={styles.brandTag}>Complex Made Easy</Text></View>
          <Text style={styles.appName}>Alert Management</Text>
          <Text style={styles.tagline}>Monitor alerts. Stay informed.</Text>
        </LinearGradient>

        <View style={[styles.card, shadow]}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to view your monitoring dashboard</Text>

          <Text style={styles.label}>Email address</Text>
          <View style={styles.field}>
            <Mail size={16} color={colors.teal2} strokeWidth={2.2} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@company.com"
              placeholderTextColor={colors.grayLight}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.field}>
            <Lock size={16} color={colors.teal2} strokeWidth={2.2} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.grayLight}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
              {showPassword ? (
                <EyeOff size={17} color={colors.gray} strokeWidth={2} />
              ) : (
                <Eye size={17} color={colors.gray} strokeWidth={2} />
              )}
            </Pressable>
          </View>

          <View style={styles.row}>
            <Pressable style={styles.rememberRow} onPress={() => setRemember((v) => !v)}>
              <Switch
                value={remember}
                onValueChange={setRemember}
                trackColor={{ true: colors.teal, false: colors.line }}
                thumbColor={colors.white}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </Pressable>
            <Pressable hitSlop={8} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </Pressable>
          </View>

          <Pressable style={{ marginTop: 20 }} onPress={() => navigation.replace('Main')}>
            <LinearGradient colors={[colors.teal, colors.teal2]} style={styles.signInBtn}>
              <Text style={styles.signInText}>Sign in</Text>
              <ArrowRight size={18} color={colors.white} />
            </LinearGradient>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Lock size={13} color={colors.grayLight} strokeWidth={2} />
            <View style={styles.divider} />
          </View>

          <Text style={styles.footerText}>
            Need access? <Text onPress={() => navigation.navigate('ContactAdmin')} style={styles.footerLink}>Contact your administrator</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: colors.bg },
  hero: {
    paddingTop: 64,
    paddingBottom: 46,
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    top: 10,
  },
  logoWrap: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: colors.teal2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  brandPlate: { backgroundColor: colors.white, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 13, alignItems: 'center', marginBottom: 13 },
  brandName: { fontSize: 22, fontWeight: '800', color: '#2466AE', letterSpacing: 1 },
  brandTag: { fontSize: 8, color: colors.gray, letterSpacing: 1.2 },
  logoDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: colors.red,
    borderWidth: 2,
    borderColor: colors.navy2,
  },
  appName: { fontSize: 24, fontWeight: '800', color: colors.white },
  tagline: { fontSize: 12.5, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: -26,
    borderRadius: 22,
    padding: 24,
    marginBottom: 28,
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.ink },
  subtitle: { fontSize: 12, color: colors.gray, marginTop: 4, marginBottom: 18 },
  label: { fontSize: 10.5, fontWeight: '700', color: colors.gray, marginBottom: 6, letterSpacing: 0.3 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 48,
    gap: 10,
    marginBottom: 16,
  },
  input: { flex: 1, fontSize: 14, color: colors.ink },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rememberText: { fontSize: 12.5, color: colors.ink },
  forgot: { fontSize: 12.5, color: colors.teal2, fontWeight: '700' },
  signInBtn: { height: 52, borderRadius: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 12 },
  signInText: { fontSize: 15.5, fontWeight: '800', color: colors.white },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 22, marginBottom: 16 },
  divider: { flex: 1, height: 1, backgroundColor: colors.line },
  footerText: { fontSize: 12.5, color: colors.gray, textAlign: 'center' },
  footerLink: { color: colors.teal2, fontWeight: '700' },
});
