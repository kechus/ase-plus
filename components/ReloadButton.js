import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

const ReloadButton = (props) => {
    return (
        <TouchableOpacity onPress={()=> props.onReload()}>
            <Ionicons name='refresh' size={32}/>
        </TouchableOpacity>
    );
}

export default ReloadButton;