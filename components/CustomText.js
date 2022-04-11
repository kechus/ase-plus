import { Text, StyleSheet } from "react-native";

const CustomText = ({ text }) => {
  return <Text style={styles.view}>{text}</Text>;
};

const styles = StyleSheet.create({
  view: {
    color: "white",
  },
});

export default CustomText;
