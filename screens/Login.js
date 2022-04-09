import { React, useState, useEffect } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { login, fetchSchedule } from "../Utils/Service";
import { parseHTML } from "../Utils/ParserHTML";
import { getSchedule, storeSchedule } from "../Utils/FileHandling";

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
    storeSchedule(scheduleObject);
    await tryGetLocalSchedule()
  };

  useEffect(() => {
    tryGetLocalSchedule();
  }, []);

  const tryGetLocalSchedule = async () => {
    const schedule = await getSchedule();
    if (schedule !== null) {
      navigation.navigate("home", { schedule: JSON.stringify(schedule) });
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Registro"
        onChangeText={setRegistro}
        value={registro}
      />

      <TextInput
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Button onPress={tryLogin} title="Iniciar sesión" />
      <Text>Bienvenidos al himalaya, heladoss</Text>
    </View>
  );
};

export default Login;
