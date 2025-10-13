import { ComponentProps } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { FieldValues, Path } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
export interface DropdownOption<T extends FieldValues> {
    label: string | number;
    value: T[Path<T>];
}
type DropdownProps<T extends FieldValues> = {
    options?: Array<DropdownOption<T>>;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "tertiary";
    styleView?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    multiSelect?: boolean;
    placeholder?: string;
    ns?: string;
    icon?: ComponentProps<typeof Ionicons>["name"];
    disableTranslation?: boolean;
    loading?: boolean;
    isCloseIconHidden?: boolean;
    value?: any | undefined;
    onChange?: (value: any) => void;
    error?: boolean;
    errorMessage?: string;
    label?: string;
};
declare const Dropdown: <T extends FieldValues>({ label, value, onChange, options, errorMessage, disabled, variant, styleView, labelStyle, multiSelect, placeholder, disableTranslation, icon, ns, loading, isCloseIconHidden, inputStyle, }: DropdownProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Dropdown;
