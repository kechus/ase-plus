import { React, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { getItemFromStorage } from "../Utils/FileHandling";
import Module from "../components/Module";
import DatePicker from "../components/DatePicker";

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
    console.log(day);
    setDay(day);
  };

  return (
    <ScrollView>
      <DatePicker onDayChange={handleDayChange} />
      {schedule.map((hour, i) => {
        const todayClass = hour.classes[day];
        if (Object.keys(todayClass).length !== 0)
          return (
            <Module key={i} data={{ class: todayClass, hour: hour.time }} />
          );
      })}
    </ScrollView>
  );
};

export default Home;
