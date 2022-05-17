import { TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../components/CustomText";
import { COLORS } from "../styles/global";

const ScreenName = (props) => {
  const currentStyle = props.values.isSelected
    ? styles.selectedOption
    : styles.option;
  const onChange = () => {
    props.onNameSelect(props.values.index);
  };

  return (
    <TouchableOpacity style={currentStyle} onPress={onChange}>
      <CustomText text={props.values.name} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 20,
    borderWidth: 1,
    marginBottom: "1%",
    marginLeft: "5%",
    width: "70%",
  },
  selectedOption: {
    padding: 20,
    borderWidth: 1,
    marginBottom: "1%",
    marginLeft: "5%",
    width: "70%",
    borderColor: COLORS.clearer,
  },
});

export default ScreenName;
