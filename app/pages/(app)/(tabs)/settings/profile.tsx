import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Profile() {
  interface UserProfile {
    fullName: string;
    email: string;
    dateOfBirth: string;
    profileImage: string;
  }

  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'Victor Otsuga',
    email: 'mockemail@email.com',
    dateOfBirth: '3 de mar, 2004',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
  });

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate('pages/settings')} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Perfil da Conta</Text>
      <View style={styles.avatarLarge}>
        <Image source={{ uri: profile.profileImage }} style={styles.avatarProfile} />
      </View>
  
      <Text style={styles.linkText}>Alterar foto do perfil</Text>

      <Text style={styles.label}>Nome completo</Text>
      <TextInput
        style={styles.input}
        value={profile.fullName}
        onChangeText={(text) => handleInputChange('fullName', text)}
      />

      <Text style={styles.label}>Endereço de e-mail</Text>
      <TextInput
        style={styles.input}
        value={profile.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Data de nascimento</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={profile.dateOfBirth}
          onChangeText={(text) => handleInputChange('dateOfBirth', text)}
        />
        <Ionicons name="calendar-outline" size={24} color="#999" style={styles.calendarIcon} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Atualizar perfil</Text>
      </TouchableOpacity>
    </View>
  );
}
