import { ViewStyle, TextStyle } from "react-native";
import { ListItemModel, ListPress } from "./types";
import { ImageStyle } from "expo-image";
interface ItemProps extends ListItemModel {
    ns?: string;
    onPressGeneral?: ListPress | (() => void);
    customStyles?: {
        container?: ViewStyle;
        item?: ViewStyle;
        title?: TextStyle;
        description?: TextStyle;
        profilePicture?: ImageStyle;
    };
    defaultProfilePictureSize?: number;
}
declare const _default: import("react").MemoExoticComponent<({ iconRigth, rightButton, onPress, text, title, profilePicture, profilePictureSize, bottomButtom, ns, onPressGeneral, customStyles, defaultProfilePictureSize, disableDivider, }: ItemProps) => import("react/jsx-runtime").JSX.Element>;
export default _default;
