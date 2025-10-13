import { StyleProp, ViewStyle, TextStyle } from "react-native";
export interface RadioButtonProps {
    disabled?: boolean;
    variant?: "primary" | "secondary" | "tertiary";
    styleView?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    size?: number;
    value?: boolean | undefined;
    onChange?: (value: boolean) => void;
    error?: boolean;
    errorMessage?: string;
    label?: string;
}
declare const RadioButton: React.FC<RadioButtonProps>;
export default RadioButton;
