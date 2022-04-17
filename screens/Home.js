import { React, useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { getItemFromStorage } from "../Utils/FileHandling";
import Module from "../components/Module";
import DatePicker from "../components/DatePicker";
import moment from "moment";
import { globalStyles } from "../styles/global";

const selectTodaysWeekday = () => {
  //offset so that lunes is 0 and saturday 5
  const numberOfWeek = moment().day() - 1;
  return numberOfWeek === -1 ? 0 : numberOfWeek;
};

const Home = ({ navigation, route }) => {
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState(0);

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
    <ScrollView style={globalStyles.body}>
      <DatePicker onDayChange={handleDayChange} today={day} />
      {/* <TodayModules /> */}
      <View style={styles.container}>
        {schedule.map((hour, i) => {
          const todayClass = hour.classes[day];
          if (Object.keys(todayClass).length !== 0)
            return (
              <Module key={i} data={{ class: todayClass, hour: hour.time }} />
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
  },
});

export default Home;
