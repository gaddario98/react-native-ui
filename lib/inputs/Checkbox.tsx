import { memo, useCallback, useMemo } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  useSharedValue,
} from "react-native-reanimated";
import { paragraphText, useThemeColors } from "../../styles";

export interface CheckboxProps {
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  styleView?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  size?: number;
  indeterminate?: boolean;
  value?: boolean | undefined;
  onChange?: (value: boolean) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value = false,
  onChange,
  label,
  disabled = false,
  error,
  variant = "primary",
  styleView,
  labelStyle,
  size = 22,
  indeterminate = false,
}) => {
  const theme = useThemeColors();
  const THEME_COLORS = useMemo(
    () => ({
      primary: theme.primary,
      onPrimary: theme.onPrimary,
      primaryContainer: theme.primaryContainer,
      onPrimaryContainer: theme.onPrimaryContainer,
      secondary: theme.secondary,
      onSecondary: theme.onSecondary,
      secondaryContainer: theme.secondaryContainer,
      onSecondaryContainer: theme.onSecondaryContainer,
      tertiary: theme.tertiary,
      onTertiary: theme.onTertiary,
      tertiaryContainer: theme.tertiaryContainer,
      onTertiaryContainer: theme.onTertiaryContainer,
    }),
    [
      theme.primary,
      theme.onPrimary,
      theme.primaryContainer,
      theme.onPrimaryContainer,
      theme.secondary,
      theme.onSecondary,
      theme.secondaryContainer,
      theme.onSecondaryContainer,
      theme.tertiary,
      theme.onTertiary,
      theme.tertiaryContainer,
      theme.onTertiaryContainer,
    ]
  );
  const scale = useSharedValue(1);
  const opacity = useSharedValue(value ? 1 : 0);

  const handlePress = useCallback(() => {
    if (disabled) return;

    scale.value = withSequence(
      withTiming(0.8, { duration: 50 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 50 })
    );

    opacity.value = withTiming(value ? 0 : 1, { duration: 150 });
    onChange?.(!value);
  }, [value, disabled, onChange, scale, opacity]);

  const checkboxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const color = disabled
    ? "#9E9E9E"
    : error
      ? "#B00020"
      : THEME_COLORS[variant];

  const containerSize = {
    width: size,
    height: size,
  };

  const renderCheckbox = () => (
    <Animated.View
      style={[
        styles.checkbox,
        containerSize,
        {
          borderColor: color,
          borderWidth: 2,
          borderRadius: 2,
          backgroundColor: value ? color : "transparent",
        },
        checkboxAnimatedStyle,
      ]}
    >
      {value && !indeterminate && (
        <Animated.Text
          style={[styles.checkmark, { fontSize: 15 }, checkmarkAnimatedStyle]}
        >
          ✓
        </Animated.Text>
      )}
      {indeterminate && (
        <View
          style={[
            styles.indeterminate,
            {
              backgroundColor: value ? THEME_COLORS.onPrimary : color,
              width: size * 0.6,
            },
          ]}
        />
      )}
    </Animated.View>
  );

  const rippleSize = size * 2;

  return (
    <View style={styleView}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.touchable,
          { minHeight: rippleSize, minWidth: rippleSize },
        ]}
        disabled={disabled}
      >
        <View
          style={[
            styles.rippleContainer,
            { width: rippleSize, height: rippleSize },
          ]}
        >
          {renderCheckbox()}
        </View>
        {label && (
          <Text
            style={[
              paragraphText,
              styles.label,
              { color: disabled ? "#9E9E9E" : "#000000" },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
      {error && <Text style={[paragraphText, styles.error]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
    borderWidth: 2,
    shadowColor: '#4F8AFA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  checkmark: {
    bottom: 2,
    color: "#ffffff",
    fontWeight: "bold",
    includeFontPadding: false,
    textAlign: "center",
    textShadowColor: '#4F8AFA',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  error: {
    color: "#B00020",
    marginTop: 4,
    paddingLeft: 36,
    fontWeight: '600',
    fontSize: 15,
  },
  indeterminate: {
    height: 2,
    borderRadius: 2,
  },
  label: {
    marginLeft: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#4F8AFA',
  },
  rippleContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 12,
    padding: 4,
  },
  touchable: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
});

export default memo(Checkbox);
