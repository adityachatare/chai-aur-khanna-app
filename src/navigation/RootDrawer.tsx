import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image } from 'react-native';
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
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/D4D03AQGUQ53fNOtreQ/profile-displayphoto-scale_400_400/B4DZlSTP8PIgAg-/0/1758022406207?e=1781136000&v=beta&t=j-H27935wE35GpiXjNOsQdpx4V8SidJyKIGFFuht-2w' }}
          style={styles.avatar}
        />
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
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
