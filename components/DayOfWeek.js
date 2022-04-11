import { TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { globalStyles } from "../styles/global";

const DayOfWeek = (props) => {
  const onChange = () => {
    props.onDaySelect(props.values.index);
  };

  return (
    <TouchableOpacity onPress={onChange} style={styles.day}>
      <CustomText text={props.values.dayName} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  day: {
    ...globalStyles.button,
  },
});

export default DayOfWeek;
