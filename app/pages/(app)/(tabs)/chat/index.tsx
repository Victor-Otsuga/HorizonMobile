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
  Platform,
  Image,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useViewMode } from '../../../../../context/ViewModeContext';
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
  avatar: string | any;
  isOnline: boolean;
  specialty: string;
}

interface User {
  id: string;
  name: string;
  avatar: string | any;
  isOnline: boolean;
  vehicle?: string;
}

interface Conversation {
  contact: Mechanic | User;
  lastMessage: Message;
  unreadCount: number;
  isAI?: boolean;
}

// IA Assistant
const AI_ASSISTANT: Mechanic = {
  id: 'ai_assistant',
  name: 'Hori',
  avatar: require('../../../../../assets/logo.jpg'),
  isOnline: true,
  specialty: 'Assistente Virtual',
};

// Mock de usuários
const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Carlos Mendes',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    isOnline: true,
    vehicle: 'Honda Civic 2020',
  },
  {
    id: 'u2',
    name: 'Ana Paula',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    isOnline: true,
    vehicle: 'Toyota Corolla 2019',
  },
  {
    id: 'u3',
    name: 'Roberto Alves',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    isOnline: false,
    vehicle: 'Ford Focus 2021',
  },
  {
    id: 'u4',
    name: 'Juliana Costa',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    isOnline: true,
    vehicle: 'Volkswagen Gol 2018',
  },
  {
    id: 'u5',
    name: 'Felipe Santos',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    isOnline: true,
    vehicle: 'Chevrolet Onix 2022',
  },
];

// Mock de mecânicos - Lista expandida com mais exemplos
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
  {
    id: '6',
    name: 'Roberto Martins',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    isOnline: true,
    specialty: 'Lataria e Pintura',
  },
  {
    id: '7',
    name: 'Juliana Ferreira',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    isOnline: true,
    specialty: 'Diagnóstico Eletrônico',
  },
  {
    id: '8',
    name: 'Fernando Souza',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    isOnline: false,
    specialty: 'Revisão Completa',
  },
  {
    id: '9',
    name: 'Patricia Alves',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    isOnline: true,
    specialty: 'Troca de Fluidos',
  },
  {
    id: '10',
    name: 'Rafael Costa',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    isOnline: true,
    specialty: 'Sistema de Direção',
  },
];

// Função para formatar timestamp
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays < 1) {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays < 7) {
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  } else {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }
};

// Componente de item de conversa
const ConversationItem = ({ 
  conversation, 
  onPress 
}: { 
  conversation: Conversation; 
  onPress: () => void;
}) => {
  const lastMessage = conversation.lastMessage;
  const preview = lastMessage.text.length > 50 
    ? lastMessage.text.substring(0, 50) + '...' 
    : lastMessage.text;
  const contact = conversation.contact;
  const isMechanic = 'specialty' in contact;

  const getAvatarSource = (avatar: string | any) => {
    return typeof avatar === 'string' ? { uri: avatar } : avatar;
  };

  return (
    <TouchableOpacity style={styles.conversationItem} onPress={onPress}>
      <View style={styles.conversationAvatarContainer}>
        <Image source={getAvatarSource(contact.avatar)} style={styles.conversationAvatar} />
        {contact.isOnline && <View style={styles.onlineIndicatorAbsolute} />}
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{contact.name}</Text>
          <Text style={styles.conversationTime}>{formatTime(lastMessage.timestamp)}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text style={styles.conversationPreview} numberOfLines={1}>
            {lastMessage.isMe ? 'Você: ' : ''}{preview}
          </Text>
          {conversation.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Componente de animação de digitando
const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animations = [
      animateDot(dot1, 0),
      animateDot(dot2, 200),
      animateDot(dot3, 400),
    ];

    animations.forEach((anim) => anim.start());

    return () => {
      animations.forEach((anim) => anim.stop());
    };
  }, []);

  const getOpacity = (dot: Animated.Value) => {
    return dot.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    });
  };

  return (
    <View style={styles.typingIndicator}>
      <View style={styles.typingDots}>
        <Animated.View
          style={[
            styles.typingDot,
            { opacity: getOpacity(dot1) },
          ]}
        />
        <Animated.View
          style={[
            styles.typingDot,
            { opacity: getOpacity(dot2) },
          ]}
        />
        <Animated.View
          style={[
            styles.typingDot,
            { opacity: getOpacity(dot3) },
          ]}
        />
      </View>
    </View>
  );
};

// Componente de balão de mensagem
const ChatBubble = ({ message }: { message: Message }) => {
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

// Componente de seleção de contato
const ContactSelector = ({
  contacts,
  onSelect,
  visible,
  onClose,
  title,
}: {
  contacts: (Mechanic | User)[];
  onSelect: (contact: Mechanic | User) => void;
  visible: boolean;
  onClose: () => void;
  title: string;
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isMechanic = 'specialty' in item;
              return (
                <TouchableOpacity
                  style={styles.mechanicCard}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <View style={styles.mechanicAvatarContainer}>
                    <Image 
                      source={typeof item.avatar === 'string' ? { uri: item.avatar } : item.avatar} 
                      style={styles.mechanicAvatar} 
                    />
                    <View
                      style={[
                        styles.onlineIndicator,
                        item.isOnline ? styles.onlineIndicatorActive : styles.onlineIndicatorInactive,
                      ]}
                    />
                  </View>
                  <View style={styles.mechanicInfo}>
                    <Text style={styles.mechanicName}>{item.name}</Text>
                    <Text style={styles.mechanicSpecialty}>
                      {isMechanic ? item.specialty : item.vehicle}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.startChatButton}>
                    <Ionicons name="chatbubble" size={20} color={colors.primary} />
                    <Text style={styles.startChatText}>Iniciar conversa</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default function Chat() {
  const insets = useSafeAreaInsets();
  const { mode } = useViewMode();
  const [selectedContact, setSelectedContact] = useState<Mechanic | User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const previousModeRef = useRef<string | null>(null);
  
  // Determinar lista de contatos baseado no modo
  const getContacts = (): (Mechanic | User)[] => {
    return mode === 'mechanic' ? MOCK_USERS : MOCK_MECHANICS;
  };

  // Função para salvar mensagens no storage
  const saveMessages = async (mechanicId: string, messagesToSave: Message[]) => {
    try {
      await AsyncStorage.setItem(`chat_${mechanicId}`, JSON.stringify(messagesToSave));
    } catch (error) {
      console.error('Erro ao salvar mensagens:', error);
    }
  };

  // Função para carregar mensagens do storage
  const loadMessages = async (mechanicId: string) => {
    try {
      const storedMessages = await AsyncStorage.getItem(`chat_${mechanicId}`);
      if (storedMessages) {
        return JSON.parse(storedMessages);
      }
      return null;
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      return null;
    }
  };

  // Função para carregar todas as conversas
  const loadConversations = async () => {
    try {
      const conversationsList: Conversation[] = [];
      const contacts = getContacts();
      
      // Carregar conversas com contatos
      for (const contact of contacts) {
        const messages = await loadMessages(contact.id);
        if (messages && messages.length > 0) {
          const lastMessage = messages[messages.length - 1];
          conversationsList.push({
            contact,
            lastMessage,
            unreadCount: 0,
          });
        }
      }
      
      // Carregar conversa com IA
      const aiMessages = await loadMessages(AI_ASSISTANT.id);
      if (aiMessages && aiMessages.length > 0) {
        const lastMessage = aiMessages[aiMessages.length - 1];
        conversationsList.push({
          contact: AI_ASSISTANT,
          lastMessage,
          unreadCount: 0,
          isAI: true,
        });
      }
      
      // Ordenar por timestamp mais recente
      conversationsList.sort((a, b) => 
        new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
      );
      
      setConversations(conversationsList);
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
    }
  };

  // Carregar conversas ao montar o componente
  useEffect(() => {
    loadConversations();
  }, []);

  // Limpar histórico da IA quando trocar de modo (usuário <-> mecânico)
  useEffect(() => {
    if (previousModeRef.current !== null && previousModeRef.current !== mode) {
      // Modo mudou, limpar histórico da IA
      AsyncStorage.removeItem(`chat_${AI_ASSISTANT.id}`).then(() => {
        // Se estiver conversando com a IA, limpar mensagens também
        if (selectedContact?.id === AI_ASSISTANT.id) {
          setMessages([]);
        }
        // Recarregar lista de conversas
        loadConversations();
      });
    }
    previousModeRef.current = mode;
  }, [mode]);

  // Atualizar lista de conversas quando voltar para tela principal ou mudar modo
  useEffect(() => {
    if (!selectedContact) {
      loadConversations();
    }
  }, [selectedContact, mode]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Ajustar scroll e posição quando teclado aparecer/desaparecer
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  // Salvar mensagens sempre que mudarem
  useEffect(() => {
    if (selectedContact && messages.length > 0) {
      saveMessages(selectedContact.id, messages);
    }
  }, [messages, selectedContact]);

  // Selecionar contato e carregar conversa inicial
  const handleSelectContact = async (contact: Mechanic | User) => {
    setSelectedContact(contact);
    
    // Tentar carregar mensagens salvas
    const savedMessages = await loadMessages(contact.id);
    
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      // Mensagem inicial de boas-vindas (apenas para contatos que não são IA)
      if (contact.id !== AI_ASSISTANT.id) {
        const isMechanic = 'specialty' in contact;
        const welcomeText = isMechanic 
          ? `Olá! Sou ${contact.name}. Como posso ajudar você hoje?`
          : `Olá! Sou ${contact.name}. Preciso de ajuda com meu veículo.`;
        
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: welcomeText,
          timestamp: new Date().toISOString(),
          isMe: false,
        };
        setMessages([welcomeMessage]);
      } else {
        // IA começa sem mensagem inicial
        setMessages([]);
      }
    }
  };

  // Iniciar chat com IA
  const handleStartAIChat = async () => {
    setSelectedContact(AI_ASSISTANT);
    
    // Tentar carregar mensagens salvas
    const savedMessages = await loadMessages(AI_ASSISTANT.id);
    
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      // Começar sem mensagem inicial se não houver histórico
      setMessages([]);
    }
  };

  // Função para fazer requisição à API da Hori
  const sendMessageToHori = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://horizon-n8n.jq0etc.easypanel.host/webhook/hori', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': '652116e6fb024df8b54df7a63079bf25',
        },
        body: JSON.stringify({
          msg: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao comunicar com a API: ${response.status}`);
      }

      const data = await response.json();
      // Tentar diferentes formatos de resposta
      if (typeof data === 'string') {
        return data;
      }
      return data.output || data.message || data.text || data.msg || JSON.stringify(data);
    } catch (error) {
      console.error('Erro ao enviar mensagem para Hori:', error);
      return 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.';
    }
  };

  // Função para voltar à lista de conversas
  const handleBackToConversations = async () => {
    setSelectedContact(null);
    setMessages([]);
    loadConversations();
  };

  // Enviar mensagem
  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedContact) return;

    const messageText = inputText.trim();
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toISOString(),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Mostrar indicador de digitação
    setIsTyping(true);

    // Se for a IA, fazer requisição à API
    if (selectedContact.id === AI_ASSISTANT.id) {
      try {
        const aiResponse = await sendMessageToHori(messageText);
        setIsTyping(false);
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          timestamp: new Date().toISOString(),
          isMe: false,
        };
        setMessages((prev) => [...prev, responseMessage]);
      } catch (error) {
        setIsTyping(false);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
          timestamp: new Date().toISOString(),
          isMe: false,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } else {
      // Para outros contatos, usar resposta automática simulada
      setTimeout(() => {
        setIsTyping(false);
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAutoResponse(),
          timestamp: new Date().toISOString(),
          isMe: false,
        };
        setMessages((prev) => [...prev, responseMessage]);
      }, 2000);
    }
  };

  // Gerar resposta automática simulada
  const generateAutoResponse = (): string => {
    if (!selectedContact) return 'Posso ajudar com isso.';
    
    // Resposta da IA
    if (selectedContact.id === AI_ASSISTANT.id) {
      const aiResponses = [
        'Entendi! Como posso ajudar você com isso?',
        'Interessante! Deixe-me pensar na melhor solução.',
        'Claro! Posso orientar você sobre isso.',
        'Perfeito! Vou verificar isso para você.',
        'Compreendo. Vamos resolver isso juntos!',
      ];
      return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    }
    
    // Se for usuário, não gera resposta automática
    if ('vehicle' in selectedContact) {
      return 'Obrigado pela mensagem! Vou responder em breve.';
    }
    
    // Resposta do mecânico baseada na especialidade
    const isMechanic = 'specialty' in selectedContact;
    if (!isMechanic) return 'Posso ajudar com isso.';
    
    const responses = {
      'Motor e Transmissão': [
        'Entendi! Vou verificar o sistema de transmissão.',
        'Sobre motores e transmissão, posso ajudar com isso.',
        'Deixe-me analisar o problema do motor.',
      ],
      'Elétrica Automotiva': [
        'Entendido! Vou checar a parte elétrica do veículo.',
        'Problemas elétricos são meu foco. Vamos resolver!',
        'Deixe-me verificar o sistema elétrico.',
      ],
      'Freios e Suspensão': [
        'Vou verificar o sistema de freios.',
        'Entendi! Vou checar freios e suspensão.',
        'Deixe-me analisar o sistema de suspensão.',
      ],
      'Ar Condicionado': [
        'Vou verificar o sistema de ar condicionado.',
        'Entendi! Problemas de ar condicionado são minha especialidade.',
        'Deixe-me checar o equipamento de refrigeração.',
      ],
      'Injeção Eletrônica': [
        'Vou fazer um diagnóstico no sistema de injeção.',
        'Entendi! Vou verificar a injeção eletrônica.',
        'Deixe-me checar o sistema de injeção eletrônica.',
      ],
      'Lataria e Pintura': [
        'Vou avaliar o dano na lataria.',
        'Entendi! Vou verificar a pintura e lataria.',
        'Deixe-me analisar o reparo na lataria.',
      ],
      'Diagnóstico Eletrônico': [
        'Vou fazer uma varredura eletrônica completa.',
        'Entendi! Vou diagnosticar os sistemas eletrônicos.',
        'Deixe-me conectar o scanner para diagnóstico.',
      ],
      'Revisão Completa': [
        'Vou fazer uma revisão completa do veículo.',
        'Entendi! Vou verificar todos os sistemas.',
        'Deixe-me fazer uma inspeção completa.',
      ],
      'Troca de Fluidos': [
        'Vou verificar e trocar os fluidos necessários.',
        'Entendi! Vou checar os níveis de fluidos.',
        'Deixe-me trocar os fluidos do sistema.',
      ],
      'Sistema de Direção': [
        'Vou verificar o sistema de direção.',
        'Entendi! Vou checar a geometria da direção.',
        'Deixe-me analisar o sistema de direção.',
      ],
      default: [
        'Entendi! Posso ajudar com isso.',
        'Interessante! Vou verificar isso para você.',
        'Obrigado pela informação. Como posso prosseguir?',
        'Claro! Posso orientar você sobre isso.',
        'Perfeito! Deixe-me pensar na melhor solução.',
      ],
    };

    const mechanicResponses = responses[(selectedContact as Mechanic).specialty as keyof typeof responses] || responses.default;
    return mechanicResponses[Math.floor(Math.random() * mechanicResponses.length)];
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedContact ? (
          <View style={styles.chatContainer}>
            {/* Cabeçalho da conversa */}
            <View style={styles.chatHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackToConversations}
              >
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <View style={styles.chatHeaderInfo}>
                <Image
                  source={
                    typeof selectedContact.avatar === 'string'
                      ? { uri: selectedContact.avatar }
                      : selectedContact.avatar
                  }
                  style={styles.headerAvatar}
                />
                <View>
                  <Text style={styles.headerName}>{selectedContact.name}</Text>
                  <Text style={styles.headerStatus}>
                    {selectedContact.id === AI_ASSISTANT.id
                      ? '🤖 Hori'
                      : selectedContact.isOnline
                      ? '🟢 Online'
                      : '⚪ Offline'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.changeMechanicButton}
                onPress={() => setIsModalVisible(true)}
              >
                <Ionicons name="people" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
  
            {/* Lista de mensagens */}
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ChatBubble message={item} />}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={isTyping ? <TypingIndicator /> : null}
              keyboardShouldPersistTaps="handled"
            />
  
            {/* Input de mensagem */}
            <View style={[
              styles.inputContainer, 
              { 
                bottom: keyboardHeight > 0 
                  ? keyboardHeight + 70
                  : 70 + insets.bottom,
                paddingBottom: keyboardHeight > 0 ? (Platform.OS === 'ios' ? 10 : insets.bottom + 10) : insets.bottom + 5
              }
            ]}>
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
                style={[
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled,
                ]}
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
          </View>
      ) : (
        <>
          <View style={styles.conversationsHeader}>
            <Text style={styles.conversationsHeaderText}>Conversas</Text>
          </View>
          {conversations.length > 0 ? (
            <FlatList
              data={conversations}
              keyExtractor={(item) => item.contact.id}
              renderItem={({ item }) => (
                <ConversationItem
                  conversation={item}
                  onPress={() => handleSelectContact(item.contact)}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.conversationsList}
            />
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIcon}>
                <Ionicons
                  name="chatbubbles-outline"
                  size={80}
                  color={colors.textLight}
                />
              </View>
              <Text style={styles.emptyStateTitle}>Nenhuma conversa ainda</Text>
              <Text style={styles.emptyStateText}>
                Toque no botão abaixo para iniciar uma conversa com um mecânico
                disponível
              </Text>
            </View>
          )}
  
          {/* Botões flutuantes */}
          <TouchableOpacity style={styles.fabAI} onPress={handleStartAIChat}>
            <Ionicons name="sparkles" size={28} color="#fff" />
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="chatbubble" size={28} color="#fff" />
          </TouchableOpacity>
        </>
      )}
  
      {/* Modal de seleção de contato */}
      <ContactSelector
        contacts={getContacts()}
        onSelect={handleSelectContact}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={
          mode === 'mechanic'
            ? 'Selecione um usuário'
            : 'Selecione um mecânico'
        }
      />
    </SafeAreaView>
  );  
}