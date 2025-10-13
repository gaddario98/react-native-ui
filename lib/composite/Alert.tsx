import { TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";
import { ComponentProps, memo, useMemo } from "react";
import { StyleSheet, StyleProp, ViewStyle, Platform, View } from "react-native";
import { Text } from "../base";
import { useThemeColors } from "../../styles";

type AlertType = "success" | "error" | "info" | "warning";

export interface AlertProps {
  message: string;
  type?: AlertType;
  style?: StyleProp<ViewStyle>;
  textTransOption?: TOptionsBase & $Dictionary;
  ns?: string;
  textProps?: Omit<ComponentProps<typeof Text>, "text">;
}

const getNotificationColors = (type: AlertType) => {
  const theme = useThemeColors();
  const THEME_COLORS = useMemo(() => theme, []);
  switch (type) {
    case "success":
      return {
        background: THEME_COLORS.primaryContainer,
        text: THEME_COLORS.onPrimaryContainer,
        border: THEME_COLORS.primary,
      };
    case "error":
      return {
        background: THEME_COLORS.errorContainer,
        text: THEME_COLORS.onErrorContainer,
        border: THEME_COLORS.error,
      };
    case "warning":
      return {
        background: THEME_COLORS.tertiaryContainer,
        text: THEME_COLORS.onTertiaryContainer,
        border: THEME_COLORS.tertiary,
      };
    case "info":
      return {
        background: THEME_COLORS.secondaryContainer,
        text: THEME_COLORS.onSecondaryContainer,
        border: THEME_COLORS.secondary,
      };
    default:
      return {
        background: THEME_COLORS.primaryContainer,
        text: THEME_COLORS.onPrimaryContainer,
        border: THEME_COLORS.primary,
      };
  }
};

const Alert: React.FC<AlertProps> = ({
  message,
  type = "info",
  style,
  ns = "alert",
  textTransOption,
  textProps,
}) => {
  const colors = getNotificationColors(type);
  if (!message) {
    return;
  }
  return (
    <View
      style={[
        styles.container,
        {
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
        {...textProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
  message: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
});

export default memo(Alert);
