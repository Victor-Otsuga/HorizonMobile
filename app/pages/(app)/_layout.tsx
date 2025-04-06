import { Slot, useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function AppLayout() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace('/sign-in');
    }
  }, [session, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
