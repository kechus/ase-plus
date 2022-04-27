import { View } from "react-native";
import { useEffect } from "react";

const Logout = (props) => {
  useEffect(() => {
    props.navigation.navigate("initial");
  }, []);

  return <View></View>;
};

export default Logout;
