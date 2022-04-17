import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import CustomText from "./CustomText";
import { COLORS, globalStyles } from "../styles/global";

const Notification = (props) => {
  useEffect(() => {
    setTimeout(onDismissClick, 3500);
  }, []);

  const onDismissClick = () => {
    props.onDismiss();
  };

  return (
    <View style={styles.alertWrap}>
      <CustomText text={props.alertText} />
    </View>
  );
};

const styles = StyleSheet.create({
  alertWrap: {
    ...globalStyles.alert,
    borderColor: "red",
    borderWidth: 2,
    padding: 5,
    backgroundColor: COLORS.secondary,
  },
});

export default Notification;
