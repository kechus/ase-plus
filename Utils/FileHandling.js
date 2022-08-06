import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItemFromStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

export const storeItem = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
};

export const removeItem = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
    return true
	} catch (e) {
    return false
  }
};