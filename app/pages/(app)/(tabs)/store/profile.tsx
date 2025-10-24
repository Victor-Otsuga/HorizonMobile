import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import colors from '../../../../../app/theme/colors';

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

export default function StoreProfile() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Expecting parent to pass `workshop` param as JSON string or individual fields as fallback
  let workshop: any = null;
  if (params.workshop) {
    try {
      workshop = JSON.parse(String(params.workshop));
    } catch (e) {
      // ignore parse error and fallback to individual params
      workshop = null;
    }
  }

  const name = workshop?.name ?? params.name ?? 'Oficina AutoTech';
  const rating = workshop?.rating ?? params.rating ?? '4.8';
  const reviews = workshop?.reviews ?? params.reviews ?? '128';
  const image = workshop?.image ?? params.image ?? 'p4';
  const address = workshop?.address ?? params.address ?? 'Av. Paulista, 1234 - São Paulo, SP';
  const contact = workshop?.contact ?? params.contact ?? '(11) 98765-4321 • contato@autotech.com';
  const services = workshop?.services ?? params.services ?? ['Troca de óleo', 'Alinhamento', 'Freios'];
  const about = workshop?.about ?? params.about ?? 'Oficina com 10 anos de experiência, equipe certificada e garantia nos serviços realizados.';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Voltar">
        <Text style={{ fontSize: 18, color: colors.textDark }}>‹</Text>
      </TouchableOpacity>
      <Image source={imageMap[String(image)]} style={styles.image} />

      <View style={styles.headerRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rating}>⭐ {rating} ({reviews})</Text>
      </View>

      <Text style={styles.address}>{address}</Text>
      <Text style={styles.contact}>{contact}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Serviços</Text>
        <View style={styles.servicesRow}>
          {services.map((s: string, idx: number) => (
            <View key={idx} style={styles.servicePill}><Text style={styles.serviceText}>{s}</Text></View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.paragraph}>{about}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avaliações</Text>
        <View style={styles.reviewCard}><Text style={styles.reviewText}>"Ótimo atendimento e preço justo." — João</Text></View>
        <View style={styles.reviewCard}><Text style={styles.reviewText}>"Entrega dentro do prazo." — Maria</Text></View>
      </View>

      <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(app)/(tabs)/workshop')}>
        <Text style={styles.ctaText}>Agendar Serviço</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    paddingTop: 32,
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 14,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 24,
    zIndex: 30,
    backgroundColor: colors.light,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
  },
  rating: {
    color: colors.textLight,
  },
  address: {
    color: colors.textLight,
    marginBottom: 6,
  },
  contact: {
    color: colors.textLight,
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 8,
  },
  paragraph: {
    color: colors.textLight,
  },
  servicesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  servicePill: {
    backgroundColor: colors.light,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceText: {
    color: colors.textDark,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  reviewText: {
    color: colors.textDark,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaText: {
    color: colors.background,
    fontWeight: '700',
  },
  
});
