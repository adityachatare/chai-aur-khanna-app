import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { DrawerActions } from '@react-navigation/native';
import {
  Menu,
  ShoppingCart,
  Camera,
  User,
  CreditCard,
  Bell,
  List,
  HelpCircle,
  LogOut,
} from 'lucide-react-native';

export default function ProfileScreen({ navigation }: any) {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.iconButton}>
          <Menu color="#1A1A1A" size={24} />
        </Pressable>

        <Text style={styles.brandName}>Chai Aur Khanna</Text>

        <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <ShoppingCart color="#1A1A1A" size={24} />
        </Pressable>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://media.licdn.com/dms/image/v2/D4D03AQGUQ53fNOtreQ/profile-displayphoto-scale_400_400/B4DZlSTP8PIgAg-/0/1758022406207?e=1781136000&v=beta&t=j-H27935wE35GpiXjNOsQdpx4V8SidJyKIGFFuht-2w' }}
            style={styles.avatar}
          />
          <Pressable style={styles.cameraButton}>
            <Camera color="#fff" size={16} />
          </Pressable>
        </View>
        <Text style={styles.name}>Aditya Chatare</Text>
        <Text style={styles.email}>adityachatare1@gmail.com</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={[styles.statCard, styles.levelCard]}>
          <Text style={[styles.statNumber, styles.levelText]}>Gold</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <Pressable style={styles.menuItem}>
          <View style={styles.menuIconBackground}>
            <User color="#FF5722" size={18} />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Personal Info</Text>
            <Text style={styles.menuSubtitle}>Manage profile, bio, and birthday</Text>
          </View>
        </Pressable>

        <Pressable style={styles.menuItem}>
          <View style={styles.menuIconBackgroundLight}>
            <CreditCard color="#1A1A1A" size={18} />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Payment Methods</Text>
            <Text style={styles.menuSubtitle}>Mastercard ending in 4242</Text>
          </View>
        </Pressable>

        <Pressable style={styles.menuItem}>
          <View style={styles.menuIconBackgroundLight}>
            <Bell color="#1A1A1A" size={18} />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Notification Preferences</Text>
            <Text style={styles.menuSubtitle}>Order status and promotion alerts</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.section}> 
        <Text style={styles.sectionTitle}>Quick Links</Text>

        <Pressable style={styles.quickLinkItem}>
          <View style={styles.menuIconBackgroundLight}>
            <List color="#1A1A1A" size={18} />
          </View>
          <Text style={styles.quickLinkText}>My Orders</Text>
        </Pressable>

        <Pressable style={styles.quickLinkItem}>
          <View style={styles.menuIconBackgroundLight}>
            <HelpCircle color="#1A1A1A" size={18} />
          </View>
          <Text style={styles.quickLinkText}>Help & Support</Text>
        </Pressable>

        <Pressable style={styles.quickLinkItem} onPress={logout}>
          <View style={styles.menuIconBackgroundLight}>
            <LogOut color="#FF5722" size={18} />
          </View>
          <Text style={[styles.quickLinkText, styles.logoutText]}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EE',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#D84315',
  },
  profileCard: {
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 18,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  levelCard: {
    backgroundColor: '#E6F4EE',
    marginRight: 0,
    marginLeft: 10,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  levelText: {
    color: '#00796B',
  },
  statLabel: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  menuIconBackground: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF3E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIconBackgroundLight: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#7C7C7C',
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  logoutText: {
    color: '#FF5722',
  },
});
