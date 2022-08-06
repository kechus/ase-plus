import { View, StyleSheet, ScrollView, } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { getItemFromStorage, storeItem } from "../Utils/FileHandling";
import { CARD_COLORS, globalStyles } from "../styles/global";
import Card from "../components/Card";
import Timeline from "../components/Timeline";
import ReloadButton from "../components/ReloadButton";
import uuid from "react-native-uuid";

const FullSchedule = ({navigation}) => {
  const [cards, setCards] = useState([]);
  const [_,setReload] = useState(false) 

  useEffect(() => {
    const getScheduleFromStorage = async () => {
      const storageSchedule = await getItemFromStorage("schedule").catch(() => {
        return;
      });
      const schedule = flipSchedule(storageSchedule);
      const cards = await buildCards(schedule);
      setCards(cards);
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

  const handleReload = () =>{
    setReload((reload)=>!reload)
  }

  const flipSchedule = (schedule) => {
    const scheduleByDays = [[], [], [], [], [], []];
    for (const hour of schedule) {
      for (let i = 0; i < 6; i++) {
        scheduleByDays[i].push(hour.classes[i]);
      }
    }
    return scheduleByDays;
  };

  const buildCards = async (schedule) => {    
    // schedule[5][0] = {a:"1"}
    const saturdayFree = isSaturdayFree(schedule) 
    if(saturdayFree){
      schedule = schedule.slice(0, -1);
    }
    const myCards = [[], [], [], [], [], []];
    let dayCounter = 0;

    const savedColors = await getItemFromStorage('cardColors');
    const materiaColor = savedColors ? {...savedColors}: {};
    let cardColors = CARD_COLORS.slice()

    for (const day of schedule) {
      for (const myClass of day) {

        const materia = myClass.materia
        if (!materiaColor[materia]) {
					materiaColor[materia] = pickRandomColor(cardColors);
          cardColors = cardColors.filter((color)=> color !== materiaColor[materia])
				}
        const currentColor = materiaColor[materia]

        myCards[dayCounter].push(
					<Card day={myClass} key={uuid.v4()} color={currentColor} saturdayFree={saturdayFree}/>
				);
      }
      dayCounter++;
    }

    await storeItem(materiaColor, 'cardColors')

    

    return myCards;
  };

  const pickRandomColor = (cardColors) =>{
    const i = Math.floor( Math.random()* (cardColors.length))
    return cardColors[i]
  }

  const isSaturdayFree = (schedule) =>{
    for(const saturdayClass of schedule[schedule.length - 1]){
      if(Object.keys(saturdayClass).length !== 0){
        return false
      }
    }
    return true
  }

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
