import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function HomeScreen() {
  const [products, setProducts] = useState([
    { id: '1', name: 'Coca-Cola 330ml', price: 2.5, quantity: 24 },
    { id: '2', name: 'Lays Chips', price: 1.8, quantity: 5 },
    { id: '3', name: 'Instant Noodles', price: 1.2, quantity: 0 },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // Replaced Alert with inline error

  const LOW_STOCK_THRESHOLD = 10;

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) return { text: 'OUT OF STOCK', color: '#d32f2f', bg: '#ffcdd2' };
    if (quantity < LOW_STOCK_THRESHOLD) return { text: 'LOW STOCK', color: '#f57c00', bg: '#ffe0b2' };
    return { text: 'IN STOCK', color: '#388e3c', bg: '#c8e6c9' };
  };

  const handleAddProduct = () => {
    setErrorMsg(''); // Clear previous errors

    if (!newName.trim() || !newPrice.trim() || !newQuantity.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    const priceNum = parseFloat(newPrice);
    const qtyNum = parseInt(newQuantity);

    if (isNaN(priceNum) || isNaN(qtyNum) || priceNum < 0 || qtyNum < 0) {
      setErrorMsg('Price and Quantity must be valid positive numbers.');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: newName,
      price: priceNum,
      quantity: qtyNum,
    };

    setProducts([...products, newProduct]);
    setNewName('');
    setNewPrice('');
    setNewQuantity('');
    setIsModalVisible(false);
  };

  const renderItem = ({ item }: { item: any }) => {
    const badge = getStockBadge(item.quantity);
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.color }]}>{badge.text}</Text>
          </View>
        </View>
        <Text style={styles.detail}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={styles.detail}>Quantity: {item.quantity}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>StockMate</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Low stock threshold: below {LOW_STOCK_THRESHOLD}</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Form Overlay */}
      {isModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Product</Text>

            {/* Inline Error Message */}
            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Product Name (e.g., Milk)"
              value={newName}
              onChangeText={(text) => { setNewName(text); setErrorMsg(''); }}
            />
            <TextInput
              style={styles.input}
              placeholder="Price (e.g., 3.50)"
              keyboardType="numeric"
              value={newPrice}
              onChangeText={(text) => { setNewPrice(text); setErrorMsg(''); }}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity (e.g., 10)"
              keyboardType="numeric"
              value={newQuantity}
              onChangeText={(text) => { setNewQuantity(text); setErrorMsg(''); }}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddProduct}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 60, paddingHorizontal: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  name: { fontSize: 17, fontWeight: '600', flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  detail: { fontSize: 14, color: '#555', marginTop: 2 },
  
  addButton: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, cursor: 'pointer' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  
  modalOverlay: { 
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    padding: 20,
    zIndex: 9999
  },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 16 },
  
  errorText: { color: 'red', fontWeight: 'bold', marginBottom: 10 },
  
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelButton: { flex: 1, padding: 12, alignItems: 'center', marginRight: 8, backgroundColor: '#eee', borderRadius: 8, cursor: 'pointer' },
  cancelButtonText: { color: '#333', fontWeight: 'bold' },
  saveButton: { flex: 1, padding: 12, alignItems: 'center', marginLeft: 8, backgroundColor: '#28a745', borderRadius: 8, cursor: 'pointer' },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
});