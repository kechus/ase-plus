import { View, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { getItemFromStorage } from "../Utils/FileHandling";
import CustomText from "./CustomText";
import { globalStyles, TextTypes } from "../styles/global";
import { momentIsInHour } from "../Utils/Time";

const Timeline = () => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const getScheduleFromStorage = async () => {
      const storageSchedule = await getItemFromStorage("schedule").catch(() => {
        return;
      });

      const hours = [];
      for (const hour of storageSchedule) {
        hours.push(hour.time);
      }
      setHours(hours);
    };
    getScheduleFromStorage();
  }, []);

  return (
    <View style={styles.line}>
      {hours.map((hour, i) => {
        const [lower, upper] = hour.split(" - ");
        const textType = momentIsInHour(hour)
          ? TextTypes.bold
          : TextTypes.normal;
        return (
          <View key={i} style={styles.timeText}>
            <CustomText text={lower} type={textType} size={13}/>
            <CustomText text={upper} type={textType} size={13}/>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    width: 35,
  },
  timeText: {
    justifyContent: "space-around",
    height: globalStyles.card.height + globalStyles.card.marginBottom,
  },
});

export default Timeline;
