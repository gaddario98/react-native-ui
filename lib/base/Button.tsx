import React, { useMemo, useCallback, memo } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  Alert,
  Pressable,
  Platform,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "../../styles";
import { TOptions } from "i18next";

export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "success"
  | "warning";
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

const radiusMap: Record<ButtonShape, number> = {
  square: 0,
  rounded: 8,
  pill: 9999,
};

const useButtonColors = (theme: ReturnType<typeof useThemeColors>) => {
  return useMemo(
    () => ({
      primary: {
        main: theme.primary,
        contrast: theme.onPrimary,
      },
      secondary: {
        main: theme.secondary,
        contrast: theme.onSecondary,
      },
      tertiary: {
        main: theme.tertiary,
        contrast: theme.onTertiary,
      },
      error: {
        main: theme.error,
        contrast: theme.onError,
      },
      success: {
        main: "#4CAF50",
        contrast: "#fff",
      },
      warning: {
        main: "#FFC107",
        contrast: "#000",
      },
    }),
    [theme]
  );
};

const useButtonStyles = (props: ButtonProps, colorSet: any) => {
  const getButtonStyles = useCallback(
    (pressed: boolean): ViewStyle => ({
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        props.variant === "contained"
          ? colorSet.main
          : props.variant === "outlined" || props.variant === "text"
            ? "transparent"
            : colorSet.main,
      borderWidth: props.variant === "outlined" ? 2 : 0,
      borderColor: props.variant === "outlined" ? colorSet.main : "transparent",
      paddingHorizontal: props.compact ? 12 : 20,
      paddingVertical: props.compact ? 6 : 12,
      borderRadius: radiusMap[props.shape || "rounded"],
      opacity: props.disabled ? 0.5 : pressed ? 0.8 : 1,
      width: props.fullWidth ? "100%" : undefined,
      ...(props.iconOnly && {
        width: props.compact ? 36 : 44,
        height: props.compact ? 36 : 44,
        padding: 0,
        paddingHorizontal:0,
        paddingVertical: 0,
        aspectRatio: 1,
      }),
      ...props.style,
      ...(props.variant === "text" && {
        padding: 0,
        paddingHorizontal:0,
        paddingVertical: 0,
      })
    }),
    [props, colorSet]
  );

  const textStyles = useMemo(
    (): TextStyle => ({
      color: props.variant === "contained" ? colorSet.contrast : colorSet.main,
      textTransform: props.uppercase ? "uppercase" : "none",
      fontWeight: "600",
      fontSize: props.size === "small" ? 13 : props.size === "large" ? 17 : 15,
      textAlign: "center",
      marginHorizontal: 6,
      ...props.labelStyle,
    }),
    [props, colorSet]
  );

  return { getButtonStyles, textStyles };
};

export const Button: React.FC<ButtonProps> = memo(
  ({
    text,
    children,
    variant = "contained",
    color = "primary",
    shape = "rounded",
    size = "medium",
    iconOnly = false,
    fullWidth = false,
    compact = false,
    uppercase = false,
    loading = false,
    disabled = false,
    startIcon,
    endIcon,
    labelStyle,
    style,
    loadingText,
    requireConfirm,
    ns = "buttons",
    textTransOption,
    onPress,
    onClick,
  }) => {
    const { t } = useTranslation(ns);
    const theme = useThemeColors();
    const COLORS = useButtonColors(theme);
    const colorSet = COLORS[color];
    const { getButtonStyles, textStyles } = useButtonStyles(
      {
        variant,
        shape,
        disabled,
        compact,
        fullWidth,
        iconOnly,
        style,
        labelStyle,
        size,
        uppercase,
      },
      colorSet
    );

    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 20,
        bounciness: 4,
      }).start();
    }, [scaleAnim]);

    const handlePressOut = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 4,
      }).start();
    }, [scaleAnim]);

    const handlePress = useCallback(
      (e: GestureResponderEvent) => {
        e.stopPropagation?.();
        if (requireConfirm) {
          if (Platform.OS === "web") {
            const confirmed = window.confirm(t(requireConfirm.text));
            if (confirmed) {
              onClick?.(e);
              onPress?.(e);
            }
          } else {
            Alert.alert(t("confirm"), t(requireConfirm.text), [
              { text: t("cancel"), style: "cancel" },
              {
                text: t("ok"),
                onPress: () => {
                  onClick?.(e);
                  onPress?.(e);
                },
              },
            ]);
          }
        } else {
          onClick?.(e);
          onPress?.(e);
        }
      },
      [onClick, onPress, requireConfirm, t]
    );

    return (
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        style={style}
      >
        {({ pressed }) => (
          <Animated.View style={[getButtonStyles(pressed), { transform: [{ scale: scaleAnim }] }]}>
            {loading && (
              <ActivityIndicator
                size="small"
                color={
                  variant === "contained" ? colorSet.contrast : colorSet.main
                }
                style={{ marginRight: 6 }}
              />
            )}
            {startIcon && !loading && (
              <Ionicons
                name={startIcon.name}
                size={startIcon.size || 20}
                color={
                  startIcon.color ||
                  (variant === "contained" ? colorSet.contrast : colorSet.main)
                }
                style={{ marginRight: 4 }}
              />
            )}
            {!iconOnly && (
              <Text style={textStyles}>
                {loading && loadingText
                  ? t(loadingText, textTransOption)
                  : children || t(text ?? "", textTransOption)}
              </Text>
            )}
            {endIcon && !loading && (
              <Ionicons
                name={endIcon.name}
                size={endIcon.size || 20}
                color={
                  endIcon.color ||
                  (variant === "contained" ? colorSet.contrast : colorSet.main)
                }
                style={{ marginLeft: 4 }}
              />
            )}
          </Animated.View>
        )}
      </Pressable>
    );
  }
);
