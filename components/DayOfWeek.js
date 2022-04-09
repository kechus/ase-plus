import { React, useEffect, useState } from "react";
import { Button, View, Text } from "react-native";

const DayOfWeek = (props) => {
  const onChange = () => {
    props.onDaySelect(props.values.index);
  };

  return <Button onPress={onChange} title={props.values.dayName} />;
};

export default DayOfWeek;
