import { Text, StyleSheet } from "react-native";


const CustomText = ({ text, type, size, maxLines }) => {
  const textType = type ? type : "view";
  const textStyle = { ...styles[textType] };
  if (size) {
    textStyle.fontSize = size;
  }

  return maxLines ? (
    <Text style={textStyle} numberOfLines={maxLines}>
      {text}
    </Text>
  ) : (
    <Text style={textStyle}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  view: {
    color: "white",
  },
  bold: {
    color: "white",
    fontWeight: "bold",
  },
  underlined: {
    color: "white",
    textDecorationLine: "underline",
  },
});

export default CustomText;
