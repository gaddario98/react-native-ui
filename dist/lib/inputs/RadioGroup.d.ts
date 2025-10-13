import { StyleProp, ViewStyle } from "react-native";
interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface RadioGroupProps {
    radioOptions?: RadioOption[];
    variant?: "primary" | "secondary" | "tertiary";
    styleView?: StyleProp<ViewStyle>;
    disabled?: boolean;
    direction?: "horizontal" | "vertical";
    value?: string | undefined;
    onChange?: (value: string) => void;
    error?: boolean;
    errorMessage?: string;
    label?: string;
}
declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
