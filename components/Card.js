import { StyleSheet, Dimensions } from "react-native";
import { View } from "react-native";
import { COLORS, globalStyles } from "../styles/global";
import CustomText from "./CustomText";

const Card = ({ day , _ , color, saturdayFree}) => {
  const widthPx = saturdayFree ? (Dimensions.get("window").width - 35) / 5 : (Dimensions.get("window").width - 35) / 6
  const maxLines = saturdayFree ? 3 : 2 
  const padding = saturdayFree ? 5 : 1.5

  return Object.keys(day) == 0 ? (
		<View
			style={{
				...styles.emptyCard,
				width: widthPx,
				paddingHorizontal: padding,
			}}
		></View>
	) : (
		<View
			style={{
				...styles.card,
				backgroundColor: color,
				width: widthPx,
				paddingHorizontal: padding,
			}}
		>
			<CustomText text={day.materia} maxLines={maxLines} />
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
