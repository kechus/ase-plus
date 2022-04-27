import { StyleSheet, StatusBar, Dimensions } from "react-native";

export const COLORS = {
  primary: "#466995",
  secondary: "#F58F29",
  third: "#7D4600",
  clear: "#4464AD",
  clearer: "#A4B0F5",
};

export const globalStyles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: COLORS.primary,
  },
  drawerBody: {
    flex: 1,
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
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export const TextTypes = {
  normal: "view",
  bold: "bold",
  underlined: "underlined",
};

export const TextSizes = {
  h1: 24,
  h2: 16,
};
