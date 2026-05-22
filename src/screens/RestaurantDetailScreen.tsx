import React, { useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Bookmark,
  Star,
  Clock,
  Truck,
  MapPin,
} from 'lucide-react-native';
import { CartContext } from '../context/CartContext';

const { width } = Dimensions.get('window');

// Restaurant data keyed by ID
const RESTAURANT_DATA: Record<string, any> = {
  'spice-villa': {
    name: 'Spice Villa',
    tagline: 'Authentic North Indian Curries & Tandoor Specials',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop',
    rating: '4.7',
    time: '25-35 min',
    deliveryFee: '₹49',
    distance: '2.1 km',
  },
  'bombay-street-kitchen': {
    name: 'Bombay Street Kitchen',
    tagline: 'Mumbai Street Food, Chaats & Pav Bhaji',
    image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&h=400&fit=crop',
    rating: '4.8',
    time: '20-30 min',
    deliveryFee: '₹39',
    distance: '1.5 km',
  },
  'royal-biryani-house': {
    name: 'Royal Biryani House',
    tagline: 'Hyderabadi Dum Biryani & Mughlai Delights',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&h=400&fit=crop',
    rating: '4.9',
    time: '30-40 min',
    deliveryFee: '₹59',
    distance: '3.0 km',
  },
  'madras-cafe': {
    name: 'Madras Cafe',
    tagline: 'South Indian Dosas, Idlis & Filter Coffee',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&h=400&fit=crop',
    rating: '4.6',
    time: '15-25 min',
    deliveryFee: '₹29',
    distance: '1.2 km',
  },
};

// // Restaurant data keyed by ID
// const RESTAURANT_DATA: Record<string, any> = {
//   'bella-italia-grill': {
//     name: 'Bella Italia Grill',
//     tagline: 'Authentic Italian Cuisine & Wood-fired Pizzas',
//     image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
//     rating: '4.8',
//     time: '20-30 min',
//     deliveryFee: '₹2.99',
//     distance: '1.5 mi',
//   },
//   'the-rustic-grill': {
//     name: 'The Rustic Grill',
//     tagline: 'Artisanal Burgers & Hand-cut Fries',
//     image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop',
//     rating: '4.8',
//     time: '25-35 min',
//     deliveryFee: '₹1.99',
//     distance: '1.2 mi',
//   },
//   'sushi-zen': {
//     name: 'Sushi Zen',
//     tagline: 'Premium Japanese Rolls & Sashimi',
//     image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=400&fit=crop',
//     rating: '4.9',
//     time: '30-40 min',
//     deliveryFee: '₹3.49',
//     distance: '2.0 mi',
//   },
// };

const DEFAULT_RESTAURANT = {
  name: 'The Rustic Grill',
  tagline: 'Artisanal Burgers & Hand-cut Fries',
  image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop',
  rating: '4.8',
  time: '25-35 min',
  deliveryFee: '₹1.99',
  distance: '1.2 mi',
};

const MENU_CATEGORIES = [
  'Veg Starters',
  'Non-Veg Starters',
  'Curries',
  'Biryani',
  'Indian Breads',
  'Accompaniments',
  'Beverages',
  'Desserts',
];

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
}

// const MENU_ITEMS: MenuItem[] = [
//   {
//     id: 'm1',
//     name: 'Truffle Parmesan Fries',
//     desc: 'Hand-cut fries tossed in white truffle oil, grated parmesan, and...',
//     price: 12.50,
//     image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop',
//     category: 'Appetizers',
//   },
//   {
//     id: 'm2',
//     name: 'Spicy Buffalo Wings',
//     desc: 'Crispy wings glazed in signature hot sauce with a side of blue...',
//     price: 14.00,
//     image: 'https://images.unsplash.com/photo-1608039829572-9b1234ef1321?w=200&h=200&fit=crop',
//     category: 'Appetizers',
//   },
//   {
//     id: 'm3',
//     name: 'The Signature Stack 🍔',
//     desc: 'Double wagyu beef patties, sharp cheddar, smoked bacon, and...',
//     price: 18.95,
//     image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
//     category: 'Mains',
//   },
//   {
//     id: 'm4',
//     name: 'Wild Mushroom Risotto',
//     desc: 'Creamy arborio rice with porcini mushrooms, truffle oil, and chives.',
//     price: 21.00,
//     image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200&h=200&fit=crop',
//     category: 'Mains',
//   },
//   {
//     id: 'm5',
//     name: 'Garlic Butter Corn',
//     desc: 'Grilled sweet corn with herb-infused garlic butter and sea salt.',
//     price: 7.50,
//     image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=200&fit=crop',
//     category: 'Sides',
//   },
//   {
//     id: 'm6',
//     name: 'Coleslaw',
//     desc: 'Creamy house-made coleslaw with fresh cabbage and carrots.',
//     price: 5.00,
//     image: 'https://images.unsplash.com/photo-1625938145744-e380515399bf?w=200&h=200&fit=crop',
//     category: 'Sides',
//   },
//   {
//     id: 'm7',
//     name: 'Fresh Lemonade',
//     desc: 'Freshly squeezed lemons with a hint of mint and honey.',
//     price: 4.50,
//     image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&h=200&fit=crop',
//     category: 'Drinks',
//   },
//   {
//     id: 'm8',
//     name: 'Chocolate Lava Cake',
//     desc: 'Warm molten chocolate cake served with vanilla bean ice cream.',
//     price: 10.00,
//     image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop',
//     category: 'Desserts',
//   },
// ];

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Paneer Tikka',
    desc: 'Chunks of paneer marinated in spicy yogurt and grilled with capsicum...',
    price: 250,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&h=200&fit=crop',
    category: 'Veg Starters',
  },
  {
    id: 'm2',
    name: 'Chicken Seekh Kebab',
    desc: 'Juicy minced chicken kebabs infused with Indian spices and herbs...',
    price: 320,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&h=200&fit=crop',
    category: 'Non-Veg Starters',
  },
  {
    id: 'm3',
    name: 'Butter Chicken 🍛',
    desc: 'Tender chicken cooked in creamy tomato gravy with butter and spices...',
    price: 380,
    image: 'https://images.unsplash.com/photo-1603893662172-99ed0cea2a08?w=200&h=200&fit=crop',
    category: 'Curries',
  },
  {
    id: 'm4',
    name: 'Veg Biryani',
    desc: 'Fragrant basmati rice layered with vegetables, saffron, and spices.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop',
    category: 'Biryani',
  },
  {
    id: 'm5',
    name: 'Garlic Naan',
    desc: 'Soft tandoor-baked naan brushed with garlic butter and coriander.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=200&h=200&fit=crop',
    category: 'Indian Breads',
  },
  {
    id: 'm6',
    name: 'Jeera Rice',
    desc: 'Steamed basmati rice tempered with cumin seeds and ghee.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop',
    category: 'Accompaniments',
  },
  {
    id: 'm7',
    name: 'Mango Lassi',
    desc: 'Refreshing yogurt-based mango drink topped with cardamom.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=200&h=200&fit=crop',
    category: 'Beverages',
  },
  {
    id: 'm8',
    name: 'Gulab Jamun',
    desc: 'Soft milk-solid dumplings soaked in warm saffron sugar syrup.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=200&fit=crop',
    category: 'Desserts',
  },
];

const slugify = (value: string) =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function RestaurantDetailScreen({ route, navigation }: any) {
  const { restaurantName, name } = route.params;
  const { addToCart, cartCount, totalPrice } = useContext(CartContext);
  const [activeCategory, setActiveCategory] = useState('Appetizers');
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<Record<string, number>>({});

  const restaurantKey = slugify(restaurantName ?? name ?? '');
  const restaurant = RESTAURANT_DATA[restaurantKey] || DEFAULT_RESTAURANT;

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 });
  };

  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
    const yOffset = sectionRefs.current[category];
    if (yOffset !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: yOffset - 60, animated: true });
    }
  };

  // Get menu items grouped by category (only categories that have items)
  const activeCategories = MENU_CATEGORIES.filter((cat) =>
    MENU_ITEMS.some((item) => item.category === cat)
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Custom Header */}
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.customHeader}>
          <Pressable
            style={styles.headerBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color="#FFFFFF" size={22} />
          </Pressable>
          <Text style={styles.headerBrand}>Chai Aur Khanna</Text>
          <Pressable style={styles.headerBtn}>
            <Bookmark color="#FFFFFF" size={22} />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: restaurant.image }} style={styles.heroImage} />
        </View>

        {/* Restaurant Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <View style={styles.infoCardNameWrap}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantTagline}>{restaurant.tagline}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Star color="#FFFFFF" size={12} fill="#FFFFFF" />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
          </View>

          {/* Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock color="#757575" size={16} />
              <View>
                <Text style={styles.metaValue}>{restaurant.time}</Text>
              </View>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Truck color="#757575" size={16} />
              <View>
                <Text style={styles.metaValue}>{restaurant.deliveryFee}</Text>
                <Text style={styles.metaLabel}>Delivery</Text>
              </View>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <MapPin color="#757575" size={16} />
              <View>
                <Text style={styles.metaValue}>{restaurant.distance}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryTabsWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryTabsScroll}
          >
            {MENU_CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryTab,
                  activeCategory === cat && styles.categoryTabActive,
                ]}
                onPress={() => handleCategoryPress(cat)}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    activeCategory === cat && styles.categoryTabTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Menu Sections */}
        <View style={styles.menuContainer}>
          {activeCategories.map((category) => (
            <View
              key={category}
              onLayout={(e) => {
                sectionRefs.current[category] = e.nativeEvent.layout.y;
              }}
            >
              <Text style={styles.menuSectionTitle}>{category}</Text>
              {MENU_ITEMS.filter((item) => item.category === category).map(
                (item) => (
                  <View key={item.id} style={styles.menuItemCard}>
                    <View style={styles.menuItemLeft}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      <Text style={styles.menuItemDesc} numberOfLines={2}>
                        {item.desc}
                      </Text>
                      <View style={styles.menuItemPriceRow}>
                        <Text style={styles.menuItemPrice}>
                          ₹{item.price.toFixed(2)}
                        </Text>
                        <Pressable
                          style={styles.addButton}
                          onPress={() => handleAddToCart(item)}
                        >
                          <Text style={styles.addButtonText}>+ Add</Text>
                        </Pressable>
                      </View>
                    </View>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.menuItemImage}
                    />
                  </View>
                )
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* View Cart Footer */}
      {cartCount > 0 && (
        <SafeAreaView style={styles.footerSafeArea} edges={['bottom']}>
          <View style={styles.footer}>
            <Pressable
              style={styles.viewCartButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <View style={styles.viewCartLeft}>
                <Text style={styles.viewCartLabel}>View Cart</Text>
                <Text style={styles.viewCartSub}>
                  {cartCount} item{cartCount > 1 ? 's' : ''} from{' '}
                  {restaurant.name}
                </Text>
              </View>
              <Text style={styles.viewCartTotal}>
                ₹{totalPrice.toFixed(2)}
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Custom Header
  headerSafeArea: {
    backgroundColor: '#1A1A1A',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBrand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF5722',
    letterSpacing: -0.5,
  },

  // Scroll
  scrollContent: {
    paddingBottom: 120,
  },

  // Hero
  heroContainer: {
    height: 220,
    backgroundColor: '#1A1A1A',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  // Info Card
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  infoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoCardNameWrap: {
    flex: 1,
    paddingRight: 12,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  restaurantTagline: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Meta row
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  metaLabel: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  metaDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#F0F0F0',
  },

  // Category Tabs
  categoryTabsWrap: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  categoryTabsScroll: {
    gap: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
  },
  categoryTabActive: {
    backgroundColor: '#FF5722',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },

  // Menu
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  menuSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 20,
    marginBottom: 16,
  },
  menuItemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flex: 1,
    paddingRight: 16,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  menuItemDesc: {
    fontSize: 13,
    color: '#9E9E9E',
    lineHeight: 18,
    marginBottom: 10,
  },
  menuItemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5722',
  },
  addButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  menuItemImage: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },

  // Footer
  footerSafeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  viewCartButton: {
    backgroundColor: '#FF5722',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  viewCartLeft: {
    flex: 1,
  },
  viewCartLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  viewCartSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  viewCartTotal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
