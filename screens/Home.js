import { React, useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";

const Home = ({ navigation, route }) => {
  return (
    <ScrollView>
      <Text>{route.params.schedule}</Text>
    </ScrollView>
  );
};

export default Home;
