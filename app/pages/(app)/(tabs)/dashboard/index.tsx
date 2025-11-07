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
  ScrollView,
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

{
    id: 'm1',
    name: 'Auto Center Butantã',
    address: 'Butantã, São Paulo',
    latitude: -23.5405,
    longitude: -46.7280,
    phone: '+55 11 99999-3001',
    note: 'Revisão completa e injeção eletrônica',
  },
  {
    id: 'm2',
    name: 'Mecânica Vila Sônia',
    address: 'Vila Sônia, São Paulo',
    latitude: -23.5660,
    longitude: -46.7375,
    phone: '+55 11 99999-3002',
    note: 'Freios, suspensão e alinhamento',
  },
  {
    id: 'm3',
    name: 'PowerCar Garage',
    address: 'Jaguaré, São Paulo',
    latitude: -23.5420,
    longitude: -46.7440,
    phone: '+55 11 99999-3003',
    note: 'Performance e preparação de motores',
  },
  {
    id: 'm4',
    name: 'Torque Motors',
    address: 'Vila Leopoldina, São Paulo',
    latitude: -23.5270,
    longitude: -46.7285,
    phone: '+55 11 99999-3004',
    note: 'Diagnóstico avançado e reparos elétricos',
  },
  {
    id: 'm5',
    name: 'SpeedMax Auto',
    address: 'Morumbi, São Paulo',
    latitude: -23.6000,
    longitude: -46.7220,
    phone: '+55 11 99999-3005',
    note: 'Troca de óleo e serviços rápidos',
  },
  {
    id: 'm6',
    name: 'Dr. Motor',
    address: 'Rio Pequeno, São Paulo',
    latitude: -23.5340,
    longitude: -46.7570,
    phone: '+55 11 99999-3006',
    note: 'Mecânica geral e ar-condicionado',
  },
  {
    id: 'm7',
    name: 'Pit Stop Garage',
    address: 'Pinheiros, São Paulo',
    latitude: -23.5665,
    longitude: -46.7010,
    phone: '+55 11 99999-3007',
    note: 'Atendimento rápido e manutenção preventiva',
  },
  {
    id: 'm8',
    name: 'AutoPrime',
    address: 'Cidade Jardim, São Paulo',
    latitude: -23.5850,
    longitude: -46.7135,
    phone: '+55 11 99999-3008',
    note: 'Troca de pneus e balanceamento',
  },
  {
    id: 'm9',
    name: 'FullCar Service',
    address: 'Raposo Tavares, São Paulo',
    latitude: -23.5510,
    longitude: -46.7640,
    phone: '+55 11 99999-3009',
    note: 'Serviços completos e garantia estendida',
  },
  {
    id: 'm10',
    name: 'TopGear Auto Center',
    address: 'Jardim Guedala, São Paulo',
    latitude: -23.5740,
    longitude: -46.7230,
    phone: '+55 11 99999-3010',
    note: 'Reparo de motor e câmbio',
  },
  {
    id: 'm11',
    name: 'Rota 46 Garage',
    address: 'Pinheiros, São Paulo',
    latitude: -23.5632,
    longitude: -46.7085,
    phone: '+55 11 99999-3101',
    note: 'Mecânica completa e revisão rápida',
  },
  {
    id: 'm12',
    name: 'Alto Torque Motors',
    address: 'Vila Madalena, São Paulo',
    latitude: -23.5470,
    longitude: -46.6928,
    phone: '+55 11 99999-3102',
    note: 'Injeção eletrônica e câmbio automático',
  },
  {
    id: 'm13',
    name: 'Oficina Lapa Auto',
    address: 'Lapa, São Paulo',
    latitude: -23.5245,
    longitude: -46.7040,
    phone: '+55 11 99999-3103',
    note: 'Reparos rápidos e alinhamento',
  },
  {
    id: 'm14',
    name: 'MotorPro Service',
    address: 'Jaguaré, São Paulo',
    latitude: -23.5310,
    longitude: -46.7320,
    phone: '+55 11 99999-3104',
    note: 'Diagnóstico avançado e elétrica automotiva',
  },
  {
    id: 'm15',
    name: 'Garage Perdizes',
    address: 'Perdizes, São Paulo',
    latitude: -23.5348,
    longitude: -46.6735,
    phone: '+55 11 99999-3105',
    note: 'Suspensão, embreagem e troca de óleo',
  },
  {
    id: 'm16',
    name: 'AutoLine Express',
    address: 'Água Branca, São Paulo',
    latitude: -23.5230,
    longitude: -46.6830,
    phone: '+55 11 99999-3106',
    note: 'Atendimento expresso e manutenção preventiva',
  },
  {
    id: 'm17',
    name: 'Elite Car Service',
    address: 'Sumaré, São Paulo',
    latitude: -23.5535,
    longitude: -46.6885,
    phone: '+55 11 99999-3107',
    note: 'Serviço premium e revisão geral',
  },
  {
    id: 'm18',
    name: 'Oficina Alfa',
    address: 'Vila Leopoldina, São Paulo',
    latitude: -23.5198,
    longitude: -46.7330,
    phone: '+55 11 99999-3108',
    note: 'Motor, câmbio e escapamento',
  },
  {
    id: 'm19',
    name: 'Centro Automotivo Sumaré',
    address: 'Sumarezinho, São Paulo',
    latitude: -23.5468,
    longitude: -46.7012,
    phone: '+55 11 99999-3109',
    note: 'Troca de pneus e balanceamento',
  },
  {
    id: 'm20',
    name: 'TopAuto Brasil',
    address: 'Pompéia, São Paulo',
    latitude: -23.5305,
    longitude: -46.6880,
    phone: '+55 11 99999-3110',
    note: 'Revisões, alinhamento e freios',
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
  const appointments = [
    { time: '09:00', client: 'João', service: 'Troca de óleo', price: 180 },
    { time: '10:30', client: 'Maria', service: 'Alinhamento', price: 120 },
    { time: '12:00', client: 'Pedro', service: 'Revisão geral', price: 350 },
    { time: '13:30', client: 'Carlos', service: 'Freios', price: 200 },
  ];

  const totalRevenue = appointments.reduce((sum, a) => sum + a.price, 0);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, paddingTop:39, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 16 }}>Painel do Mecânico</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 12,
            marginRight: 8,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>Serviços hoje</Text>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#007AFF' }}>{appointments.length}</Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 12,
            marginLeft: 8,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>Receita estimada</Text>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#28a745' }}>
            R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Próximos atendimentos</Text>

      <ScrollView>
        {appointments.map((a, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              elevation: 2,
            }}
          >
            <View>
              <Text style={{ fontWeight: '700', fontSize: 16 }}>{a.client}</Text>
              <Text style={{ color: '#555' }}>{a.service}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: '700', fontSize: 16 }}>{a.time}</Text>
              <Text style={{ color: '#28a745', fontWeight: '600' }}>R$ {a.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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