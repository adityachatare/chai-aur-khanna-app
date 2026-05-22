import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import CartScreen from '../screens/CartScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function HomeStack({ navigation, route }: any) {
  // Hide bottom tab bar on certain screens
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    if (['RestaurantDetail', 'Cart'].includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="RestaurantDetail" 
        component={RestaurantDetailScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ 
          title: 'Your Cart',
          // headerBackTitleVisible: false,
          headerTintColor: '#FF5722',
        }} 
      />
    </Stack.Navigator>
  );
}
