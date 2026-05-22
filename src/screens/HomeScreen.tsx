import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  ShoppingBag,
  ChevronDown,
  Star,
  Clock,
  DollarSign,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  {
    id: '1',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Biryani',
    image: 'https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    name: 'North Indian',
    image: 'https://images.unsplash.com/photo-1743674453123-93356ade2891?q=80&w=734&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '6',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop',
  },
];
const FEATURED_RESTAURANT = {
  id: '1',
  name: 'Spice Villa',
  image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop',
  cuisine: 'North Indian • Tandoor • Curries',
  rating: '4.8',
  time: '25-35 min',
  priceRange: '₹400-600',
  freeDelivery: true,
};

const RESTAURANT_LIST = [
  {
    id: '2',
    name: 'Bombay Street Kitchen',
    image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=200&h=200&fit=crop',
    cuisine: 'Street Food • Chaat • Pav Bhaji',
    rating: '4.6',
    time: '15-25 min',
    priceRange: '₹400-600',
  },
  {
    id: '3',
    name: 'Royal Biryani House',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=200&h=200&fit=crop',
    cuisine: 'Biryani • Mughlai',
    rating: '4.9',
    time: '20-30 min',
    priceRange: '₹400-600',
  },
  {
    id: '4',
    name: 'Madras Cafe',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&h=200&fit=crop',
    cuisine: 'South Indian • Dosa • Filter Coffee',
    rating: '4.7',
    time: '10-20 min',
    priceRange: '₹400-600',
  },
];
export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.deliverRow}>
              <Text style={styles.deliverLabel}>Deliver to</Text>
              <ChevronDown color="#FF5722" size={16} />
            </View>
            <Text style={styles.locationText}>Baner, Pune</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.brandName}>Chai Aur Khaana</Text>
            <Pressable
              style={styles.cartIconWrap}
              onPress={() => navigation.navigate('Cart')}
            >
              <ShoppingBag color="#1A1A1A" size={22} />
            </Pressable>
            <View style={styles.avatarWrap}>
              <Image
                source={{
                  uri: 'https://media.licdn.com/dms/image/v2/D4D03AQGUQ53fNOtreQ/profile-displayphoto-scale_400_400/B4DZlSTP8PIgAg-/0/1758022406207?e=1781136000&v=beta&t=j-H27935wE35GpiXjNOsQdpx4V8SidJyKIGFFuht-2w',
                }}
                style={styles.avatar}
              />
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color="#9E9E9E" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for burgers, biryani, or pizza..."
              placeholderTextColor="#9E9E9E"
            />
          </View>
        </View>

        {/* Top Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Categories</Text>
            <Pressable>
              <Text style={styles.viewAllText}>View all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map((cat) => (
              <Pressable key={cat.id} style={styles.categoryItem}>
                <View style={styles.categoryImageWrap}>
                  <Image
                    source={{ uri: cat.image }}
                    style={styles.categoryImage}
                  />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Featured Restaurants */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Restaurants</Text>
          <Pressable
            style={styles.featuredCard}
            onPress={() =>
              navigation.navigate('RestaurantDetail', {
                restaurantName: FEATURED_RESTAURANT.name,
                name: FEATURED_RESTAURANT.name,
                price: '₹18.50',
              })
            }
          >
            <View style={styles.featuredImageWrap}>
              <Image
                source={{ uri: FEATURED_RESTAURANT.image }}
                style={styles.featuredImage}
              />
              {FEATURED_RESTAURANT.freeDelivery && (
                <View style={styles.freeDeliveryBadge}>
                  <Text style={styles.freeDeliveryText}>Free Delivery</Text>
                </View>
              )}
            </View>
            <View style={styles.featuredInfo}>
              <View style={styles.featuredNameRow}>
                <Text style={styles.featuredName}>
                  {FEATURED_RESTAURANT.name}
                </Text>
                <View style={styles.ratingBadge}>
                  <Star color="#FF5722" size={14} fill="#FF5722" />
                  <Text style={styles.ratingText}>
                    {FEATURED_RESTAURANT.rating}
                  </Text>
                </View>
              </View>
              <Text style={styles.featuredCuisine}>
                {FEATURED_RESTAURANT.cuisine}
              </Text>
              <View style={styles.featuredMeta}>
                <Clock color="#757575" size={14} />
                <Text style={styles.featuredMetaText}>
                  {FEATURED_RESTAURANT.time}
                </Text>
                <Text style={styles.metaDot}>•</Text>
                <DollarSign color="#757575" size={14} />
                <Text style={styles.featuredMetaText}>
                  {FEATURED_RESTAURANT.priceRange}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Restaurant List Items */}
        <View style={styles.listSection}>
          {RESTAURANT_LIST.map((restaurant) => (
            <Pressable
              key={restaurant.id}
              style={styles.listCard}
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  restaurantName: restaurant.name,
                  name: restaurant.name,
                  price: '₹12.50',
                })
              }
            >
              <Image
                source={{ uri: restaurant.image }}
                style={styles.listImage}
              />
              <View style={styles.listInfo}>
                <Text style={styles.listName}>{restaurant.name}</Text>
                <Text style={styles.listCuisine}>{restaurant.cuisine}</Text>
                <View style={styles.listMeta}>
                  <Clock color="#9E9E9E" size={12} />
                  <Text style={styles.listMetaText}>{restaurant.time}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.listMetaText}>
                    {restaurant.priceRange}
                  </Text>
                </View>
              </View>
              <View style={styles.listRating}>
                <Star color="#FF5722" size={14} fill="#FF5722" />
                <Text style={styles.listRatingText}>{restaurant.rating}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Special Offers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <View style={styles.offerCard}>
            <View style={styles.offerContent}>
              <Text style={styles.offerHeadline}>Get 50% Off</Text>
              <Text style={styles.offerSubtext}>
                On your first order with Chai Aur Khaana. Limited time only!
              </Text>
              <Pressable style={styles.claimButton}>
                <Text style={styles.claimButtonText}>Claim Now</Text>
              </Pressable>
            </View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop',
              }}
              style={styles.offerImage}
            />
          </View>
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flex: 1,
  },
  deliverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliverLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF5722',
    letterSpacing: -0.5,
  },
  cartIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },

  // Search
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    padding: 0,
  },

  // Sections
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: '600',
  },

  // Categories
  categoriesScroll: {
    gap: 16,
    paddingRight: 4,
  },
  categoryItem: {
    alignItems: 'center',
    width: 68,
  },
  categoryImageWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: 12,
    color: '#424242',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Featured Card
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginTop: 8,
  },
  featuredImageWrap: {
    position: 'relative',
    height: 180,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  freeDeliveryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  freeDeliveryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  featuredInfo: {
    padding: 16,
  },
  featuredNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4CAF50',
  },
  featuredCuisine: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredMetaText: {
    fontSize: 13,
    color: '#757575',
  },
  metaDot: {
    color: '#BDBDBD',
    fontSize: 13,
    marginHorizontal: 4,
  },

  // List Items
  listSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  listImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  listInfo: {
    flex: 1,
    marginLeft: 14,
  },
  listName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 3,
  },
  listCuisine: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 4,
  },
  listMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listMetaText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  listRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 8,
  },
  listRatingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  // Special Offers
  offerCard: {
    flexDirection: 'row',
    backgroundColor: '#FF5722',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    minHeight: 150,
  },
  offerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  offerHeadline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  offerSubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
    marginBottom: 14,
  },
  claimButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: '700',
  },
  offerImage: {
    width: 140,
    height: '100%',
    resizeMode: 'cover',
  },
});
