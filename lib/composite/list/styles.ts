import { StyleSheet } from "react-native";
import { useThemeColors } from "../../../styles/colors";

export const useListStyles = () => {
  const colors = useThemeColors();
  return StyleSheet.create({
    content: {
      flex: 1,
      flexShrink: 1,
      gap: 6,
      justifyContent: "center",
    },
    divider: {
      backgroundColor: colors.outline,
      borderRadius: 1,
      height: 1,
      marginVertical: 2,
      opacity: 0.7,
    },
    icon: {
      color: colors.primary,
      fontSize: 24,
      opacity: 0.85,
    },
    leftIcon: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    listItem: {
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 18,
      elevation: 5,
      flexDirection: "row",
      padding: 12,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3.84,
    },
    listSection: {
      borderRadius: 24,
    },
    profilePicture: {
      borderRadius: 999,
    },
    rightButton: {
      borderRadius: 12,
      minWidth: "auto",
      paddingHorizontal: 8,
    },
    rightIcon: {
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 16,
    },
    touchableContent: {
      alignItems: "center",
      borderRadius: 18,
      flex: 1,
      flexDirection: "row",
    },
  });
};
