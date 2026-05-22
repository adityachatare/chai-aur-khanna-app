import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }: any) {
  const { items, totalPrice, removeFromCart, placeOrder } = useContext(CartContext);

  const orderTotal = totalPrice + 2.5;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Details</Text>
              {items.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable onPress={() => removeFromCart(item.id)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>₹{totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>FREE</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{orderTotal.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.footer}>
          <Pressable
            style={styles.checkoutButton}
            onPress={() => {
              placeOrder('Chai Aur Khaana', items, orderTotal);
              navigation.navigate('Orders');
            }}
          >
            <Text style={styles.checkoutButtonText}>
              Place Order • ₹{orderTotal.toFixed(2)}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 40,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cartItemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  quantityContainer: {
    alignItems: 'flex-end',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  removeText: {
    color: '#757575',
    fontSize: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  checkoutButton: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
