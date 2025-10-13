import { TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";
import { StyleProp, ViewStyle } from "react-native";
type NotificationType = "success" | "error" | "info" | "warning";
interface NotificationProps {
    message: string;
    type?: NotificationType;
    visible?: boolean;
    onDismiss?: () => void;
    autoHideDuration?: number;
    style?: StyleProp<ViewStyle>;
    textTransOption?: TOptionsBase & $Dictionary;
    ns?: string;
}
declare const Notification: React.FC<NotificationProps>;
export default Notification;
