import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BarChart3, Bell, LayoutGrid } from 'lucide-react-native';
import DashboardScreen from '../screens/DashboardScreen';
import TrendsScreen from '../screens/TrendsScreen';
import AlertsScreen from '../screens/AlertsScreen';
import ReportsScreen from '../screens/ReportsScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();
const DashboardStackNav = createNativeStackNavigator();

function DashboardStack() {
  return (
    <DashboardStackNav.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStackNav.Screen name="DashboardHome" component={DashboardScreen} />
      <DashboardStackNav.Screen name="Trends" component={TrendsScreen} />
    </DashboardStackNav.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.teal2,
        tabBarInactiveTintColor: colors.grayLight,
        tabBarStyle: { height: 66, paddingBottom: 10, paddingTop: 8, borderTopColor: colors.line },
        tabBarLabelStyle: { fontSize: 10.5, fontWeight: '700' },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarIcon: ({ color, size }) => <LayoutGrid size={size - 3} color={color} strokeWidth={2.3} />,
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Bell size={size - 3} color={color} strokeWidth={2.3} />
              <View
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -3,
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: colors.red,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BarChart3 size={size - 3} color={color} strokeWidth={2.3} />,
        }}
      />
    </Tab.Navigator>
  );
}
