import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../../context/AuthContext';


export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    await signIn(email, password);
    router.navigate('pages/dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem vindo ao Horizon</Text>
      <Text style={styles.subtitle}>Insira seu Email e Senha para continuar.</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Seu endereço de email"
        placeholderTextColor="#A9A9A9"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Sua senha"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons name="eye-outline" size={20} color="#888" />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text onPress={() => router.navigate('pages/forgot')} style={styles.forgotText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

  
      

      <Text style={styles.registerText}>
        Ainda não possui uma conta?{' '}
        <Text onPress={() => router.navigate('pages/register')} style={styles.registerLink}>
          Registre-se
        </Text>
      </Text>
    </View>
  );
}
