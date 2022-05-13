import * as Notifications from "expo-notifications";
import { getItemFromStorage } from "../Utils/FileHandling";
import { getNotificationTime } from "./Time";

export const scheduleNotification = async (info) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: info.subject,
      body: info.place,
    },
    trigger: {
      hour: info.time.hour,
      minute: info.time.minute,
      weekday: info.weekday,
      repeats: true,
    },
  });
};

export const scheduleAllNotifications = async () => {
  const schedule = await getItemFromStorage("schedule");
  for (const row of schedule) {
    const time = getNotificationTime(row.time);
    //so that weekdays start from 2, that being monday
    let i = 2;
    for (const modulo of row.classes) {
      if (Object.keys(modulo).length === 0) {
        i++;
        continue;
      }
      await scheduleNotification({
        subject: modulo.materia,
        place: modulo.salon,
        time: time,
        weekday: i,
      });
      i++;
    }
  }
};
