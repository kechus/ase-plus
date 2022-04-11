import { React } from "react";
import { ScrollView, StyleSheet } from "react-native";
import DayOfWeek from "./DayOfWeek";

const DAYS_OF_THE_WEEK = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const DatePicker = (props) => {
  const onChange = (i) => {
    props.onDayChange(i);
  };
  return (
    <ScrollView style={sytles.picker} horizontal={true}>
      {DAYS_OF_THE_WEEK.map((day, i) => {
        return (
          <DayOfWeek
            onDaySelect={onChange}
            values={{ dayName: day, index: i }}
            key={i}
          />
        );
      })}
    </ScrollView>
  );
};

const sytles = StyleSheet.create({
  picker: {
    flex: 1,
    flexDirection: "row",
  },
});

export default DatePicker;
