import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, shadow } from '../theme';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('priya@prashitech.com');
  const send = () => Alert.alert('Check your email', `If an account exists for ${email}, reset instructions are on their way.`);
  return <View style={styles.page}>
    <LinearGradient colors={[colors.navy, colors.navy2]} style={styles.header}>
      <Pressable onPress={() => navigation.goBack()} style={styles.back}><ArrowLeft size={20} color={colors.white}/></Pressable>
      <View><Text style={styles.headerTitle}>Forgot password</Text><Text style={styles.headerSub}>We’ll email you a reset link</Text></View>
    </LinearGradient>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.key}><KeyRound size={42} color={colors.white}/></View>
      <View style={[styles.card, shadow]}>
        <Text style={styles.title}>Reset your password</Text><Text style={styles.copy}>Enter the email linked to your account</Text>
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={styles.field}><Mail size={17} color={colors.teal2}/><TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@company.com"/></View>
        <Pressable onPress={send}><LinearGradient colors={[colors.teal, colors.teal2]} style={styles.button}><Text style={styles.buttonText}>Send reset link</Text></LinearGradient></Pressable>
        <Text style={styles.remember}>Remembered it? <Text onPress={() => navigation.goBack()} style={styles.link}>Back to sign in</Text></Text>
      </View>
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({page:{flex:1,backgroundColor:colors.bg},header:{height:142,paddingTop:54,paddingHorizontal:20,flexDirection:'row',alignItems:'flex-start',gap:12,borderBottomLeftRadius:24,borderBottomRightRadius:24},back:{width:36,height:36,borderRadius:12,backgroundColor:'rgba(255,255,255,.15)',alignItems:'center',justifyContent:'center'},headerTitle:{fontSize:19,fontWeight:'700',color:colors.white},headerSub:{fontSize:11,color:'rgba(255,255,255,.75)',marginTop:3},content:{padding:20,alignItems:'center'},key:{width:104,height:104,borderRadius:25,backgroundColor:colors.teal2,alignItems:'center',justifyContent:'center',marginTop:12,marginBottom:22},card:{width:'100%',backgroundColor:colors.white,borderRadius:22,padding:20},title:{fontSize:19,fontWeight:'700',color:colors.ink},copy:{fontSize:12,color:colors.gray,marginTop:4,marginBottom:20},label:{fontSize:10,fontWeight:'700',color:colors.gray,marginBottom:6},field:{height:46,backgroundColor:colors.bg,borderWidth:1,borderColor:colors.line,borderRadius:12,flexDirection:'row',alignItems:'center',gap:10,paddingHorizontal:12,marginBottom:16},input:{flex:1,color:colors.ink,fontSize:13},button:{height:48,borderRadius:13,alignItems:'center',justifyContent:'center'},buttonText:{color:colors.white,fontSize:13,fontWeight:'700'},remember:{textAlign:'center',color:colors.gray,fontSize:11,marginTop:15},link:{color:colors.teal2,fontWeight:'700'}});
