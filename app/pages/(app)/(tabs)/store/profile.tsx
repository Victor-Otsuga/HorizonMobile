import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function StoreProfile({ route }) {
  const { store } = route.params;

  return (
    <View style={styles.container}>
      <Image source={store.image} style={styles.image} />
      <Text style={styles.name}>{store.name}</Text>
      <Text style={styles.rating}>⭐ {store.rating} ({store.reviews} avaliações)</Text>
      {/* Adicione mais informações da oficina aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 12,
    marginBottom: 24,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  rating: {
    fontSize: 18,
    color: '#444',
    marginBottom: 24,
  },
});
