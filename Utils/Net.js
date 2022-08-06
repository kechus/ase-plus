import { getItemFromStorage, storeItem } from "./FileHandling";
import { login, fetchSchedule } from "./Service";
import { parseHTML } from "./ParserHTML";


export const tryLogin = async () => {
	try {
		const me = await getItemFromStorage("me");
		const message = await login(me);
		if (message !== "SUCCESS") {
			return message;
		}
		const scheduleHTML = await fetchSchedule();
		const scheduleObject = parseHTML(scheduleHTML);
		await storeItem(scheduleObject, "schedule");
    	return "SUCCESS"
  } catch (error) {
		return 'Error de login, intenta haciendo logout'
	}
};
