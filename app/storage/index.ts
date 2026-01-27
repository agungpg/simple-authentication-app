import AsyncStorage from '@react-native-async-storage/async-storage';

// constants/storageKeys.js
export const STORAGE_KEYS = {
  USERS_LIST: '@users_list',
  CURRENT_USER: '@current_user',
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;     
  }
}

export const getData = async (key: string) => {
  try {  
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    return undefined;     
  }
}

export const removeData = async (key: string) => {
  try {  
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;     
  }
}
