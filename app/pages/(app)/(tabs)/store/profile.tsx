import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function StoreProfile() {
  const { id, name, rating, reviews, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={imageMap[image as string]} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.rating}>⭐ {rating} ({reviews} avaliações)</Text>
      {/* Adicione mais informações da oficina aqui */}
    </View>
  );
}

import p1 from '../../../../../assets/2.jpg';
import p3 from '../../../../../assets/3.jpg';
import p4 from '../../../../../assets/4.jpg';
import p5 from '../../../../../assets/5.jpg';
import p6 from '../../../../../assets/6.jpg';
import p7 from '../../../../../assets/7.jpg';
import p8 from '../../../../../assets/8.jpg';
import p9 from '../../../../../assets/9.jpg';

const imageMap: Record<string, any> = {
  p1,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
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
