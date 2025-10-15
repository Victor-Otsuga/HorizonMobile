import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token/session on app start
    AsyncStorage.getItem('userToken').then(token => {
      if (token) setUser({ token });
    });
  }, []);

  const signIn = async (email, password) => {
    // Replace with your real authentication logic
    const token = 'mocked-token'; // Get token from API
    await AsyncStorage.setItem('userToken', token);
    setUser({ token });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
