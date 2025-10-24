import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useViewMode } from '../../../../../context/ViewModeContext';


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

const stores = [
  {
    id: '1',
    name: 'Automáticos Mooca',
    rating: 4.7,
    reviews: 478,
    image: 'p3',
  },
  {
    id: '2',
    name: 'ZR1 Car Service',
    rating: 4.6,
    reviews: 99,
    image: 'p4',
  },
  {
    id: '3',
    name: 'Oficina Central',
    rating: 4.5,
    reviews: 150,
    image: 'p1',
  },
  {
    id: '4',
    name: 'Tecpolish ',  
    rating: 4.4,
    reviews: 85,
    image: 'p5',
  },
];

const partners = [
  {
    id: '1',
    name: 'Oficina do Zé',
    rating: 4.8,
    reviews: 320,
    image: 'p6',
  },
  { 
    id: '2',
    name: 'AutoPlus',
    rating: 4.7,
    reviews: 210,
    image: 'p7',
  },
  {
    id: '3',
    name: 'CarFix',
    rating: 4.6,
    reviews: 180,
    image: 'p8',
  },
  {
    id: '4',
    name: 'Mecânica Rápida',
    rating: 4.5,  
    reviews: 140,
    image: 'p9',
  },
];

export default function Store() {
  const { mode } = useViewMode();
  const router = useRouter();
  const handlePressStore = (store: { id: string; name: string; rating: number; reviews: number; image: string; }) => {
    router.push({
      pathname: '/pages/(app)/(tabs)/store/profile',
      params: {
        id: store.id,
        name: store.name,
        rating: store.rating,
        reviews: store.reviews,
        image: store.image,
      },
    });
  };
  if (mode === 'mechanic') {
    const parts = [
      { id: 'a1', name: 'Filtro de óleo - Rede Ancora', price: 'R$ 45,00' },
      { id: 'a2', name: 'Pastilha de freio - Rede Ancora', price: 'R$ 120,00' },
      { id: 'a3', name: 'Amortecedor dianteiro - Rede Ancora', price: 'R$ 380,00' },
    ];

    return (
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.container}>
          <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Marketplace - Rede Ancora</Text>
          {parts.map(p => (
            <View key={p.id} style={{ padding: 12, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8 }}>
              <Text style={{ fontWeight: '700' }}>{p.name}</Text>
              <Text style={{ color: '#666' }}>{p.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.container}>
        <Text style={styles.locationLabel}>Sua localização</Text>
        <Text style={styles.location}>São Paulo, SP</Text>

        <View style={styles.promoContainer}>
          <Image
            source={p1}
            style={styles.promoImage}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Principais oficinas</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={stores}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handlePressStore(item)}>
              <Image source={imageMap[item.image]} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardRating}>
                ⭐ {item.rating} ({item.reviews})
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

         <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Oficinas parceiras</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={partners}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handlePressStore(item)}>
              <Image source={imageMap[item.image]} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardRating}>
                ⭐ {item.rating} ({item.reviews})
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* Repita a seção se quiser mostrar mais lojas */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16, paddingTop: 32 },
  locationLabel: { color: '#888', fontSize: 18, marginTop: 16 },
  location: { fontSize: 22, marginBottom: 16 },
  promoContainer: { borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  promoImage: { width: '100%', height: 150, backgroundColor: '#eee' },
  promoText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 22, fontWeight: 'bold' },
  seeAll: { color: '#b00', fontSize: 16 },
  card: {
    width: 140,
    height: 170,
    marginRight: 16,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardImage: { width: 120, height: 80, borderRadius: 8, backgroundColor: '#eee' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  cardRating: { fontSize: 14, color: '#444', marginTop: 4 },
});



