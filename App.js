import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import DaySchedule from "./screens/DaySchedule";
import Login from "./screens/Login";
import About from "./screens/About";
import FullSchedule from "./screens/FullSchedule";
import Logout from "./screens/Logout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getItemFromStorage } from "./Utils/FileHandling";

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
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

function FullMainDrawerScreen() {
  return (
    <Drawer.Navigator initialRouteName="Horario Completo">
      <Drawer.Screen name="Horario del día" component={DaySchedule} />
      <Drawer.Screen name="Horario Completo" component={FullSchedule} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [screenName, setScreenName] = useState("");
  useEffect(() => {
    const tryGetInitialScreen = async () => {
      const initialScreen = await getItemFromStorage("initialScreen");
      if (initialScreen !== null) {
        setScreenName(initialScreen);
      }
    };
    tryGetInitialScreen();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="initial"
          component={InitialTabScreen}
          options={{ headerShown: false }}
        />
        {screenName == "" ? (
          <Stack.Screen
            name="main"
            component={MainDrawerScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="main"
            component={FullMainDrawerScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
