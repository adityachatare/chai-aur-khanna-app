import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext, Order } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Repeat } from 'lucide-react-native';

export default function OrdersScreen({ navigation }: any) {
  const { activeOrders, pastOrders, reorder } = useContext(CartContext);

  const getProgressWidth = (status: Order['status']) => {
    switch (status) {
      case 'Preparing':
        return '35%';
      case 'Out for Delivery':
        return '80%';
      default:
        return '100%';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
          <ArrowLeft color="#1A1A1A" size={22} />
        </Pressable>
        <Text style={styles.pageTitle}>Orders</Text>
        <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <ShoppingCart color="#1A1A1A" size={22} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Orders</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{activeOrders.length} Active</Text>
          </View>
        </View>

        {activeOrders.length === 0 ? (
          <View style={styles.emptyActive}>
            <Text style={styles.emptyActiveText}>No active orders at the moment.</Text>
          </View>
        ) : (
          activeOrders.map((order) => (
            <View key={order.id} style={styles.activeCard}>
              <View style={styles.activeCardHeader}>
                <View>
                  <Text style={styles.activeTitle}>{order.restaurant}</Text>
                  <Text style={styles.activeMeta}>Order {order.orderNumber} • {order.itemCount} items</Text>
                </View>
                <View style={[styles.statusPill, { backgroundColor: order.statusColor }]}> 
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>

              <View style={styles.orderImageRow}>
                <Image source={{ uri: order.image }} style={styles.orderImage} />
                <View style={styles.orderSummary}>
                  <Text style={styles.summaryLabel}>Estimated arrival</Text>
                  <Text style={styles.summaryValue}>{order.eta}</Text>
                </View>
              </View>

              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: getProgressWidth(order.status) }]} />
              </View>
            </View>
          ))
        )}

        <Text style={styles.pastHeading}>Past Orders</Text>
        {pastOrders.map((order) => (
          <View key={order.id} style={styles.pastCard}>
            <View style={styles.pastRow}>
              <Image source={{ uri: order.image }} style={styles.pastImage} />
              <View style={styles.pastTextGroup}>
                <Text style={styles.pastTitle}>{order.restaurant}</Text>
                <Text style={styles.pastMeta}>{order.date} • {order.itemCount} items</Text>
              </View>
              <Text style={styles.pastPrice}>₹{order.total.toFixed(2)}</Text>
            </View>
            <View style={styles.pastFooter}>
              <Text style={styles.deliveredText}>Delivered</Text>
              <Pressable style={styles.reorderButton} onPress={() => reorder(order)}>
                <Repeat color="#fff" size={16} />
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
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
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#D84315',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#212121',
  },
  activeBadge: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D84315',
  },
  emptyActive: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyActiveText: {
    fontSize: 15,
    color: '#757575',
  },
  activeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  activeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#212121',
    marginBottom: 6,
  },
  activeMeta: {
    fontSize: 13,
    color: '#757575',
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  orderImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  orderImage: {
    width: 84,
    height: 84,
    borderRadius: 18,
  },
  orderSummary: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#212121',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF5722',
    borderRadius: 999,
  },
  pastHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#212121',
    marginBottom: 16,
  },
  pastCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  pastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pastImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginRight: 14,
  },
  pastTextGroup: {
    flex: 1,
  },
  pastTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#212121',
    marginBottom: 4,
  },
  pastMeta: {
    fontSize: 13,
    color: '#757575',
  },
  pastPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#212121',
  },
  pastFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveredText: {
    fontSize: 13,
    color: '#757575',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#D84315',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  reorderButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
