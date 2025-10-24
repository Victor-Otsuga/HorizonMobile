import React, { useEffect, useRef, useState, useMemo, JSX } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useViewMode } from '../../../../../context/ViewModeContext';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';

// Import da API Key (mesma forma que você usou no outro código)
// Certifique-se de ter EXPO_PUBLIC_GOOGLE_MAPS_API_KEY disponível no ambiente
const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? 'a';

// Tipagem para mecânica
interface Mechanic {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  note?: string;
}

// MOCKED mechanics converted from `store/index.tsx` (stores + partners)
const MOCK_MECHANICS: Mechanic[] = [
  {
    id: '1',
    name: 'Automáticos Mooca',
    address: 'Mooca, São Paulo',
    latitude: -23.5365,
    longitude: -46.5889,
    phone: '+55 11 99999-1001',
    note: 'Especializada em transmissões automáticas',
  },
  {
    id: '2',
    name: 'ZR1 Car Service',
    address: 'Bela Vista, São Paulo',
    latitude: -23.5508,
    longitude: -46.6332,
    phone: '+55 11 99999-1002',
    note: 'Troca de óleo, freios e elétrica',
  },
  {
    id: '3',
    name: 'Oficina Central',
    address: 'Centro, São Paulo',
    latitude: -23.5410,
    longitude: -46.6340,
    phone: '+55 11 99999-1003',
    note: 'Serviços gerais e manutenção preventiva',
  },
  {
    id: '4',
    name: 'Tecpolish',
    address: 'Vila Mariana, São Paulo',
    latitude: -23.5880,
    longitude: -46.6355,
    phone: '+55 11 99999-1004',
    note: 'Polimento e estética automotiva',
  },
  {
    id: 'p1',
    name: 'Oficina do Zé',
    address: 'Bela Vista, São Paulo',
    latitude: -23.5580,
    longitude: -46.6400,
    phone: '+55 11 99999-2001',
    note: 'Oficina parceira - serviços rápidos',
  },
  {
    id: 'p2',
    name: 'AutoPlus',
    address: 'Centro, São Paulo',
    latitude: -23.5490,
    longitude: -46.6350,
    phone: '+55 11 99999-2002',
    note: 'Rede de oficinas credenciadas',
  },
  {
    id: 'p3',
    name: 'CarFix',
    address: 'Consolação, São Paulo',
    latitude: -23.5475,
    longitude: -46.6520,
    phone: '+55 11 99999-2003',
    note: 'Mecânica rápida e diagnósticos',
  },
  {
    id: 'p4',
    name: 'Mecânica Rápida',
    address: 'Vila Buarque, São Paulo',
    latitude: -23.5520,
    longitude: -46.6600,
    phone: '+55 11 99999-2004',
    note: 'Atendimento expresso',
  },
];

export default function HorizonMap(): JSX.Element {
  const { mode } = useViewMode();
  // tipando corretamente o ref do MapView
  const mapRef = useRef<MapView | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [query, setQuery] = useState<string>('');
  // tipagem explícita do selectedMechanic para evitar inferência como 'never'
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Não foi possível obter localização do dispositivo. Mostrando mapa com local padrão.');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation(loc.coords);
        setRegion((r) => ({ ...r, latitude: loc.coords.latitude, longitude: loc.coords.longitude }));
        // animate map to user (verifica se o método existe no current)
        if (mapRef.current && typeof (mapRef.current as any).animateToRegion === 'function') {
          (mapRef.current as any).animateToRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }, 500);
        }
      } catch (err) {
        console.warn('Erro ao obter localização:', err);
      }
    })();
  }, []);

  // Filter mechanics locally by name (simula busca no DB)
  const filteredMechanics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_MECHANICS;
    return MOCK_MECHANICS.filter((m) => m.name.toLowerCase().includes(q));
  }, [query]);

  const handleSelectMechanic = (mechanic: Mechanic) => {
    setSelectedMechanic(mechanic);
    setModalVisible(true);

    // center map on mechanic (verifica a existência do método)
    if (mapRef.current && typeof (mapRef.current as any).animateToRegion === 'function') {
      (mapRef.current as any).animateToRegion({
        latitude: mechanic.latitude,
        longitude: mechanic.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 400);
    }
  };

  const navigateToProfile = (mechanic: Mechanic) => {
    // pass full mechanic object as JSON to profile page
    router.push({
      pathname: '/pages/(app)/(tabs)/store/profile',
      params: { workshop: JSON.stringify(mechanic) },
    });
  };
 

  const openDirections = (lat: number, lng: number) => {
    const dest = `${lat},${lng}`;
    let url = '';
    if (Platform.OS === 'ios') {
      url = `maps://?daddr=${dest}`;
    } else {
      url = `google.navigation:q=${dest}`; // preferido no Android
    }
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // fallback web
        const web = `https://www.google.com/maps/dir/?api=1&destination=${dest}` + (API_KEY ? `&key=${encodeURIComponent(API_KEY)}` : '');
        Linking.openURL(web);
      }
    });
  };

  if (mode === 'mechanic') {
    // mechanic overview
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Painel do Mecânico</Text>
        <Text style={{ marginBottom: 6 }}>Serviços agendados hoje: 4</Text>
        <Text style={{ marginBottom: 12 }}>Receita estimada: R$ 2.450,00</Text>
        <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10 }}>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Próximos atendimentos</Text>
          <Text>09:00 - João - Troca de óleo</Text>
          <Text>10:30 - Maria - Alinhamento</Text>
          <Text>13:30 - Carlos - Freios</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar oficina por nome"
          style={styles.searchInput}
          autoCorrect={false}
        />

        {filteredMechanics.length > 0 && query.length > 0 && (
          <View style={styles.suggestionsBox}>
            <FlatList
              data={filteredMechanics}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectMechanic(item)}>
                  <Text style={styles.suggestionTitle} onPress={() => navigateToProfile(item)}>{item.name}</Text>
                  <Text style={styles.suggestionSubtitle}>{item.address}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {MOCK_MECHANICS.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            title={m.name}
            description={m.address}
            onPress={() => handleSelectMechanic(m)}
          >
            <View style={styles.markerBubble}>
              <Text style={{ fontWeight: 'bold' }}>🔧</Text>
            </View>
            <Callout>
              <View style={{ width: 200 }}>
                <Text style={{ fontWeight: 'bold' }}>{m.name}</Text>
                <Text numberOfLines={2}>{m.address}</Text>
                <TouchableOpacity onPress={() => navigateToProfile(m)} style={{ marginTop: 8 }}>
                  <Text style={{ color: '#1e90ff' }}>Ver perfil</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Details modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMechanic?.name}</Text>
            <Text style={styles.modalText}>{selectedMechanic?.address}</Text>
            <Text style={styles.modalText}>Telefone: {selectedMechanic?.phone}</Text>
            <Text style={styles.modalText}>{selectedMechanic?.note}</Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.directionButton]}
                onPress={() => {
                  if (selectedMechanic) openDirections(selectedMechanic.latitude, selectedMechanic.longitude);
                }}
              >
                <Text style={styles.buttonText}>Ir para cá</Text>
              </TouchableOpacity>
                 <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#1e90ff' }]}
                  onPress={() => {
                    if (selectedMechanic) {
                      setModalVisible(false);
                      navigateToProfile(selectedMechanic);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Ver Perfil</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 20 : 0 },
  searchContainer: { position: 'absolute', top: 35, left: 12, right: 12, zIndex: 20 },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    elevation: 3,
  },
  suggestionsBox: {
    maxHeight: 200,
    backgroundColor: 'white',
    marginTop: 8,
    borderRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  suggestionItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  suggestionTitle: { fontWeight: 'bold' },
  suggestionSubtitle: { color: '#666', marginTop: 4 },
  map: { flex: 1 },
  markerBubble: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '86%',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    elevation: 6,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  modalText: { fontSize: 15, marginBottom: 6 },
  modalButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  button: { flex: 1, padding: 12, borderRadius: 8, marginHorizontal: 6, alignItems: 'center' },
  closeButton: { backgroundColor: '#999' },
  directionButton: { backgroundColor: '#2e86de' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

// import React from 'react';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

// const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

// export default function App() {
//   console.log(apiKey)
//   return (
    
//      <View style={styles.container}>
//       <MapView style={styles.map} />
//     </View>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });