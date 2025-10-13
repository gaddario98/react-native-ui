import React from "react";
import { ViewStyle, TextStyle, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TOptions } from "i18next";
export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonColor = "primary" | "secondary" | "tertiary" | "error" | "success" | "warning";
export type ButtonShape = "rounded" | "square" | "pill";
export type ButtonSize = "small" | "medium" | "large";
interface IconProps {
    name: keyof typeof Ionicons.glyphMap;
    size?: number;
    color?: string;
}
interface RequireConfirmConfig {
    text: string;
}
interface ButtonProps {
    text?: string;
    children?: React.ReactNode;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    shape?: ButtonShape;
    startIcon?: IconProps;
    endIcon?: IconProps;
    iconOnly?: boolean;
    fullWidth?: boolean;
    compact?: boolean;
    loading?: boolean;
    disabled?: boolean;
    uppercase?: boolean;
    loadingText?: string;
    textTransOption?: TOptions;
    labelStyle?: TextStyle;
    style?: ViewStyle;
    requireConfirm?: RequireConfirmConfig;
    ns?: string;
    onPress?: (e: GestureResponderEvent) => void;
    onClick?: (e: GestureResponderEvent) => void;
}
export declare const Button: React.FC<ButtonProps>;
export {};
