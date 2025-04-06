import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import styles from "./styles";
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      

      <Text style={styles.title}>
        Seja bem vindo! <Text style={styles.emoji}>😉</Text>
      </Text>
      <Text style={styles.subtitle}>É sua primeira vez na Horizon.</Text>

      <Text style={styles.label}>Nome completo</Text>
      <TextInput style={styles.input} placeholder="Seu nome completo" />

      <Text style={styles.label}>Endereço de Email</Text>
      <TextInput style={styles.input} placeholder="Seu endereço de email" />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton}>
        <Text onPress={() => router.navigate('pages/forgot')} style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>



      <Text style={styles.loginText}>
        Já tem uma conta na Horizon? <Text onPress={() => router.navigate('pages/login')} style={styles.loginLink}>Login</Text>
      </Text>
    </View>
  );
}