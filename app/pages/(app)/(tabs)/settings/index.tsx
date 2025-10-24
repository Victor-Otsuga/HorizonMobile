import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';

import { useRouter } from 'expo-router';
import { useViewMode } from '../../../../../context/ViewModeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { mode, toggle } = useViewMode();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/4.jpg' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Victor Otsuga</Text>
          <Text style={styles.id}>#PIK12897</Text>
        </View>
      </View>

      <Pressable style={styles.option} onPress={() => router.push('pages/settings/profile')}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>👤</Text>
        </View>
        <Text style={styles.optionText}>Perfil da Conta</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={() => router.push('/profile/billing')}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>💳</Text>
        </View>
        <Text style={styles.optionText}>Faturamento</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={() => router.push('/profile/password')}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🔒</Text>
        </View>
        <Text style={styles.optionText}>Alterar Senha</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={() => router.push('/profile/notifications')}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🔔</Text>
        </View>
        <Text style={styles.optionText}>Notificações</Text>
      </Pressable>

      <Pressable style={styles.option} onPress={toggle}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🔁</Text>
        </View>
        <Text style={styles.optionText}>Modo: {mode === 'user' ? 'Usuário' : 'Mecânico'}</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={() => console.log('Logout')}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
    </View>
  );
}
