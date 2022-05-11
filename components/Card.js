import { StyleSheet } from "react-native";
import { View } from "react-native";
import { COLORS, globalStyles } from "../styles/global";
import CustomText from "./CustomText";

const Card = ({ day }) => {
  return Object.keys(day) == 0 ? (
    <View style={styles.emptyCard}></View>
  ) : (
    <View style={styles.card}>
      <CustomText text={day.materia} maxLines={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
  emptyCard: {
    ...globalStyles.card,
    backgroundColor: COLORS.primary,
  },
});

export default Card;
