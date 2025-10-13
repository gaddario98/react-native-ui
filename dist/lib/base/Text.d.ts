import { TOptions } from "i18next";
import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text as ReactText, StyleProp, ViewStyle, TextStyle } from "react-native";
export interface TextProps {
    text: string;
    props?: React.ComponentProps<typeof ReactText>;
    iconProps?: Partial<Omit<React.ComponentProps<typeof Ionicons>, "name">>;
    icon?: ComponentProps<typeof Ionicons>["name"];
    endIconProps?: Partial<Omit<React.ComponentProps<typeof Ionicons>, "name">>;
    endIcon?: ComponentProps<typeof Ionicons>["name"];
    numberOfLines?: number;
    textTransOption?: TOptions;
    ns?: string;
    contentStyle?: StyleProp<ViewStyle>;
    loading?: boolean;
    onEndIconPress?: () => void;
    endIconDisabled?: boolean;
    disableTranslation?: boolean;
    style?: StyleProp<TextStyle>;
}
export declare const Text: React.FC<TextProps>;
