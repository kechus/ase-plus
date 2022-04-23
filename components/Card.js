import { StyleSheet, Dimensions } from "react-native";
import { View } from "react-native";
import { COLORS } from "../styles/global";
import CustomText from "./CustomText";

const Card = ({ day }) => {
  return (
    <View style={styles.card}>
      {Object.keys(day) == 0 ? null : <CustomText text={day.materia} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width / 6,
    height: Dimensions.get("window").height / 10,
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.third,
    borderWidth: 1,
  },
});

export default Card;
