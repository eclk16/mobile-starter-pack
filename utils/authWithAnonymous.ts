import auth from '@react-native-firebase/auth';

export const signInAnonymously = async () => {
  try {
    const { user } = await auth().signInAnonymously();
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};
