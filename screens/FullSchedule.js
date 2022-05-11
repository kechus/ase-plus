import { View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getItemFromStorage } from "../Utils/FileHandling";
import { globalStyles } from "../styles/global";
import Card from "../components/Card";
import Timeline from "../components/Timeline";
import uuid from "react-native-uuid";

const FullSchedule = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getScheduleFromStorage = async () => {
      const storageSchedule = await getItemFromStorage("schedule").catch(() => {
        return;
      });
      const schedule = flipSchedule(storageSchedule);
      const cards = buildCards(schedule);
      setCards(cards);
    };
    getScheduleFromStorage();
  }, []);

  const flipSchedule = (schedule) => {
    const scheduleByDays = [[], [], [], [], [], []];
    for (const hour of schedule) {
      for (let i = 0; i < 6; i++) {
        scheduleByDays[i].push(hour.classes[i]);
      }
    }
    return scheduleByDays;
  };

  const buildCards = (schedule) => {
    const myCards = [[], [], [], [], [], []];
    let dayCounter = 0;
    for (const day of schedule) {
      for (const myClass of day) {
        myCards[dayCounter].push(<Card day={myClass} key={uuid.v4()} />);
      }
      dayCounter++;
    }
    return myCards;
  };

  return (
    <ScrollView style={globalStyles.drawerBody}>
      <View style={styles.body}>
        <Timeline />
        {cards.map((card, i) => {
          return <View key={i}>{card}</View>;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    ...globalStyles.drawerBody,
  },
  body: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default FullSchedule;
