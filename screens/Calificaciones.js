import { View } from "react-native";
import { login, fetchGrades } from "../Utils/Service";
import { useEffect } from "react";
import { getItemFromStorage } from "../Utils/FileHandling";
import { scheduleParser } from "../Utils/ParserHTML";

const Calificaciones = () => {
  useEffect(() => {
    const tryGetGrades = async () => {
      const me = await getItemFromStorage("me");
      const success = await login(me);
      if (!success) {
      }
      const gradesHTML = await fetchGrades();
      const grades = scheduleParser(gradesHTML);
    };

    tryGetGrades();
  }, []);
  return <View></View>;
};

export default Calificaciones;
