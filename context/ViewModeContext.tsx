import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ViewMode = 'user' | 'mechanic';

type ViewModeContextType = {
  mode: ViewMode;
  toggle: () => void;
  setMode: (m: ViewMode) => void;
};

const KEY = 'viewMode';

const ViewModeContext = createContext<ViewModeContextType>({
  mode: 'user',
  toggle: () => {},
  setMode: () => {},
});

export const ViewModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<ViewMode>('user');

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem(KEY);
        if (v === 'mechanic' || v === 'user') setModeState(v);
      } catch (e) {}
    })();
  }, []);

  const setMode = async (m: ViewMode) => {
    setModeState(m);
    try { await AsyncStorage.setItem(KEY, m); } catch (e) {}
  };

  const toggle = () => setMode(mode === 'user' ? 'mechanic' : 'user');

  return (
    <ViewModeContext.Provider value={{ mode, toggle, setMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => useContext(ViewModeContext);
