import { React, useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
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
    <View>
      {DAYS_OF_THE_WEEK.map((day, i) => {
        return (
          <DayOfWeek
            onDaySelect={onChange}
            values={{ dayName: day, index: i }}
          />
        );
      })}
    </View>
  );
};

export default DatePicker;
