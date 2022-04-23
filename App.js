import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import About from "./screens/About";
import FullSchedule from "./screens/FullSchedule";

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="login"
          component={Login}
          options={{ title: "Login", headerShown: false }}
        ></stack.Screen>
        <stack.Screen
          name="home"
          component={Home}
          options={{ title: "Welcome", headerShown: false }}
        ></stack.Screen>
        <stack.Screen
          name="about"
          component={About}
          options={{ title: "About", headerShown: false }}
        ></stack.Screen>
        <stack.Screen
          name="full_schedule"
          component={FullSchedule}
          options={{ title: "Full schedule", headerShown: false }}
        ></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}
