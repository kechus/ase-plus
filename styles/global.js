import { StyleSheet, Dimensions } from "react-native";

export const COLORS = {
  primary: "#466995",
  secondary: "#F58F29",
  third: "#7D4600",
  clear: "#4464AD",
  clearer: "#A4B0F5",
};

export const CARD_COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#2196f3',
  '#00bcd4',
  '#009688',
  '#cddc39',
  '#eeb5eb',
  '#ff9800',
  '#b75343'
]

export const globalStyles = StyleSheet.create({
  body: {
    flex: 1,
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
  card: {
    width: (Dimensions.get("window").width - 35) / 6,
    height: Dimensions.get("window").height / 10,
    marginBottom: 4,
    borderRadius: 2.5,
    borderWidth: 0.2,
    paddingHorizontal: 2
  },
  option: {
    padding: 20,
    borderWidth: 1,
    marginBottom: "1%",
    marginLeft: "5%",
    width: "70%",
  }
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
