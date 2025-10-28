import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import colors from '../../../../theme/colors';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

// Tipos
interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

interface Mechanic {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  specialty: string;
}

// Mock de mecânicos
const MOCK_MECHANICS: Mechanic[] = [
  {
    id: '1',
    name: 'João Silva',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    isOnline: true,
    specialty: 'Motor e Transmissão',
  },
  {
    id: '2',
    name: 'Maria Santos',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    isOnline: true,
    specialty: 'Elétrica Automotiva',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    isOnline: false,
    specialty: 'Freios e Suspensão',
  },
  {
    id: '4',
    name: 'Ana Costa',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    isOnline: true,
    specialty: 'Ar Condicionado',
  },
  {
    id: '5',
    name: 'Pedro Lima',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    isOnline: true,
    specialty: 'Injeção Eletrônica',
  },
];

// Componente de balão de mensagem
const ChatBubble = ({ message }: { message: Message }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View
      style={[
        styles.chatBubble,
        message.isMe ? styles.chatBubbleMe : styles.chatBubbleOther,
      ]}
    >
      <Text style={message.isMe ? styles.chatBubbleTextMe : styles.chatBubbleTextOther}>
        {message.text}
      </Text>
      <Text
        style={[
          styles.chatBubbleTime,
          message.isMe ? styles.chatBubbleTimeMe : styles.chatBubbleTimeOther,
        ]}
      >
        {formatTime(message.timestamp)}
      </Text>
    </View>
  );
};

// Componente de seleção de mecânico
const MechanicSelector = ({
  mechanics,
  onSelect,
  visible,
  onClose,
}: {
  mechanics: Mechanic[];
  onSelect: (mechanic: Mechanic) => void;
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecione um mecânico</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={mechanics}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.mechanicCard}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <View style={styles.mechanicAvatarContainer}>
                  <Image source={{ uri: item.avatar }} style={styles.mechanicAvatar} />
                  <View
                    style={[
                      styles.onlineIndicator,
                      item.isOnline ? styles.onlineIndicatorActive : styles.onlineIndicatorInactive,
                    ]}
                  />
                </View>
                <View style={styles.mechanicInfo}>
                  <Text style={styles.mechanicName}>{item.name}</Text>
                  <Text style={styles.mechanicSpecialty}>{item.specialty}</Text>
                </View>
                <TouchableOpacity style={styles.startChatButton}>
                  <Ionicons name="chatbubble" size={20} color={colors.primary} />
                  <Text style={styles.startChatText}>Iniciar conversa</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default function Chat() {
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Selecionar mecânico e carregar conversa inicial
  const handleSelectMechanic = (mechanic: Mechanic) => {
    setSelectedMechanic(mechanic);
    // Mensagem inicial de boas-vindas
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Olá! Sou ${mechanic.name}. Como posso ajudar você hoje?`,
      timestamp: new Date().toISOString(),
      isMe: false,
    };
    setMessages([welcomeMessage]);
  };

  // Enviar mensagem
  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedMechanic) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      timestamp: new Date().toISOString(),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Simular resposta automática do mecânico
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAutoResponse(),
        timestamp: new Date().toISOString(),
        isMe: false,
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
  };

  // Gerar resposta automática simulada
  const generateAutoResponse = (): string => {
    const responses = [
      'Entendi! Posso ajudar com isso.',
      'Interessante! Vou verificar isso para você.',
      'Obrigado pela informação. Como posso prosseguir?',
      'Claro! Posso orientar você sobre isso.',
      'Perfeito! Deixe-me pensar na melhor solução.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedMechanic ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.chatContainer}
        >
          {/* Cabeçalho da conversa */}
          <View style={styles.chatHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedMechanic(null)}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.chatHeaderInfo}>
              <Image source={{ uri: selectedMechanic.avatar }} style={styles.headerAvatar} />
              <View>
                <Text style={styles.headerName}>{selectedMechanic.name}</Text>
                <Text style={styles.headerStatus}>
                  {selectedMechanic.isOnline ? '🟢 Online' : '⚪ Offline'}
                </Text>
              </View>
            </View>
          </View>

          {/* Lista de mensagens */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
          />

          {/* Input de mensagem */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Digite sua mensagem..."
              placeholderTextColor={colors.textLight}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <Ionicons
                name="send"
                size={24}
                color={inputText.trim() ? '#fff' : colors.textLight}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyStateIcon}>
            <Ionicons name="chatbubbles-outline" size={80} color={colors.textLight} />
          </View>
          <Text style={styles.emptyStateTitle}>Selecione um mecânico</Text>
          <Text style={styles.emptyStateText}>
            Toque no botão abaixo para iniciar uma conversa com um mecânico disponível
          </Text>
        </View>
      )}

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="chatbubble" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal de seleção de mecânico */}
      <MechanicSelector
        mechanics={MOCK_MECHANICS}
        onSelect={handleSelectMechanic}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}