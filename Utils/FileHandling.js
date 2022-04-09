import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSchedule = async () => {
  try {
    return await AsyncStorage.getItem("schedule");
  } catch (e) {
    // error reading value
  }
};

export const storeSchedule = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("schedule", jsonValue);
    console.log("guardado");
  } catch (e) {
    // saving error
  }
};
