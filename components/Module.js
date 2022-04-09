import { React, useEffect } from "react";
import { View, Text } from "react-native";

const Module = ({ data }) => {
  return (
    <View>
      <Text>{data.hour}</Text>
      <Text>{data.class.materia}</Text>
      <Text>{data.class.salon}</Text>
    </View>
  );
};

export default Module;
