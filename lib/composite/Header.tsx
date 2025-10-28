import { FC, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../base/Text";
import { iconTitleSize, sectionTitle, useThemeColors } from "../../styles";

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
  styleHeader?: ViewStyle;
  hiddenLeftAction?: boolean;
  variant?: "primary" | "secondary" | "danger";
  customGradientColors?: [string, string, ...string[]];
}

export const Header: FC<HeaderProps> = ({
  title,
  ns,
  rightAction,
  leftAction,
  hiddenLeftAction,
  style,
  variant = "primary",
  customGradientColors,
  styleHeader,
}) => {
  const theme = useThemeColors();
  const textColor = useMemo(() => theme.onSecondary, [theme]);

  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  useMemo(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const gradientColors = useMemo(() => {
    if (customGradientColors && customGradientColors.length > 0) {
      return customGradientColors;
    }
    switch (variant) {
      case "secondary":
        return [theme.secondary, theme.surface, theme.primary] as const;
      case "danger":
        return [theme.error, theme.error, theme.surface] as const;
      case "primary":
      default:
        return [theme.primary, theme.secondary, theme.surface] as const;
    }
  }, [theme, variant, customGradientColors]);

  return (
    <Animated.View style={[styles.container, style, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.header, styleHeader]}
      >
        <View style={styles.innerContent}>
          {!hiddenLeftAction && (
            <TouchableOpacity
              onPress={leftAction?.onPress}
              style={styles.iconButton}
              hitSlop={HIT_SLOP}
              activeOpacity={0.7}
            >
              <Ionicons
                name={leftAction?.icon ?? "arrow-back"}
                size={iconTitleSize + 6}
                color={textColor}
              />
            </TouchableOpacity>
          )}
          <Text
            ns={ns}
            text={title}
            numberOfLines={1}
            props={{
              style: [
                styles.title,
                sectionTitle,
                {
                  color: textColor,
                  fontWeight: "800",
                  fontSize: 24,
                  letterSpacing: 0.5,
                },
              ],
            }}
          />
          {rightAction && (
            <TouchableOpacity
              onPress={rightAction.onPress}
              style={styles.iconButton}
              hitSlop={HIT_SLOP}
              activeOpacity={0.7}
            >
              <Ionicons
                name={rightAction.icon}
                size={iconTitleSize + 6}
                color={textColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const HIT_SLOP = { top: 12, bottom: 12, left: 12, right: 12 };

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    zIndex: 100,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.04)",
    borderRadius: 12,
    justifyContent: "center",
    padding: 6,
  },
  innerContent: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    marginLeft: 4,
  },
});
