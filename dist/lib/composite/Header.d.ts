import { FC } from "react";
import { ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export interface RightActionConfig {
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
}
export interface HeaderProps {
    title: string;
    ns?: string;
    rightAction?: RightActionConfig;
    leftAction?: RightActionConfig;
    style?: ViewStyle;
    hiddenLeftAction?: boolean;
    variant?: "primary" | "secondary" | "danger";
    customGradientColors?: [string, string, ...string[]];
}
export declare const Header: FC<HeaderProps>;
