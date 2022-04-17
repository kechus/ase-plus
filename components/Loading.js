import { StyleSheet, Image } from "react-native";
import { globalStyles } from "../styles/global";

const Loading = () => {
  return (
    <Image
      source={require("../assets/loading.png")}
      style={globalStyles.alert}
    />
  );
};

export default Loading;
