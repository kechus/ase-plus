import { View, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { COLORS } from "../styles/global";

const Module = ({ data }) => {
  return (
    <View style={styles.moduleContainer}>
      <CustomText text={data.class.materia} />
      <CustomText text={data.hour} />
      <CustomText text={data.class.salon} />
    </View>
  );
};

const styles = StyleSheet.create({
  moduleContainer: {
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    padding: 5,
    margin: 2,
  },
});
export default Module;
