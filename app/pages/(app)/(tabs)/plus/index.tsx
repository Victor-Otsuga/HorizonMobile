import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

export default function Plus() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 3D Model / AR area */}
      <View style={styles.card}>
        <View style={styles.modelPlaceholder}>
          {/* Placeholder image / 3D model container - replace with real 3D/AR component later */}
          <Image source={require('../../../../../assets/4.jpg')} style={styles.modelImage} resizeMode="cover" />
          <TouchableOpacity style={styles.arButton}>
            <MaterialIcons name="open-in-full" size={16} color="#fff" />
            <Text style={styles.arButtonText}>Ver em AR</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Car info */}
      <View style={styles.infoCard}>
        <Text style={styles.title}>Honda Civic EX</Text>
        <Text style={styles.subtitle}>2019/2019</Text>

        <View style={styles.rowTop}>
          <View style={styles.badge}><Text style={styles.badgeText}>XXX-1234</Text></View>
          <Text style={styles.km}>• 82.500 km</Text>
        </View>

        <View style={styles.featuresRow}>
          <View style={styles.featureBox}>
            <FontAwesome name="tint" size={22} color="#29b6f6" />
            <Text style={styles.featureLabel}>Combustível</Text>
            <Text style={styles.featureValue}>Flex</Text>
          </View>

          <View style={styles.featureBox}>
            <FontAwesome name="cogs" size={22} color="#4caf50" />
            <Text style={styles.featureLabel}>Câmbio</Text>
            <Text style={styles.featureValue}>Automático</Text>
          </View>

          <View style={styles.featureBox}>
            <FontAwesome name="tachometer" size={22} color="#ff9800" />
            <Text style={styles.featureLabel}>Motor</Text>
            <Text style={styles.featureValue}>2.0</Text>
          </View>
        </View>

        <View style={styles.rowDates}>
          <View>
            <Text style={styles.smallLabel}>Última revisão</Text>
            <Text style={styles.smallValue}>14/08/2024</Text>
          </View>
          <View>
            <Text style={styles.smallLabel}>Próxima revisão</Text>
            <Text style={styles.smallValue}>12/02/2025</Text>
          </View>
        </View>
      </View>

      {/* Status / Alerts */}
      <View style={styles.alertsSection}>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <View style={styles.statusCircleGreen}><Text style={styles.statusPercent}>85%</Text></View>
            <Text style={styles.statusLabel}>Bateria</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={styles.statusCircleYellow}><Text style={styles.statusPercent}>65%</Text></View>
            <Text style={styles.statusLabel}>Óleo</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={styles.statusCircleGreen}><Text style={styles.statusPercent}>90%</Text></View>
            <Text style={styles.statusLabel}>Pneus</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Alertas e Status</Text>

        <View style={styles.alertCard}><Text style={styles.alertTitle}>Próxima troca de óleo</Text><Text style={styles.alertSub}>em 1.200 km</Text></View>
        <View style={styles.alertCard}><Text style={styles.alertTitle}>Revisão de freios</Text><Text style={styles.alertSub}>recomendada</Text></View>
        <View style={styles.alertCardSuccess}><Text style={styles.alertTitle}>IPVA 2025</Text><Text style={styles.alertSub}>pago</Text></View>

        <TouchableOpacity style={styles.secondaryButton}><Text style={styles.secondaryText}>Ver histórico de manutenções</Text></TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}><Text style={styles.secondaryText}>Adicionar observação do veículo</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>Agendar Revisão</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}