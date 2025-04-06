import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  session: string | null;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadSession = async () => {
      const storedSession = await AsyncStorage.getItem('session');
      setSession(storedSession);
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const signIn = async () => {
    
    const userSession = 'token_de_autenticacao';
    await AsyncStorage.setItem('session', userSession);
    setSession(userSession);
    router.replace('/(app)/');
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('session');
    setSession(null);
    router.replace('/sign-in');
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
