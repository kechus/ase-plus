import { StyleSheet, Image } from "react-native";

const Loading = () => {
  return (
    <Image source={require("../assets/loading.png")} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  // image: { alignSelf: "flex-start" },
});
export default Loading;
