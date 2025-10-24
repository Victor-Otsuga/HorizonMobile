import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Modal } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import CircularProgress from '../../../../components/CircularProgress';
import QRCodeScanner from 'expo-qrcode-scanner';
import styles from './styles';
import { useViewMode } from '../../../../../context/ViewModeContext';

export default function Plus() {
  const { mode } = useViewMode();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scannerLoading, setScannerLoading] = useState(false);
  const [scannerErrorMessage, setScannerErrorMessage] = useState<string | null>(null);
  const [CameraComponent, setCameraComponent] = useState<any | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [manualInputValue, setManualInputValue] = useState('');

  // Reset scanner state when switching modes
  useEffect(() => {
    setHasPermission(null);
    setScanned(false);
    setScannedData(null);
    setScannerErrorMessage(null);
    setScannerLoading(false);
  }, [mode]);

  // auto-activate scanner when entering mechanic mode
  useEffect(() => {
    if (mode === 'mechanic') {
      activateScanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleScanSuccess = (scanData: any) => {
    setScanned(true);
    setScannedData(scanData?.data ?? (typeof scanData === 'string' ? scanData : JSON.stringify(scanData)));
    setScannerErrorMessage(null);
  };

  const handleScanFail = (scanData: any) => {
    setScannerErrorMessage('Falha ao ler o código. Tente novamente.');
  };

  const activateScanner = async () => {
    setScannerLoading(true);
    setScannerErrorMessage(null);
    try {
  // Use static QRCodeScanner import. Assume native module is present in the running client.
  setHasPermission(true);
  setPermissionStatus('granted');
    } catch (e) {
      setCameraComponent(null);
      setHasPermission(false);
  setScannerErrorMessage('Scanner não disponível. Verifique se o cliente nativo inclui o módulo de barcode.');
    } finally {
      setScannerLoading(false);
    }
  };
  // mechanic view should contain only the QR viewer
  if (mode === 'mechanic') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={[styles.card, { alignItems: 'center', justifyContent: 'center', height: 420 }]}> 
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Leitor de QR</Text>
            {hasPermission === null && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginBottom: 8 }}>Scanner inativo</Text>
                <TouchableOpacity onPress={activateScanner} style={styles.ctaButton} disabled={scannerLoading}>
                  <Text style={styles.ctaText}>{scannerLoading ? 'Ativando...' : 'Ativar scanner'}</Text>
                </TouchableOpacity>
                {scannerErrorMessage ? <Text style={{ marginTop: 8 }}>{scannerErrorMessage}</Text> : null}
              </View>
            )}

              {hasPermission === false && (
                <View style={{ alignItems: 'center' }}>
                  <Text>Permissão de câmera negada. Ative nas configurações.</Text>
                  {permissionStatus ? <Text style={{ marginTop: 6 }}>Status: {permissionStatus}</Text> : null}
                  <TouchableOpacity
                    style={[styles.ctaButton, { marginTop: 8 }]}
                    onPress={() => Linking.openSettings()}
                  >
                    <Text style={styles.ctaText}>Abrir configurações</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.secondaryButton, { marginTop: 8 }]}
                    onPress={() => setManualModalVisible(true)}
                  >
                    <Text style={styles.secondaryText}>Inserir código manualmente</Text>
                  </TouchableOpacity>
                </View>
              )}
            
            {hasPermission === true && !scanned && (
              <View style={{ width: 320, height: 320, borderRadius: 8, overflow: 'hidden' }}>
                <QRCodeScanner
                  onScanSuccess={handleScanSuccess}
                  onScanFail={handleScanFail}
                  toleranceFactor={0.5}
                  minSize={80}
                  maxSize={400}
                  scanningInfinitely={false}
                  // style prop is passed through to the internal BarCodeScanner
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            )}

            {scanned && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginBottom: 8 }}>Resultado: {scannedData ?? '—'}</Text>
                <TouchableOpacity onPress={() => { setScanned(false); setScannedData(null); }} style={styles.ctaButton}>
                  <Text style={styles.ctaText}>Escanear novamente</Text>
                </TouchableOpacity>
              </View>
            )}
            <Modal visible={manualModalVisible} animationType="slide" transparent>
              <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '90%', backgroundColor: '#fff', padding: 16, borderRadius: 12 }}>
                  <Text style={{ fontWeight: '700', marginBottom: 8 }}>Inserir código QR</Text>
                  <TextInput
                    value={manualInputValue}
                    onChangeText={setManualInputValue}
                    placeholder="Cole o conteúdo do QR aqui"
                    style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, marginBottom: 12 }}
                    multiline
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { setManualModalVisible(false); setManualInputValue(''); }} style={[styles.secondaryButton, { marginRight: 8 }]}>
                      <Text style={styles.secondaryText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setScanned(true); setScannedData(manualInputValue); setManualModalVisible(false); }} style={styles.ctaButton}>
                      <Text style={styles.ctaText}>Usar código</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // user view: single car image + vehicle info, status and CTA
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Single car image / 3D placeholder */}
        <View style={styles.card}>
          <View style={styles.modelPlaceholder}>
            <Image source={require('../../../../../assets/civic.png')} style={styles.modelImage} resizeMode="cover" />
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
              <CircularProgress size={68} strokeWidth={6} progress={85} color={styles.ctaButton.backgroundColor || '#2ecc71'} bgColor="#e6f4ea">
                <Text style={styles.statusPercent}>85%</Text>
              </CircularProgress>
              <Text style={styles.statusLabel}>Bateria</Text>
            </View>
            <View style={styles.statusItem}>
              <CircularProgress size={68} strokeWidth={6} progress={65} color="#f39c12" bgColor="#fff5e6">
                <Text style={styles.statusPercent}>65%</Text>
              </CircularProgress>
              <Text style={styles.statusLabel}>Óleo</Text>
            </View>
            <View style={styles.statusItem}>
              <CircularProgress size={68} strokeWidth={6} progress={90} color={styles.ctaButton.backgroundColor || '#2ecc71'} bgColor="#e6f4ea">
                <Text style={styles.statusPercent}>90%</Text>
              </CircularProgress>
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
      </ScrollView>
    </SafeAreaView>
  );
}