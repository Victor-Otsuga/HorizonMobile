import Colors from "../../../theme/colors"; // importa o arquivo global
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      backgroundColor: "#fff",
      flex: 1,
      justifyContent: "center",
    },
    backBtn: {
      position: "absolute",
      top: 60,
      left: 20,
    },
    backArrow: {
      fontSize: 22,
      color: Colors.primary,
    },
    title: {
      fontSize: 26,
      fontWeight: "700",
      color: Colors.primary,
      marginBottom: 6,
    },
    emoji: {
      fontSize: 26,
    },
    subtitle: {
      color: Colors.secondary,
      marginBottom: 40,
    },
    label: {
      fontWeight: "700",
      color: Colors.primary,
      marginBottom: 8,
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 12,
      padding: 14,
      fontSize: 14,
      color: Colors.primary,
    },
    registerButton: {
      backgroundColor: Colors.primary,
      padding: 16,
      borderRadius: 20,
      alignItems: "center",
      marginTop: 40,
    },
    registerButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    separatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 24,
    },
    separatorLine: {
      flex: 1,
      height: 1,
      backgroundColor: Colors.border,
    },
    separatorText: {
      marginHorizontal: 12,
      color: Colors.secondary,
    },
    socialButtons: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
    },
    socialIcon: {
      width: 48,
      height: 48,
      marginHorizontal: 10,
    },
    loginText: {
      textAlign: "center",
      marginTop: 30,
      color: Colors.secondary,
    },
    loginLink: {
      color: Colors.primary,
      fontWeight: "700",
    },
  });

  export default styles;