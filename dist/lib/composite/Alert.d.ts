import { TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";
import { ComponentProps } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Text } from "../base";
type AlertType = "success" | "error" | "info" | "warning";
export interface AlertProps {
    message: string;
    type?: AlertType;
    style?: StyleProp<ViewStyle>;
    textTransOption?: TOptionsBase & $Dictionary;
    ns?: string;
    textProps?: Omit<ComponentProps<typeof Text>, "text">;
}
declare const _default: import("react").NamedExoticComponent<AlertProps>;
export default _default;
