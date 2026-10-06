import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Search, X } from 'lucide-react-native';
import GradientHeader from '../components/GradientHeader';
import BellButton from '../components/BellButton';
import AlertCard from '../components/AlertCard';
import { colors, shadow } from '../theme';
import { ALERTS, AlertType, AlertItem } from '../data/mock';

const FILTERS: { key: AlertType | 'all'; label: string }[] = [
  { key: 'all', label: 'All' }, { key: 'critical', label: 'Critical' }, { key: 'warning', label: 'Warning' },
  { key: 'offline', label: 'Offline' }, { key: 'sensor', label: 'Sensor' }, { key: 'resolved', label: 'Resolved' },
];
export default function AlertsScreen() {
  const [filter, setFilter] = useState<AlertType | 'all'>('all'); const [query, setQuery] = useState(''); const [selected,setSelected]=useState<AlertItem|null>(null);
  const data = useMemo(() => ALERTS.filter((a) => (filter === 'all' || a.type === filter)).filter((a) => query.trim() ? (a.title + ' ' + a.meta).toLowerCase().includes(query.toLowerCase()) : true), [filter, query]);
  return <View style={{ flex: 1, backgroundColor: colors.bg }}>
    <GradientHeader height={112}><View style={styles.topRow}><View><Text style={styles.title}>Alerts</Text><Text style={styles.subtitle}>Live events from all sites</Text></View><BellButton icon="filter" onPress={()=>setFilter('all')}/></View></GradientHeader>
    <View style={styles.body}>
      <View style={[styles.searchBar, shadow]}><Search size={16} color={colors.grayLight} strokeWidth={2.2}/><TextInput style={styles.searchInput} placeholder="Search company, site or parameter" placeholderTextColor={colors.grayLight} value={query} onChangeText={setQuery}/></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={{gap:7,paddingRight:8}}>{FILTERS.map((f) => {const active=f.key===filter;return <Pressable key={f.key} style={[styles.filterChip, active&&styles.filterChipActive]} onPress={()=>setFilter(f.key)}><Text style={[styles.filterText,active&&styles.filterTextActive]}>{f.label}</Text></Pressable>})}</ScrollView>
      <FlatList data={data} keyExtractor={(item)=>item.id} renderItem={({item})=><AlertCard item={item} onPress={()=>setSelected(item)}/>} contentContainerStyle={{paddingBottom:24}} showsVerticalScrollIndicator={false} ListEmptyComponent={<Text style={styles.empty}>No alerts match this filter yet.</Text>}/>
    </View>
    <Modal transparent visible={!!selected} animationType="slide" onRequestClose={()=>setSelected(null)}><Pressable style={styles.backdrop} onPress={()=>setSelected(null)}><Pressable style={[styles.sheet,shadow]} onPress={e=>e.stopPropagation()}><View style={styles.modalHeader}><Text style={styles.modalTitle}>Alert details</Text><Pressable onPress={()=>setSelected(null)}><X size={20} color={colors.gray}/></Pressable></View>{selected&&<><AlertCard item={selected}/><Text style={styles.detailLabel}>EVENT INFORMATION</Text><Text style={styles.detailText}>{selected.meta}</Text><Text style={styles.detailText}>Reported {selected.time} · Site monitoring system</Text><Pressable style={styles.done} onPress={()=>setSelected(null)}><Text style={styles.doneText}>Done</Text></Pressable></>}</Pressable></Pressable></Modal>
  </View>;
}
const styles=StyleSheet.create({topRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},title:{fontSize:22,fontWeight:'800',color:colors.white},subtitle:{fontSize:11.5,color:'rgba(255,255,255,.75)',marginTop:2},body:{flex:1,paddingHorizontal:18,paddingTop:14},searchBar:{flexDirection:'row',alignItems:'center',gap:10,backgroundColor:colors.white,borderRadius:16,paddingHorizontal:14,height:46,marginBottom:12,marginTop:-32},searchInput:{flex:1,fontSize:13,color:colors.ink},filterRow:{flexGrow:0,marginBottom:12},filterChip:{paddingHorizontal:14,paddingVertical:8,borderRadius:11,backgroundColor:colors.white,borderWidth:1,borderColor:colors.line},filterChipActive:{backgroundColor:colors.navy,borderColor:colors.navy},filterText:{fontSize:11.5,fontWeight:'700',color:colors.gray},filterTextActive:{color:colors.white},empty:{textAlign:'center',color:colors.gray,marginTop:40,fontSize:13},backdrop:{flex:1,backgroundColor:'rgba(15,34,51,.45)',justifyContent:'flex-end'},sheet:{backgroundColor:colors.white,borderTopLeftRadius:22,borderTopRightRadius:22,padding:20,paddingBottom:30},modalHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:14},modalTitle:{fontSize:17,fontWeight:'800',color:colors.ink},detailLabel:{fontSize:10,fontWeight:'800',color:colors.gray,marginBottom:8},detailText:{fontSize:13,color:colors.ink,marginBottom:7},done:{height:46,backgroundColor:colors.teal2,borderRadius:13,alignItems:'center',justifyContent:'center',marginTop:14},doneText:{color:colors.white,fontWeight:'700'}});
