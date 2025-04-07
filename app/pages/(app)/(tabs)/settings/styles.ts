import { StyleSheet } from 'react-native';
import colors from '../../../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignSelf: 'center',
    alignContent: 'center',
    
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  avatarProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  linkText: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 24,
  },
  label: {
    color: colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    color: colors.text,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  calendarIcon: {
    position: 'absolute',
    right: 12,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 16,
    marginBottom: 32,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  id: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  logoutButton: {
    marginTop: 48,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
