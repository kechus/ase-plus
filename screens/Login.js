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

const Login = ({ navigation, props }) => {
  const [registro, setRegistro] = useState("");
  const [password, setPassword] = useState("");
  const [isTryingLogin, setIsTryingLogin] = useState(false);
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const icon = isHiddenPassword
    ? require("../assets/hidden.png")
    : require("../assets/eye.png");

  const tryLogin = async () => {
    setIsTryingLogin(true);
    const me = {
      registro: registro,
      password: password,
    };
    const success = await login(me);
    if (!success) {
      console.log("nosepudo");
      setIsTryingLogin(false);
      return;
    }
    const scheduleHTML = await fetchSchedule();
    const scheduleObject = parseHTML(scheduleHTML);
    await storeItem(scheduleObject, "schedule");
    await tryGetLocalSchedule();
    setIsTryingLogin(false);
  };

  useEffect(() => {
    tryGetLocalSchedule();
  }, []);

  const tryGetLocalSchedule = async () => {
    const schedule = await getItemFromStorage("schedule");
    if (schedule !== null) {
      navigation.navigate("home");
    }
  };

  return (
    <View style={globalStyles.body}>
      <View style={loginStyles.container}>
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
      </View>
    </View>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "space-around",
    alignItems: "center",
  },
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
