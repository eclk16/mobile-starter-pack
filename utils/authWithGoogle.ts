import auth from '@react-native-firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import GoogleAuthProvider from '@react-native-firebase/auth';

export const signInWithGoogle = async () => {
  try {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: 'YOUR_GOOGLE_CLIENT_ID', // Web client ID from Firebase console
    });

    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      const { user } = await auth().signInWithCredential(credential);
      return { user, error: null };
    }
    
    return { user: null, error: 'Google sign in was cancelled' };
  } catch (error) {
    return { user: null, error };
  }
};
