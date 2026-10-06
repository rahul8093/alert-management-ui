import React from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Mail, Pencil, UserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, shadow } from '../theme';

const email = 'admin@prashitech.com';
const phone = '+91 98765 43210';
export default function ContactAdminScreen() {
  const navigation = useNavigation<any>();
  const open = async (url:string) => { try { await Linking.openURL(url); } catch { Alert.alert('Contact administrator', `Please contact ${email} or call ${phone}.`); } };
  return <View style={styles.page}>
    <LinearGradient colors={[colors.navy, colors.navy2]} style={styles.header}><Pressable onPress={() => navigation.goBack()} style={styles.back}><ArrowLeft size={20} color={colors.white}/></Pressable><View><Text style={styles.headerTitle}>Contact administrator</Text><Text style={styles.headerSub}>Get help accessing your account</Text></View></LinearGradient>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={[styles.avatar, shadow]}><View style={styles.avatarCircle}><Text style={styles.initials}>SA</Text></View></View>
      <View style={[styles.card, shadow]}><Text style={styles.name}>System Administrator</Text><Text style={styles.team}>Prashitech Industries · EHS Team</Text>
        <View style={styles.info}><Mail size={16} color={colors.teal2}/><View><Text style={styles.label}>EMAIL</Text><Text style={styles.value}>{email}</Text></View></View>
        <View style={styles.info}><Pencil size={16} color={colors.teal2}/><View><Text style={styles.label}>PHONE</Text><Text style={styles.value}>{phone}</Text></View></View>
        <Pressable onPress={() => open(`mailto:${email}?subject=Alert%20Management%20account%20access`)} style={styles.primary}><Text style={styles.primaryText}>Send email</Text></Pressable>
        <Pressable onPress={() => open(`tel:${phone.replace(/\s/g,'')}`)} style={styles.secondary}><Text style={styles.secondaryText}>Call administrator</Text></Pressable>
      </View>
    </ScrollView>
  </View>;
}
const styles=StyleSheet.create({page:{flex:1,backgroundColor:colors.bg},header:{height:142,paddingTop:54,paddingHorizontal:20,flexDirection:'row',alignItems:'flex-start',gap:12,borderBottomLeftRadius:24,borderBottomRightRadius:24},back:{width:36,height:36,borderRadius:12,backgroundColor:'rgba(255,255,255,.15)',alignItems:'center',justifyContent:'center'},headerTitle:{fontSize:18,fontWeight:'700',color:colors.white},headerSub:{fontSize:11,color:'rgba(255,255,255,.75)',marginTop:3},content:{padding:20},avatar:{backgroundColor:colors.white,borderRadius:20,alignItems:'center',padding:16,marginBottom:14},avatarCircle:{width:62,height:62,borderRadius:31,backgroundColor:colors.teal,alignItems:'center',justifyContent:'center'},initials:{fontSize:18,fontWeight:'700',color:colors.white},card:{backgroundColor:colors.white,borderRadius:20,padding:18},name:{textAlign:'center',fontSize:16,fontWeight:'700',color:colors.ink},team:{textAlign:'center',fontSize:11,color:colors.gray,marginTop:3,marginBottom:18},info:{height:54,borderRadius:13,backgroundColor:colors.bg,borderWidth:1,borderColor:colors.line,marginBottom:9,paddingHorizontal:13,flexDirection:'row',alignItems:'center',gap:12},label:{fontSize:8,fontWeight:'700',color:colors.gray,marginBottom:2},value:{fontSize:11,color:colors.ink},primary:{height:46,borderRadius:13,backgroundColor:colors.teal2,alignItems:'center',justifyContent:'center',marginTop:5},primaryText:{fontSize:13,fontWeight:'700',color:colors.white},secondary:{height:46,borderRadius:13,borderWidth:1.5,borderColor:colors.teal2,alignItems:'center',justifyContent:'center',marginTop:8},secondaryText:{fontSize:13,fontWeight:'700',color:colors.teal2}});
