import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import CircularProgress from '../../../../components/CircularProgress';
import styles from './styles';
import { useViewMode } from '../../../../../context/ViewModeContext';

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [manualInputValue, setManualInputValue] = useState('');
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [carInfo, setCarInfo] = useState<any>(null);
  const [infoVisible, setInfoVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    // só escaneia se a view de info não estiver aberta
    if (!infoVisible && data !== scannedData) {
      setScannedData(data);
      fetchCarData(data);
    }
  };

  const fetchCarData = async (qrData: string) => {
    setLoadingInfo(true);
    setCarInfo(null);
    setInfoVisible(true);

    try {
      // Simula uma chamada à API
      await new Promise((r) => setTimeout(r, 1000));

      const fakeData = {
        model: 'Honda Civic EX',
        plate: 'XYZ-9876',
        year: '2019/2020',
        km: '82.300 km',
        fuel: 'Flex',
        transmission: 'Automático',
        engine: '2.0',
        lastRevision: '14/08/2024',
        nextRevision: '12/02/2025',
        alerts: [
          { title: 'Próxima troca de óleo', detail: 'em 1.200 km' },
          { title: 'Revisão de freios', detail: 'recomendada' },
          { title: 'IPVA 2025', detail: 'pago' },
        ],
      };

      setCarInfo(fakeData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInfo(false);
    }
  };

  const handleConfirmVisit = () => {
    Alert.alert('Visita confirmada', `Visita registrada para ${carInfo?.model || 'veículo desconhecido'}`);
    setInfoVisible(false);
    setScannedData(null);
    setCarInfo(null);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: infoVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [infoVisible]);

  if (!permission) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Verificando permissões...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Permissão de câmera negada.</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: '#007AFF',
            padding: 12,
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Conceder permissão</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Câmera sempre ativa */}
      <CameraView
        style={{ flex: 1, zIndex: 0 }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      {/* Texto de instrução */}
      {!infoVisible && (
        <View
          style={{
            position: 'absolute',
            top: 40,
            alignSelf: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 12,
            zIndex: 2,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
            Aponte a câmera para o QR do veículo
          </Text>
        </View>
      )}

      {/* Painel de informações do veículo */}
      {infoVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '70%',
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0],
                }),
              },
            ],
            elevation: 20,
            zIndex: 3,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 10,
          }}
        >
          {/* Botão de fechar */}
          <TouchableOpacity
            onPress={() => {
              setScannedData(null);
              setCarInfo(null);
              setInfoVisible(false);
              setManualInputValue('');
            }}
            style={{
              position: 'absolute',
              top: 10,
              right: 15,
              zIndex: 5,
              backgroundColor: '#eee',
              borderRadius: 20,
              padding: 6,
            }}
          >
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {loadingInfo ? (
              <View style={{ alignItems: 'center', padding: 20 }}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>Carregando informações...</Text>
              </View>
            ) : carInfo ? (
              <>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 4 }}>
                  {carInfo.model}
                </Text>
                <Text style={{ color: '#666', marginBottom: 10 }}>
                  {carInfo.year} • {carInfo.plate}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text>KM: {carInfo.km}</Text>
                  <Text>Motor: {carInfo.engine}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Combustível: {carInfo.fuel}</Text>
                  <Text>Câmbio: {carInfo.transmission}</Text>
                </View>

                <View style={{ marginTop: 12 }}>
                  <Text>Última revisão: {carInfo.lastRevision}</Text>
                  <Text>Próxima revisão: {carInfo.nextRevision}</Text>
                </View>

                <Text style={{ marginTop: 16, fontWeight: '700', fontSize: 16 }}>
                  Alertas e status
                </Text>
                {carInfo.alerts.map((a: any, i: number) => (
                  <View
                    key={i}
                    style={{
                      marginTop: 8,
                      backgroundColor: '#f9f9f9',
                      padding: 10,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#eee',
                    }}
                  >
                    <Text style={{ fontWeight: '600' }}>{a.title}</Text>
                    <Text style={{ color: '#555' }}>{a.detail}</Text>
                  </View>
                ))}

                {/* Botão Confirmar Visita */}
                <TouchableOpacity
                  onPress={handleConfirmVisit}
                  style={{
                    marginTop: 20,
                    backgroundColor: '#28a745',
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>Confirmar Visita</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={{ textAlign: 'center' }}>Nenhum dado encontrado.</Text>
            )}
          </ScrollView>
        </Animated.View>
      )}

      {/* Botão manual */}
      <TouchableOpacity
        onPress={() => setManualModalVisible(true)}
        style={{
          position: 'absolute',
          right: 16,
          bottom: infoVisible ? 300 : 40,
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 50,
          elevation: 3,
          zIndex: 2,
        }}
      >
       
      </TouchableOpacity>

      {/* Modal para inserção manual */}
      <Modal visible={manualModalVisible} animationType="slide" transparent>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '90%', backgroundColor: '#fff', padding: 16, borderRadius: 12 }}>
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Inserir código QR</Text>
            <TextInput
              value={manualInputValue}
              onChangeText={setManualInputValue}
              placeholder="Cole o conteúdo do QR aqui"
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                padding: 8,
                marginBottom: 12,
              }}
              multiline
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  setManualModalVisible(false);
                  setManualInputValue('');
                }}
                style={{ marginRight: 8, padding: 8 }}
              >
                <Text style={{ color: '#666' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setScannedData(manualInputValue);
                  fetchCarData(manualInputValue);
                  setManualModalVisible(false);
                }}
                style={{
                  padding: 10,
                  backgroundColor: '#007AFF',
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#fff' }}>Usar código</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
