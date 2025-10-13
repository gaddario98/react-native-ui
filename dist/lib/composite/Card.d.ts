import React from "react";
import { ReactNode } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { ImageStyle } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, SocialLink } from "../base";
type SocialPlatform = "instagram" | "facebook" | "twitter" | "tiktok" | "linkedin" | "youtube" | "custom";
interface SocialLink {
    platform: SocialPlatform;
    username?: string;
    url?: string;
    text?: string;
    icon?: React.ReactNode;
}
interface IconProps {
    name: keyof typeof MaterialIcons.glyphMap;
    size?: number;
    color?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
export interface CardProps {
    title?: string | ReactNode;
    subtitle?: string | ReactNode;
    content?: string | ReactNode;
    image?: string;
    fallbackSource?: string;
    actions?: Array<React.ComponentProps<typeof Button>>;
    socialLinks?: SocialLink[];
    outlined?: boolean;
    elevated?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
    contentStyle?: StyleProp<TextStyle>;
    actionsContainerStyle?: StyleProp<ViewStyle>;
    socialContainerStyle?: StyleProp<ViewStyle>;
    ns?: string;
    onlyImage?: boolean;
    imageStyle?: StyleProp<ImageStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    imagePosition?: "left" | "right" | "bottom" | "top";
    icon?: IconProps;
}
declare const _default: React.NamedExoticComponent<CardProps>;
export default _default;
