import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ViewModeProvider } from '../context/ViewModeContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ViewModeProvider>
        <Slot />
      </ViewModeProvider>
    </AuthProvider>
  );
}
