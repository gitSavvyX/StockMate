import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  const [products] = useState([
    { id: '1', name: 'Coca-Cola 330ml', price: 2.5, quantity: 24 },
    { id: '2', name: 'Lays Chips', price: 1.8, quantity: 5 },
    { id: '3', name: 'Instant Noodles', price: 1.2, quantity: 0 },
  ]);

  const LOW_STOCK_THRESHOLD = 10;

  const getStockBadge = (quantity) => {
    if (quantity === 0) {
      return { text: 'OUT OF STOCK', color: '#d32f2f', bg: '#ffcdd2' };
    }
    if (quantity < LOW_STOCK_THRESHOLD) {
      return { text: 'LOW STOCK', color: '#f57c00', bg: '#ffe0b2' };
    }
    return { text: 'IN STOCK', color: '#388e3c', bg: '#c8e6c9' };
  };

  const renderItem = ({ item }) => {
    const badge = getStockBadge(item.quantity);

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.color }]}>
              {badge.text}
            </Text>
          </View>
        </View>
        <Text style={styles.detail}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={styles.detail}>Quantity: {item.quantity}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>StockMate Inventory</Text>
      <Text style={styles.subtitle}>
        Low stock threshold: below {LOW_STOCK_THRESHOLD}
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});