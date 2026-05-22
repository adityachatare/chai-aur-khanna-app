import React, { useContext } from 'react';
import { NavigationContainer, LinkingOptions, NavigatorScreenParams } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import RootDrawer from './RootDrawer';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: { restaurantName: string; name?: string; price?: string };
  Cart: undefined;
};

type MainTabsParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Orders: undefined;
  Profile: undefined;
};

type RootDrawerParamList = {
  MainApp: NavigatorScreenParams<MainTabsParamList>;
  Settings: undefined;
  Help: undefined;
};

export default function Navigation() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  const linking: LinkingOptions<RootDrawerParamList> = {
    prefixes: [prefix, 'foodapp://'],
    config: {
      screens: {
        MainApp: {
          screens: {
            HomeTab: {
              screens: {
                RestaurantDetail: 'restaurant/:restaurantName',
              },
            },
          },
        },
      },
    },
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF5722" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated ? <RootDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
