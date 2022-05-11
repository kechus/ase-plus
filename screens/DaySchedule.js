import { React, useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { getItemFromStorage } from "../Utils/FileHandling";
import Module from "../components/Module";
import DatePicker from "../components/DatePicker";
import { globalStyles } from "../styles/global";
import { momentIsInHour, selectTodaysWeekday } from "../Utils/Time";

const Home = ({ navigation, route }) => {
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState(selectTodaysWeekday());

  useEffect(() => {
    const getScheduleFromStorage = async () => {
      const storageSchedule = await getItemFromStorage("schedule");
      setSchedule(storageSchedule);
    };
    getScheduleFromStorage();
  }, []);

  const handleDayChange = (day) => {
    setDay(day);
  };

  return (
    <ScrollView style={globalStyles.drawerBody}>
      <DatePicker onDayChange={handleDayChange} today={day} />
      <View style={styles.container}>
        {schedule.map((hour, i) => {
          const todayClass = hour.classes[day];
          if (Object.keys(todayClass).length == 0) return;
          const moduleRightNow = momentIsInHour(hour.time);
          return (
            <Module
              key={i}
              data={{
                class: todayClass,
                hour: hour.time,
                isRightNow: moduleRightNow,
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: "5%",
  },
});

export default Home;
