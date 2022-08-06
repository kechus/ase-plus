import {
	View,
	StyleSheet,
	ScrollView,
	Modal,
	Text,
	Alert,
	Pressable,
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { getItemFromStorage, storeItem } from "../Utils/FileHandling";
import { CARD_COLORS, globalStyles } from "../styles/global";
import Card from "../components/Card";
import Timeline from "../components/Timeline";
import ReloadButton from "../components/ReloadButton";
import uuid from "react-native-uuid";
import ClassInfoModal from "../components/ClassInfoModal";

const FullSchedule = ({ navigation }) => {
	const [cards, setCards] = useState([]);
	const [_, setReload] = useState(false);
	const [isShowingModal, setIsShowingModal] = useState(false);
	const [lastPressedClassInfo, setLastPressedClassInfo] = useState({});

	useEffect(() => {
		const getScheduleFromStorage = async () => {
			const storageSchedule = await getItemFromStorage("schedule").catch(() => {
				return;
			});
			const schedule = flipSchedule(storageSchedule);
			const cards = await buildCards(schedule);
			setCards(cards);
		};
		getScheduleFromStorage();
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <ReloadButton onReload={handleReload} />,
		});
	}, [navigation]);

	const handleReload = () => {
		setReload((reload) => !reload);
	};

	const flipSchedule = (schedule) => {
		const scheduleByDays = [[], [], [], [], [], []];
		for (const hour of schedule) {
			for (let i = 0; i < 6; i++) {
				scheduleByDays[i].push(hour.classes[i]);
			}
		}
		return scheduleByDays;
	};

	const buildCards = async (schedule) => {
		// schedule[5][0] = {a:"1"}
		const saturdayFree = isSaturdayFree(schedule);
		if (saturdayFree) {
			schedule = schedule.slice(0, -1);
		}
		const myCards = [[], [], [], [], [], []];
		let dayCounter = 0;

		const savedColors = await getItemFromStorage("cardColors");
		const materiaColor = savedColors ? { ...savedColors } : {};
		let cardColors = CARD_COLORS.slice();

		for (const day of schedule) {
			for (const myClass of day) {
				const materia = myClass.materia;
				if (!materiaColor[materia]) {
					materiaColor[materia] = pickRandomColor(cardColors);
					cardColors = cardColors.filter(
						(color) => color !== materiaColor[materia]
					);
				}
				const currentColor = materiaColor[materia];

				myCards[dayCounter].push(
					<Card
						classInfo={myClass}
						key={uuid.v4()}
						color={currentColor}
						saturdayFree={saturdayFree}
						onCardTouch={handleCardTouch}
					/>
				);
			}
			dayCounter++;
		}

		await storeItem(materiaColor, "cardColors");

		return myCards;
	};

	const pickRandomColor = (cardColors) => {
		const i = Math.floor(Math.random() * cardColors.length);
		return cardColors[i];
	};

	const isSaturdayFree = (schedule) => {
		for (const saturdayClass of schedule[schedule.length - 1]) {
			if (Object.keys(saturdayClass).length !== 0) {
				return false;
			}
		}
		return true;
	};

	const handleCardTouch = (classInfo) => {
    setLastPressedClassInfo(classInfo)
		// setIsShowingModal((showing) => !showing);
		setIsShowingModal(true);
	};

	return (
		<ScrollView style={globalStyles.drawerBody}>
			<View style={styles.body}>
				<Timeline />
				{cards.map((card, i) => {
					return <View key={i}>{card}</View>;
				})}
			</View>

      <ClassInfoModal
					classInfo={lastPressedClassInfo}
					onModalHide={() => setIsShowingModal(false)}
          visible ={isShowingModal}
        />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	mainBody: {
		...globalStyles.drawerBody,
	},
	body: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});

export default FullSchedule;
