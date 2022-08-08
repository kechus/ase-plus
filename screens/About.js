import {
  ScrollView,
  View,
  StyleSheet,
  Linking,
  TouchableHighlight,
} from "react-native";
import CustomText from "../components/CustomText";
import { globalStyles, TextTypes, TextSizes } from "../styles/global";
import aboutStrings from "../Utils/About.json";
import Hr from "../components/Hr";

const About = () => {
  return (
		<ScrollView style={globalStyles.body}>
			<View style={styles.container}>
				{aboutStrings.questions.map((q) => (
					<View>
						<CustomText
							text={q.question}
							type={TextTypes.bold}
							size={TextSizes.h1}
						/>
						<CustomText text={q.answer} size={TextSizes.h2} />
    				<Hr />
					</View>
				))}

				<CustomText
					text={aboutStrings.question1}
					type={TextTypes.bold}
					size={TextSizes.h1}
				/>
				<CustomText text={aboutStrings.answer1} size={TextSizes.h2} />
				<TouchableHighlight
					onPress={() => Linking.openURL("https://github.com/kechus/ase-plus")}
				>
					<CustomText
						text={aboutStrings.repoLink}
						size={TextSizes.h2}
						type={TextTypes.underlined}
					/>
				</TouchableHighlight>

			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    ...globalStyles.container,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});

export default About;
