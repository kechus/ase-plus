import { React, useState } from "react";
import { View, Text } from "react-native";
import Module from "./Module";

const Hour = ({ data }) => {
  const [today] = useState(0);

  return (
    <View>
      <Text>{data.time}</Text>
      {data.classes.map((module, i) => {
        if (Object.keys(module).length !== 0) {
          return <Module key={i} data={module} />;
        }
      })}
    </View>
  );
};

export default Hour;
