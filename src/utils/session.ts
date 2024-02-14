import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = (
  key: string,
  value: object | string | undefined | null,
) => {
  if (value === undefined || value === null) {
    return;
  }

  const data = typeof value === 'object' ? JSON.stringify(value) : value;
  AsyncStorage.setItem(key, data);
};

export const getItem = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return data || null;
    }
  }

  return null;
};

export const removeItem = (key: string) => {
  AsyncStorage.removeItem(key);
};
