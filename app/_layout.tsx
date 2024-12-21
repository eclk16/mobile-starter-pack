import '../global.css';
import { useEffect, useMemo } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { useAuthStore } from '../store/store';
import firebase from '~/utils/firebase';

export const unstable_settings = {
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  // const { setUser, setLoading } = useAuthStore();
  // const firebaseInstance = useMemo(() => {
  //   return firebase;
  // }, []);
  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged((user) => {
  //     console.log('user', user);
  //     setUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, [firebase]);

  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
