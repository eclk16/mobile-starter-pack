import auth from '@react-native-firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import { AppleAuthenticationCredential } from 'expo-apple-authentication';

export const signInWithApple = async () => {
  try {
    const appleCredential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const { identityToken } = appleCredential;
    const credential = auth.AppleAuthProvider.credential(identityToken, appleCredential.nonce);
    const { user } = await auth().signInWithCredential(credential);
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};
