import { Slot, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet } from 'react-native';


export default function AppLayout() {
  // const { session, isLoading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !session) {
  //     router.replace('/sign-in');
  //   }
  // }, [session, isLoading]);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // return <Slot />;

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});