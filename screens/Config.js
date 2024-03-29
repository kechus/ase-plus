import { View,TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { globalStyles, TextSizes, TextTypes } from "../styles/global";
import {
	getItemFromStorage,
	storeItem,
	removeItem,
} from "../Utils/FileHandling";
import CustomText from "../components/CustomText";
import ScreenName from "../components/ScreenName";
import { tryLogin } from "../Utils/Net";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import * as Notifications from "expo-notifications";
import { getAllScheduledNotificationsAsync } from "expo-notifications";
import { scheduleAllNotifications } from "../Utils/Notifications";

const SCREEN_NAMES = ["Horario del día", "Horario Completo"];

const Config = () => {
  const [selectedScreenName, setSelectedScreenName] = useState("");
  const [isTryingLogin, setIsTryingLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const [notifs,setNotifs] = useState([])

  useEffect(() => {
    const tryGetScreenName = async () => {
      const preferedScreenName = await getItemFromStorage("screenName");
      if (preferedScreenName) {
        setSelectedScreenName(preferedScreenName.name);
      }
    };

    tryGetScreenName();
    getAllScheduledNotificationsAsync().then((notifications) =>
			setNotifs(notifications)
		);

  }, []);

  const nameChanged = async (i) => {
    const selectedName = SCREEN_NAMES[i];
    await storeItem({ name: selectedName }, "screenName");
    setSelectedScreenName(selectedName);
  };

  const handleLogin = async () =>{
	setIsTryingLogin(true)
	tryLogin().then((message) => {
		setIsTryingLogin(false)
		if(message !== "SUCCESS"){
			setErrorMessage(message)
		}else{
			setErrorMessage('Horario actualizado')
		}
		setIsShowingAlert(true);
	});
  }
  
  const toggleNotifications = async () => {
		if (notifs.length === 0) {
			const schedule = await getItemFromStorage("schedule");
			await scheduleAllNotifications(schedule);
		} else {
			await Notifications.cancelAllScheduledNotificationsAsync();
		}
		const notifications = await getAllScheduledNotificationsAsync();
		setNotifs(notifications);
	};

  const onDismiss = () => {
    setIsShowingAlert(false);
  };

  return (
		<View style={globalStyles.drawerBody}>
			<CustomText
				text={"Pantalla inicial: "}
				type={TextTypes.bold}
				size={TextSizes.h1}
			/>

			{SCREEN_NAMES.map((name, i) => {
				const isSelected = selectedScreenName === name;
				return (
					<ScreenName
						key={i}
						values={{ name: name, index: i, isSelected: isSelected }}
						onNameSelect={nameChanged}
					/>
				);
			})}

			<CustomText
				text={"Horario completo: "}
				type={TextTypes.bold}
				size={TextSizes.h1}
			/>
			<TouchableOpacity
				style={globalStyles.option}
				onPress={() => removeItem("cardColors")}
			>
				<CustomText text="Cambiar color de materias" />
			</TouchableOpacity>

			<CustomText
				text={"General: "}
				type={TextTypes.bold}
				size={TextSizes.h1}
			/>
			<TouchableOpacity
				style={globalStyles.option}
				onPress={async () => await handleLogin()}
			>
				<CustomText text="Re-iniciar sesión" />
			</TouchableOpacity>

			<TouchableOpacity
				style={globalStyles.option}
				onPress={async () => await toggleNotifications()}
			>
				<CustomText text={
					notifs.length === 0 ? "Encender notificaciones" : 'Apagar notificaciones' 
				} />
			</TouchableOpacity>

			{isTryingLogin ? <Loading /> : null}

			{isShowingAlert ? (
				<Alert onDismiss={onDismiss} alertText={errorMessage} />
			) : null}
		</View>
	);
};

export default Config;
