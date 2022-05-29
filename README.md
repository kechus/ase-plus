# ase-plus
App que complementa plataforma de ase1

## Librerias

- [React Native](https://reactnative.dev)
- [Expo](https://expo.dev)

## Configuración
Instalar dependencias con npm

	$ npm install

Instalar la linea de comandos de Expo

	$ npm install --global expo-cli
  
## Scripts
Iniciar servidor de desarrollo

	$ expo start
  
## Correr en Expo app
 Puedes correr la aplicacion utilizando la [Aplicacion de Expo](https://play.google.com/store/apps/details?id=host.exp.exponent) y ver los cambios en vivo desde tu celular
 
## Correr en emulador
 Utilzando ADB y corriendo `expo start --android` se puede inicar en un emulador, es recomendable utlizar el AVD manager de [Android Studo](https://developer.android.com/studio/)
 
 ## Build
 Para crear un apk se necesita la linea comandos de eas
 	
	$ npm install --global eas cli
	
Con el siguiente comando, iniciar sesión en tu cuenta de [Expo](https://expo.dev/signup)
	
	$ eas login
	
Despues puedes utilizar `eas whoami` para saber si iniciaste sesión correctamente

Ahora para crear el apk ejecutar el siguiente comando que utiliza el archivo `eas.json` para crear la apk  

	$ eas build -p android --profile preview
