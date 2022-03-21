import { React, useState, useEffect } from 'react';
import { Text, View, TextInput, Button } from 'react-native'
import { login, fetchSchedule } from '../Utils/Service';
import { parseHTML } from '../Utils/ParserHTML';

const Home = ({ navigation, props }) => {

  const [registro, setRegistro] = useState('')
  const [password, setPassword] = useState('')

  // useEffect(() => {
  //   const fetchHTML = async () => {

  //   fetchHTML()
  // }, [registro, password, props])

  const tryLogin = async () => {
    const me = {
      'registro': registro,
      'password': password
    }
    const success = await login(me)
    if (!success) {
      console.log('nosepudo')
      return
    }
    const scheduleHTML = await fetchSchedule()
    const scheduleObject = parseHTML(scheduleHTML)
    console.log(scheduleObject)
  }

  return (
    <View>
      <TextInput
        placeholder='Registro'
        onChangeText={setRegistro}
        value={registro} />

      <TextInput
        placeholder='Contraseña'
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Button
        onPress={tryLogin}
        title="Iniciar sesión" />
      <Text>
        Bienvenidos al himalaya, heladoss
      </Text>
    </View>
  );
}

export default Home;
