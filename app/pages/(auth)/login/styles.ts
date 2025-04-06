import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
    },
    welcome: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 8,
    },
    subtitle: {
      color: colors.secondary,
      marginBottom: 32,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 6,
      color: colors.primary,
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      marginBottom: 20,
    },
    inputPassword: {
      flex: 1,
      paddingVertical: 16,
    },
    loginButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    loginText: {
      color: colors.background,
      fontWeight: '600',
      fontSize: 16,
    },
    forgotText: {
      color: colors.secondary,
      alignSelf: 'flex-end',
      marginBottom: 30,
    },
    orContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: colors.line,
    },
    orText: {
      marginHorizontal: 12,
      color: colors.secondary,
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 24,
    },
    socialIcon: {
      borderWidth: 1,
      borderColor: colors.line,
      padding: 12,
      borderRadius: 100,
      marginHorizontal: 10,
    },
    iconImage: {
      width: 24,
      height: 24,
    },
    registerText: {
      textAlign: 'center',
      color: colors.secondary,
    },
    registerLink: {
      color: colors.primary,
      fontWeight: 'bold',
    },
  });

  export default styles;