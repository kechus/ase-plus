import { ScrollView, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getItemFromStorage } from "../Utils/FileHandling";
import { globalStyles } from "../styles/global";
import Card from "../components/Card";
import Hr from "../components/Hr";

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
        myCards[dayCounter].push(<Card day={myClass} />);
      }
      dayCounter++;
    }
    return myCards;
  };

  return (
    <View style={styles.body}>
      {cards.map((card, i) => {
        return <View>{card}</View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    ...globalStyles.body,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default FullSchedule;
