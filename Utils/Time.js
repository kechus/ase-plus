import moment from "moment";
import "moment/locale/es-mx";
moment.locale("es-mx");

const format = "hh:mm";

export const momentIsInHour = (hour) => {
  const [bottomLimit, upperLimit] = hour.split("-").map((str) => str.trim());
  const currentTime = moment();
  const bottomTime = moment(bottomLimit, format);
  const upperTime = moment(upperLimit, format);

  return currentTime.isBetween(bottomTime, upperTime);
};

export const selectTodaysWeekday = () => {
  //offset so that lunes is 0 and sabado 5
  const numberOfWeek = moment().day() - 1;
  return numberOfWeek === -1 ? 0 : numberOfWeek;
};

export const getNotificationTime = (time) => {
  const firstTime = time.split(" - ")[0];
  const firstTimeMinusMinutes = moment(firstTime, format).subtract(5, "minute");
  return {
    hour: firstTimeMinusMinutes.hour(),
    minute: firstTimeMinusMinutes.minute(),
  };
};

