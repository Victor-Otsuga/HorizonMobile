import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        Esqueceu a senha? <Text style={styles.emoji}>🔓</Text>
      </Text>
      <Text style={styles.subtitle}>
        Informe seu email para recuperar sua conta Horizon.
      </Text>

      <Text style={styles.label}>Endereço de Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu endereço de email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Recuperar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
