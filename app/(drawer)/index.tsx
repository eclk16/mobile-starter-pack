import { Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { signInAnonymously } from '~/utils/authWithAnonymous';
import { signInWithApple } from '~/utils/authWithApple';
import { signInWithGoogle } from '~/utils/authWithGoogle';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <TouchableOpacity onPress={() => signInAnonymously()}>
          <Text>Sign In Anonymously</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signInWithGoogle()}>
          <Text>Sign In With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signInWithApple()}>
          <Text>Sign In With Apple</Text>
        </TouchableOpacity>
        {/* <ScreenContent path="app/(drawer)/index.tsx" title="Home" /> */}
      </Container>
    </>
  );
}
