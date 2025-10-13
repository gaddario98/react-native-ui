import { StyleProp, ViewStyle, TextStyle } from "react-native";
export interface CheckboxProps {
    disabled?: boolean;
    variant?: "primary" | "secondary" | "tertiary";
    styleView?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    size?: number;
    indeterminate?: boolean;
    value?: boolean | undefined;
    onChange?: (value: boolean) => void;
    error?: boolean;
    errorMessage?: string;
    label?: string;
}
declare const _default: import("react").NamedExoticComponent<CheckboxProps>;
export default _default;
