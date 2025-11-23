import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  ComponentProps,
  memo,
  useLayoutEffect,
} from "react";
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  InputModeOptions,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../base";
import {
  iconTitleSize,
  inputLabel,
  paragraphText,
  useThemeColors,
} from "../../styles";

type InputType =
  | "email"
  | "password"
  | "phone"
  | "text"
  | "number"
  | "textarea";

const INPUT_TYPES: Record<string, InputType> = {
  EMAIL: "email",
  PASSWORD: "password",
  PHONE: "phone",
  TEXT: "text",
  NUMBER: "number",
  TEXTAREA: "textarea",
};

export type TextInputProps = {
  type?: InputType;
  onValidationChange?: (isValid: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  min?: number;
  max?: number;
  variant?: "primary" | "secondary" | "tertiary";
  startIcon?: ComponentProps<typeof Ionicons>["name"];
  endIcon?: ComponentProps<typeof Ionicons>["name"];
  onEndIconPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  debounceTime?: number;
  value?: string | undefined;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  ns?: string;
} & Omit<RNTextInputProps, "style" | "onChange">;

const TextInput: React.FC<TextInputProps> = ({
  label,
  value = "",
  onChange,
  placeholder = "",
  errorMessage = "",
  type = INPUT_TYPES.TEXT,
  containerStyle,
  inputStyle,
  min,
  max,
  variant = "primary",
  startIcon,
  endIcon,
  onEndIconPress,
  disabled = false,
  loading = false,
  debounceTime = 600,
  ns,
  ...restProps
}) => {
  // Stato e refs
  const [isFocused, setIsFocused] = useState(false);
  //const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spinValue = useRef(new Animated.Value(0));
  const spinInterpolation = useRef<Animated.AnimatedInterpolation<
    string | number
  > | null>(null);
  const theme = useThemeColors();

  useLayoutEffect(() => {
    if (spinInterpolation.current == null) {
      spinInterpolation.current = spinValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      });
    }
  }, []);

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

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

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
    [theme]
  );
  /*
  const validateInput = useCallback(
    (text: string) => {
      if (!text || type === "text") {
        setValidationError("");
        onValidationChange?.(true);
        return;
      }
      // Validazione per email, phone, password ecc.
      let pattern: RegExp | undefined;
      let message = "";
      if (type === "email") {
        pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        message = "Inserisci un indirizzo email valido";
      } else if (type === "phone") {
        pattern = /^\+?[0-9]{10,14}$/;
        message = "Inserisci un numero di telefono valido (10-14 numeri)";
      } else if (type === "password") {
        pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        message =
          "La password deve contenere almeno 8 caratteri, una lettera e un numero";
      }
      const isValid = pattern ? pattern.test(text) : true;
      setValidationError(isValid ? "" : message);
      onValidationChange?.(isValid);
    },
    [type, onValidationChange]
  );*/

  const handleChangeText = useCallback(
    (text: string) => {
      let formattedText = text;
      if (type === "phone") {
        formattedText = text.replace(/[^\d+]/g, "");
      } else if (type === "number") {
        if (text === "") {
          formattedText = "";
        } else {
          const num = parseInt(text.replace(/\D/g, ""));
          if (!isNaN(num)) {
            if (min !== undefined && num < min) {
              formattedText = min.toString();
            } else if (max !== undefined && num > max) {
              formattedText = max.toString();
            } else {
              formattedText = num.toString();
            }
          } else {
            formattedText = "";
          }
        }
      }
      setLocalValue(formattedText);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        onChange?.(formattedText);
        //   validateInput(formattedText);
      }, debounceTime);
    },
    [type, onChange, min, max, debounceTime]
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  /**/ const handleBlur = useCallback(() => {
    setIsFocused(false);
    // validateInput(value);
  }, []);

  const togglePasswordVisibility = useCallback(
    () => setShowPassword((prev) => !prev),
    []
  );

  const textColor = useMemo(
    () => (isFocused ? THEME_COLORS[variant] : theme.onBackground),
    [THEME_COLORS, isFocused, theme, variant]
  );

  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: theme.background,
        borderColor: isFocused ? THEME_COLORS[variant] : "#ccc",
      },
      disabled && styles.disabledContainer,
    ],
    [theme, isFocused, THEME_COLORS, variant, disabled]
  );

  const inputStyles = useMemo(
    () => [
      styles.input,
      inputLabel,
      { color: disabled ? theme.onSurfaceDisabled : textColor },
      inputStyle,
      { outline: 0 },
    ],
    [disabled, theme.onSurfaceDisabled, textColor, inputStyle]
  );

  const iconColor = useMemo(
    () => (disabled ? theme.onSurfaceDisabled : textColor),
    [disabled, theme.onSurfaceDisabled, textColor]
  );

  const inputMode = useMemo((): InputModeOptions => {
    switch (type) {
      case "email":
        return "email";
      case "number":
        return "numeric";
      case "phone":
        return "tel";
      default:
        return "text";
    }
  }, [type]);

  const renderEndIcon = useCallback(() => {
    if (loading && spinInterpolation.current) {
      return (
        <Animated.View
          style={{ transform: [{ rotate: spinInterpolation.current }] }}
        >
          <Ionicons name="sync" size={iconTitleSize} color={iconColor} />
        </Animated.View>
      );
    }
    if (type === "password") {
      return (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={iconTitleSize}
            color={iconColor}
          />
        </TouchableOpacity>
      );
    }
    if (endIcon) {
      return (
        <TouchableOpacity
          onPress={onEndIconPress}
          disabled={disabled || loading}
        >
          <Ionicons name={endIcon} size={24} color={iconColor} />
        </TouchableOpacity>
      );
    }
    return null;
  }, [
    loading,
    type,
    endIcon,
    iconColor,
    togglePasswordVisibility,
    showPassword,
    onEndIconPress,
    disabled,
  ]);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        // Usa il tuo componente Text custom per il label
        <Text
          text={label}
          style={[styles.label, paragraphText, { color: theme.onBackground }]}
          ns={ns}
        />
      ) : null}
      <View style={containerStyles}>
        {startIcon && (
          <Ionicons
            name={startIcon}
            size={iconTitleSize}
            color={iconColor}
            style={[styles.icon, { color: iconColor }]}
          />
        )}
        <RNTextInput
          style={[
            inputStyles as StyleProp<TextStyle>,
            type === "textarea" && { height: "100%", textAlignVertical: "top" },
          ]}
          multiline={type === "textarea"}
          numberOfLines={type === "textarea" ? 10 : undefined}
          value={localValue?.toString()}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={textColor}
          secureTextEntry={type === "password" && !showPassword}
          inputMode={inputMode}
          editable={!disabled && !loading}
          {...restProps}
        />

        {/* eslint-disable-next-line react-hooks/refs */}
        {renderEndIcon()}
      </View>
      {errorMessage ? (
        <Text
          text={errorMessage}
          style={[styles.errorText, paragraphText, { color: theme.error }]}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderColor: "#E3F0FF",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    padding: 16,
    width: "100%",
  },
  disabledContainer: {
    backgroundColor: "rgba(240,241,245,0.7)",
    borderColor: "#E0E0E0",
    opacity: 0.5,
  },
  errorText: {
    color: "#B00020",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    color: "#222",
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.1,
    margin: 0,
    marginVertical: 0,
    padding: 0,
    paddingVertical: 0,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.1,
    marginBottom: 6,
  },
  wrapper: {
    width: "100%",
  },
});

export default memo(TextInput);
