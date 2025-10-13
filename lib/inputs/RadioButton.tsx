import { useCallback, useEffect, useMemo } from "react";
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

export interface RadioButtonProps {
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  styleView?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  size?: number;
  value?: boolean | undefined;
  onChange?: (value: boolean) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value = false,
  onChange,
  label,
  disabled = false,
  errorMessage,
  variant = "primary",
  styleView,
  labelStyle,
  size = 20,
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
  const innerScale = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    innerScale.value = value ? 1 : 0;
  }, [value, innerScale]);

  const handlePress = useCallback(() => {
    if (disabled || value) return;

    scale.value = withSequence(
      withTiming(0.8, { duration: 50 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 50 })
    );

    innerScale.value = withTiming(1, { duration: 150 });
    onChange?.(!value);
  }, [disabled, value, onChange, scale, innerScale]);

  const radioAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const innerCircleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: innerScale.value }],
  }));

  const color = useMemo(
    () =>
      disabled ? "#9E9E9E" : errorMessage ? "#B00020" : THEME_COLORS[variant],
    [THEME_COLORS, disabled, errorMessage, variant]
  );

  const containerSize = useMemo(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  const innerSize = useMemo(() => size * 0.5, [size]);

  const renderRadio = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.radio,
          containerSize,
          {
            borderColor: color,
            borderWidth: 2,
            borderRadius: size,
          },
          radioAnimatedStyle,
        ]}
      >
        {value && (
          <Animated.View
            style={[
              styles.innerCircle,
              {
                width: innerSize,
                height: innerSize,
                borderRadius: innerSize / 2,
                backgroundColor: color,
              },
              innerCircleAnimatedStyle,
            ]}
          />
        )}
      </Animated.View>
    );
  }, [
    color,
    containerSize,
    innerCircleAnimatedStyle,
    innerSize,
    radioAnimatedStyle,
    size,
    value,
  ]);

  const rippleSize = useMemo(() => size * 2, [size]);

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
          {renderRadio}
        </View>
        {label && (
          <Text
            style={[
              paragraphText,
              { color: disabled ? "#9E9E9E" : "#000000" },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  innerCircle: {
    position: "absolute",
    shadowColor: '#4F8AFA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  radio: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 24,
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
  rippleContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 24,
    padding: 4,
  },
  touchable: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 24,
    marginBottom: 8,
  },
});

export default RadioButton;
