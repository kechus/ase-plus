import { React, useState, useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { login, fetchSchedule } from "../Utils/Service";
import { parseHTML } from "../Utils/ParserHTML";
import { getItemFromStorage, storeItem } from "../Utils/FileHandling";
import { globalStyles, COLORS } from "../styles/global";

const Login = ({ navigation, props }) => {
  const [registro, setRegistro] = useState("");
  const [password, setPassword] = useState("");

  const tryLogin = async () => {
    const me = {
      registro: registro,
      password: password,
    };
    const success = await login(me);
    if (!success) {
      console.log("nosepudo");
      return;
    }
    const scheduleHTML = await fetchSchedule();
    const scheduleObject = parseHTML(scheduleHTML);
    await storeItem(scheduleObject, "schedule");
    await tryGetLocalSchedule();
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

          <View style={globalStyles.textInputWrap}>
            <TextInput
              placeholder="Contraseña"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              placeholderTextColor={"white"}
              style={globalStyles.textInput}
            />
          </View>
        </View>

        <Button
          onPress={tryLogin}
          title="Iniciar sesión"
          color={COLORS.secondary}
          styles={loginStyles.loginButton}
        />
      </View>
    </View>
  );
};

const loginStyles = StyleSheet.create({
  loginButton: {},
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "space-around",
  },
});

export default Login;
