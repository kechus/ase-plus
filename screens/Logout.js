import * as Notifications from "expo-notifications";
import { View } from "react-native";
import { useEffect } from "react";

const Logout = (props) => {
  useEffect(() => {
    const cancelNotifications = async () => {
      await Notifications.cancelAllScheduledNotificationsAsync();
    };
    props.navigation.navigate("initial");
    cancelNotifications();
  }, []);

  return <View></View>;
};

export default Logout;
