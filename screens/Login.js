import { React, useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { login, fetchSchedule } from "../Utils/Service";
import { parseHTML } from "../Utils/ParserHTML";
import { getItemFromStorage, storeItem } from "../Utils/FileHandling";
import { globalStyles, COLORS } from "../styles/global";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { scheduleAllNotifications } from "../Utils/Notifications";
import { getAllScheduledNotificationsAsync } from "expo-notifications";

const ERROR = "Error al iniciar sesión";

const Login = ({ navigation, props }) => {
  const [registro, setRegistro] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTryingLogin, setIsTryingLogin] = useState(false);
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const icon = isHiddenPassword
    ? require("../assets/hidden.png")
    : require("../assets/eye.png");

  const tryLogin = async () => {
    setIsTryingLogin(true);
    const me = {
      registro: registro,
      password: password,
    };
    const message = await login(me);
    if (message !== 'SUCCESS') {
      setErrorMessage(message)
      setIsShowingAlert(true);
      setIsTryingLogin(false);
      return;
    }
    const scheduleHTML = await fetchSchedule();
    const scheduleObject = parseHTML(scheduleHTML);
    await storeItem(scheduleObject, "schedule");
    await storeItem(me, "me");
    await initialCheck();
    setIsTryingLogin(false);
  };

  useEffect(() => {
    initialCheck();
  }, []);

  const initialCheck = async () => {
    const schedule = await getItemFromStorage("schedule");

    if (!schedule) {
      return;
    }

    trySchedulingNotifications(schedule);
    const preferedScreenName = await getItemFromStorage("screenName");
    if (preferedScreenName) {
      navigation.navigate("main", { screen: preferedScreenName.name });
    } else {
      navigation.navigate("main");
    }
  };

  const trySchedulingNotifications = async (schedule) => {
    const notifs = await getAllScheduledNotificationsAsync();
    if (notifs.length === 0) {
      await scheduleAllNotifications(schedule);
    }
  };

  const onDismiss = () => {
    setIsShowingAlert(false);
  };

  return (
    <View style={globalStyles.body}>
      <View style={globalStyles.container}>
        <View>
          <View style={globalStyles.textInputWrap}>
            <TextInput
              placeholder="Registro"
              onChangeText={setRegistro}
              value={registro}
              style={globalStyles.textInput}
              placeholderTextColor={"white"}
            />
          </View>

          <View style={loginStyles.passwordView}>
            <TextInput
              placeholder="Contraseña"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={isHiddenPassword}
              placeholderTextColor={"white"}
              style={loginStyles.passwordInput}
            />
            <TouchableHighlight
              onPress={() => setIsHiddenPassword(!isHiddenPassword)}
              style={loginStyles.iconContainer}
            >
              <Image source={icon} />
            </TouchableHighlight>
          </View>
        </View>

        <Button
          onPress={tryLogin}
          title="Iniciar sesión"
          color={COLORS.secondary}
        />

        {isTryingLogin ? <Loading /> : null}

        {isShowingAlert ? (
          <Alert onDismiss={onDismiss} alertText={errorMessage} />
        ) : null}
      </View>
    </View>
  );
};

const loginStyles = StyleSheet.create({
  passwordView: {
    ...globalStyles.textInputWrap,
    flexDirection: "row",
  },
  passwordInput: {
    ...globalStyles.textInput,
    borderRightWidth: 0,
    width: "80%",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    width: "20%",
    ...globalStyles.textInput,
    borderLeftWidth: 0,
  },
});

export default Login;
