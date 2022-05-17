import { View } from "react-native";
import { useEffect, useState } from "react";
import { globalStyles, TextSizes, TextTypes } from "../styles/global";
import { getItemFromStorage, storeItem } from "../Utils/FileHandling";
import CustomText from "../components/CustomText";
import ScreenName from "../components/ScreenName";

const SCREEN_NAMES = ["Horario del día", "Horario Completo", "Calificaciones"];

const Config = () => {
  const [selectedScreenName, setSelectedScreenName] = useState("");

  useEffect(() => {
    const tryGetScreenName = async () => {
      const preferedScreenName = await getItemFromStorage("screenName");
      if (preferedScreenName) {
        setSelectedScreenName(preferedScreenName.name);
      }
    };

    tryGetScreenName();
  }, []);

  const nameChanged = async (i) => {
    const selectedName = SCREEN_NAMES[i];
    await storeItem({ name: selectedName }, "screenName");
    setSelectedScreenName(selectedName);
  };

  return (
    <View style={globalStyles.drawerBody}>
      <CustomText
        text={"Pantalla inicial: "}
        type={TextTypes.bold}
        size={TextSizes.h1}
      />

      {SCREEN_NAMES.map((name, i) => {
        const isSelected = selectedScreenName === name;
        return (
          <ScreenName
            key={i}
            values={{ name: name, index: i, isSelected: isSelected }}
            onNameSelect={nameChanged}
          />
        );
      })}
    </View>
  );
};

export default Config;
