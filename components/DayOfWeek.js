import { TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { COLORS, globalStyles } from "../styles/global";

const DayOfWeek = (props) => {
  const currentStyle = props.values.isToday ? styles.currentDay : styles.day;
  const onChange = () => {
    props.onDaySelect(props.values.index);
  };

  return (
    <TouchableOpacity onPress={onChange} style={currentStyle}>
      <CustomText text={props.values.dayName} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  day: {
    ...globalStyles.button,
  },
  currentDay: {
    ...globalStyles.button,
    borderColor: COLORS.clearer,
  },
});

export default DayOfWeek;
