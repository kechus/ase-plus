import { StyleSheet, StatusBar, Dimensions } from "react-native";

const COLORS = {
  primary: "#466995",
  secondary: "#F58F29",
  third: "#7D4600",
  clear: "#4464AD",
  clearer: "#A4B0F5",
};

const globalStyles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: COLORS.primary,
  },
  textInput: {
    height: 50,
    borderWidth: 2,
    padding: 10,
    color: "white",
  },
  textInputWrap: {
    marginTop: "5%",
    backgroundColor: COLORS.third,
    width: Dimensions.get("window").width - 100,
  },
  button: {
    borderWidth: 2,
    padding: 10,
  },
  alert: {
    position: "absolute",
    bottom: "5%",
    alignSelf: "flex-end",
  },
});
export { globalStyles, COLORS };
