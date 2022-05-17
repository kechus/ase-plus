import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import DaySchedule from "./screens/DaySchedule";
import Login from "./screens/Login";
import About from "./screens/About";
import FullSchedule from "./screens/FullSchedule";
import Logout from "./screens/Logout";
import Calificaciones from "./screens/Calificaciones";
import Config from "./screens/Config";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function InitialTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Acerca de") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Login") {
            iconName = "log-in";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Acerca de"
        component={About}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function MainDrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Horario del día" component={DaySchedule} />
      <Drawer.Screen name="Horario Completo" component={FullSchedule} />
      <Drawer.Screen name="Calificaciones" component={Calificaciones} />
      <Drawer.Screen name="Configuración" component={Config} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const notificationListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="initial"
          component={InitialTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main"
          component={MainDrawerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
