import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  restaurant: string;
  orderNumber: string;
  items: CartItem[];
  total: number;
  status: 'Preparing' | 'Out for Delivery' | 'Delivered';
  eta: string;
  itemCount: number;
  image: string;
  date: string;
  statusColor: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
  activeOrders: Order[];
  pastOrders: Order[];
  placeOrder: (restaurant: string, items: CartItem[], total: number) => void;
  reorder: (order: Order) => void;
  activeOrderCount: number;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartCount: 0,
  totalPrice: 0,
  activeOrders: [],
  pastOrders: [],
  placeOrder: () => {},
  reorder: () => {},
  activeOrderCount: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [pastOrders, setPastOrders] = useState<Order[]>([
  {
    id: 'past-1',
    restaurant: 'Royal Biryani House',
    orderNumber: '#8812',
    items: [
      { id: 'biryani1', name: 'Chicken Dum Biryani', price: 320, quantity: 1 },
      { id: 'raita1', name: 'Boondi Raita', price: 60, quantity: 1 },
      { id: 'drink1', name: 'Sweet Lassi', price: 90, quantity: 1 },
    ],
    total: 470,
    status: 'Delivered',
    eta: '',
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=300&fit=crop',
    date: 'Oct 24, 2023',
    statusColor: '#757575',
  },
  {
    id: 'past-2',
    restaurant: 'Spice Villa',
    orderNumber: '#8797',
    items: [
      { id: 'paneer1', name: 'Paneer Butter Masala', price: 280, quantity: 1 },
      { id: 'naan1', name: 'Butter Naan', price: 45, quantity: 2 },
      { id: 'rice1', name: 'Jeera Rice', price: 140, quantity: 1 },
      { id: 'drink2', name: 'Masala Chaas', price: 70, quantity: 1 },
    ],
    total: 580,
    status: 'Delivered',
    eta: '',
    itemCount: 5,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    date: 'Oct 19, 2023',
    statusColor: '#757575',
  },
  {
    id: 'past-3',
    restaurant: 'Madras Cafe',
    orderNumber: '#8764',
    items: [
      { id: 'dosa1', name: 'Masala Dosa', price: 120, quantity: 1 },
      { id: 'coffee1', name: 'Filter Coffee', price: 60, quantity: 1 },
    ],
    total: 180,
    status: 'Delivered',
    eta: '',
    itemCount: 2,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop',
    date: 'Oct 15, 2023',
    statusColor: '#757575',
  },
]);

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const placeOrder = (restaurant: string, cartItems: CartItem[], total: number) => {
    if (cartItems.length === 0) {
      return;
    }

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const newOrder: Order = {
      id: `active-${Date.now()}`,
      restaurant,
      orderNumber: `#${Math.floor(1000 + Math.random() * 9000)}`,
      items: cartItems,
      total,
      status: 'Preparing',
      eta: '~25 mins',
      itemCount,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      statusColor: '#FFB300',
    };

    setActiveOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
  };

  const reorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart({ ...item });
    });
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const activeOrderCount = activeOrders.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice,
        activeOrders,
        pastOrders,
        placeOrder,
        reorder,
        activeOrderCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
