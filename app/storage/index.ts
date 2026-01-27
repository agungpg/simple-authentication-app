import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USERS_LIST: '@users_list',
  CURRENT_USER: '@current_user',
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.log(err)
    return false;     
  }
}

export const getData = async (key: string) => {
  try {  
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    console.log(err)
    return undefined;     
  }
}

export const removeData = async (key: string) => {
  try {  
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    console.log(err)
    return false;     
  }
}
