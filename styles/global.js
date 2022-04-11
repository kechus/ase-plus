import { StyleSheet, StatusBar } from "react-native";

const COLORS = {
  primary: "#150811",
  secondary: "#380036",
  third: "#26081C",
  clear: "#0CBABA",
  clearer: "#01BAEF",
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
  },
  button: {
    borderWidth: 2,
    padding: 10,
  },
});
export { globalStyles, COLORS };
