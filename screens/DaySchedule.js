import { React, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, View, StyleSheet, } from "react-native";
import { getItemFromStorage } from "../Utils/FileHandling";
import Module from "../components/Module";
import DatePicker from "../components/DatePicker";
import ReloadButton from "../components/ReloadButton";
import { globalStyles } from "../styles/global";
import { momentIsInHour, selectTodaysWeekday } from "../Utils/Time";

const Home = ({ navigation }) => {
  const [schedule, setSchedule] = useState([]);
  const [day, setDay] = useState(selectTodaysWeekday());
  const [_, setReload] = useState(false); 

  useEffect(() => {
    const getScheduleFromStorage = async () => {
      const storageSchedule = await getItemFromStorage("schedule");
      setSchedule(storageSchedule);
    };
    getScheduleFromStorage();
  }, []);

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: ()=>(
          <ReloadButton onReload={handleReload}/>
      )
    })
  },[navigation])

  const handleReload = async () =>{    
    // try {
    //   const me = await getItemFromStorage('me');
    //   await login(me);
    //   const scheduleHTML = await fetchSchedule();
    //   const scheduleObject = parseHTML(scheduleHTML);
    //   await storeItem(scheduleObject, "schedule");
    // } catch (error) {
    //   console.log(error)
    // }
    setReload((reload)=>!reload)
  }

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
