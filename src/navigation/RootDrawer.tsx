import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import MainTabs from './MainTabs';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const { logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.drawerName}>Aditya Chatare</Text>
        <Text style={styles.drawerEmail}>adityachatare1@gmail.com</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem 
        label="Log Out" 
        onPress={logout}
        labelStyle={{ color: '#FF5722', fontWeight: 'bold' }}
      />
    </DrawerContentScrollView>
  );
}

export default function RootDrawer() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerActiveTintColor: '#FF5722' }}
    >
      <Drawer.Screen name="MainApp" component={MainTabs} options={{ title: 'Home' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  drawerEmail: {
    fontSize: 14,
    color: '#757575',
  },
});
