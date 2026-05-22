import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search as SearchIcon, ClipboardList, User } from 'lucide-react-native';
import HomeStack from './HomeStack';
import SearchScreen from '../screens/SearchScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { CartContext } from '../context/CartContext';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { cartCount, activeOrderCount } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <SearchIcon color={color} size={size} />
        }} 
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
          tabBarBadge: activeOrderCount > 0 ? activeOrderCount : undefined,
          tabBarBadgeStyle: { backgroundColor: '#FF5722' }
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />
        }} 
      />
    </Tab.Navigator>
  );
}
