import { TOptions } from "i18next";
import { ComponentProps, useEffect, useMemo, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Text as ReactText,
  StyleProp,
  View,
  ViewStyle,
  Animated,
  Easing,
  TouchableOpacity,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { Colors, contentLayoutRow, iconTitleSize } from "../../styles";
import { useTranslation } from "react-i18next";

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

export const Text: React.FC<TextProps> = ({
  props = {},
  text,
  icon,
  iconProps,
  numberOfLines,
  ns,
  textTransOption,
  contentStyle,
  loading,
  endIcon,
  endIconProps,
  onEndIconPress,
  endIconDisabled,
  disableTranslation,
  style,
}) => {
  const { t } = useTranslation(ns);
  const spinValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue.current, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.current.setValue(0);
    }
  }, [loading]);

  const spin = useMemo(
    () =>
      spinValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      }),
    []
  );

  // Memoized end icon rendering
  const renderEndIcon = useMemo(() => {
    if (loading) {
      return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <ActivityIndicator
            size="small"
            color={Colors.light.onPrimaryContainer}
            animating
          />
        </Animated.View>
      );
    }
    if (endIcon) {
      return (
        <TouchableOpacity
          onPress={onEndIconPress}
          disabled={endIconDisabled || loading}
        >
          <Ionicons name={endIcon} size={iconTitleSize} {...endIconProps} />
        </TouchableOpacity>
      );
    }
    return null;
  }, [endIcon, endIconDisabled, endIconProps, loading, onEndIconPress, spin]);

  // Early return if nothing to render
  if (!text && !icon && !endIcon && !loading) return null;

  return (
    <View
      style={[
        { flexShrink: 1, width: "100%", backgroundColor: "transparent" },
        contentLayoutRow,
        contentStyle,
      ]}
    >
      {icon ? (
        <Ionicons name={icon} size={iconTitleSize} {...iconProps} />
      ) : null}
      <ReactText
        {...props}
        style={[
          { flex: 1, backgroundColor: "transparent" },
          style,
          props.style,
        ]}
        numberOfLines={numberOfLines}
      >
        {disableTranslation ? (text ?? "") : t(text ?? "", textTransOption)}
      </ReactText>
      {renderEndIcon}
    </View>
  );
};
