import { TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";
import { useEffect, useCallback, useRef, useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import { useThemeColors } from "../../../styles";
import { Text } from "../../base";
import { Ionicons } from "@expo/vector-icons";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationProps {
  message: string;
  type?: NotificationType;
  visible?: boolean;
  onDismiss?: () => void;
  autoHideDuration?: number;
  style?: StyleProp<ViewStyle>;
  textTransOption?: TOptionsBase & $Dictionary;
  ns?: string;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  visible = true,
  onDismiss,
  autoHideDuration = 5000,
  style,
  ns,
  textTransOption,
}) => {
  const theme = useThemeColors();
  const colors = useMemo(() => {
    switch (type) {
      case "success":
        return {
          background: theme.primaryContainer,
          text: theme.onPrimaryContainer,
          border: theme.primary,
        };
      case "error":
        return {
          background: "#FFEBEE",
          text: "#B00020",
          border: "#B00020",
        };
      case "warning":
        return {
          background: theme.tertiaryContainer,
          text: theme.onTertiaryContainer,
          border: theme.tertiary,
        };
      case "info":
        return {
          background: theme.secondaryContainer,
          text: theme.onSecondaryContainer,
          border: theme.secondary,
        };
      default:
        return {
          background: theme.primaryContainer,
          text: theme.onPrimaryContainer,
          border: theme.primary,
        };
    }
  }, [
    theme.onPrimaryContainer,
    theme.onSecondaryContainer,
    theme.onTertiaryContainer,
    theme.primary,
    theme.primaryContainer,
    theme.secondary,
    theme.secondaryContainer,
    theme.tertiary,
    theme.tertiaryContainer,
    type,
  ]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDismiss?.();
    });
  }, [fadeAnim, onDismiss]);

  useEffect(() => {
    if (visible) {
      fadeIn();
      if (autoHideDuration && autoHideDuration > 0) {
        const timer = setTimeout(() => {
          fadeOut();
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    } else {
      fadeOut();
    }
  }, [visible, autoHideDuration, fadeIn, fadeOut]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Text
        text={message}
        ns={ns}
        textTransOption={textTransOption}
        props={{
          style: [styles.message, { color: colors.text }],
        }}
      />
      {onDismiss && (
        <TouchableOpacity onPress={fadeOut} style={styles.dismissButton}>
          <Ionicons name="close" size={20} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dismissButton: {
    marginLeft: 12,
    padding: 4,
  },
  message: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
});

export default Notification;
