import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

export const getItem = async (key: string) => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

