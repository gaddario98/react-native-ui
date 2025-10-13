import { useMemo } from "react";
import { useColorScheme } from "react-native";

let Colors = {
  light: {
    primary: "#6366F1", // Modern indigo
    onPrimary: "#ffffff",
    primaryContainer: "#E0E7FF",
    onPrimaryContainer: "#001BFF",
    secondary: "#F59E0B", // Modern amber
    onSecondary: "#ffffff",
    secondaryContainer: "#FFF7ED",
    onSecondaryContainer: "#451A03",
    tertiary: "#EC4899", // Modern pink
    onTertiary: "#ffffff",
    tertiaryContainer: "#FDF2F8",
    onTertiaryContainer: "#9D174D",
    error: "#EF4444",
    onError: "#ffffff",
    errorContainer: "#FEF2F2",
    onErrorContainer: "#991B1B",
    background: "#FAFAFA",
    onBackground: "#1F2937",
    surface: "#ffffff",
    onSurface: "#1F2937",
    surfaceVariant: "#F3F4F6",
    onSurfaceVariant: "#6B7280",
    outline: "#D1D5DB",
    outlineVariant: "#E5E7EB",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#1F2937",
    inverseOnSurface: "#FAFAFA",
    inversePrimary: "#6366F1",
    elevation: {
      level0: "transparent",
      level1: "#FAFAFA",
      level2: "#F3F4F6",
      level3: "#E0E7FF",
      level4: "#FFF7ED",
      level5: "#FDF2F8",
    },
    surfaceDisabled: "rgba(31, 41, 55, 0.12)",
    onSurfaceDisabled: "rgba(31, 41, 55, 0.38)",
    backdrop: "rgba(31, 41, 55, 0.08)",
    complementary: "#10B981",
    onComplementary: "#ffffff",
    complementaryContainer: "#ECFDF5",
    onComplementaryContainer: "#064E3B",
    analogous: "#F97316",
    onAnalogous: "#ffffff",
    analogousContainer: "#FFF7ED",
    onAnalogousContainer: "#9A3412",
    analogousTwo: "#8B5CF6",
    onAnalogousTwo: "#ffffff",
    analogousTwoContainer: "#F3E8FF",
    onAnalogousTwoContainer: "#581C87",
    triadic: "#06B6D4",
    onTriadic: "#ffffff",
    triadicContainer: "#ECFEFF",
    onTriadicContainer: "#164E63",
    triadicTwo: "#84CC16",
    onTriadicTwo: "#ffffff",
    triadicTwoContainer: "#F7FEE7",
    onTriadicTwoContainer: "#365314",
  },
  dark: {
    primary: "#818CF8",
    onPrimary: "#ffffff",
    primaryContainer: "#1E1B4B",
    onPrimaryContainer: "#E0E7FF",
    secondary: "#FBBF24",
    onSecondary: "#ffffff",
    secondaryContainer: "#451A03",
    onSecondaryContainer: "#FFF7ED",
    tertiary: "#F472B6",
    onTertiary: "#ffffff",
    tertiaryContainer: "#9D174D",
    onTertiaryContainer: "#FDF2F8",
    error: "#F87171",
    onError: "#ffffff",
    errorContainer: "#991B1B",
    onErrorContainer: "#FEF2F2",
    background: "#111827",
    onBackground: "#F9FAFB",
    surface: "#1F2937",
    onSurface: "#F9FAFB",
    surfaceVariant: "#374151",
    onSurfaceVariant: "#D1D5DB",
    outline: "#4B5563",
    outlineVariant: "#6B7280",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#F9FAFB",
    inverseOnSurface: "#111827",
    inversePrimary: "#6366F1",
    elevation: {
      level0: "transparent",
      level1: "#1F2937",
      level2: "#374151",
      level3: "#1E1B4B",
      level4: "#451A03",
      level5: "#9D174D",
    },
    surfaceDisabled: "rgba(249, 250, 251, 0.12)",
    onSurfaceDisabled: "rgba(249, 250, 251, 0.38)",
    backdrop: "rgba(249, 250, 251, 0.08)",
    complementary: "#34D399",
    onComplementary: "#ffffff",
    complementaryContainer: "#064E3B",
    onComplementaryContainer: "#ECFDF5",
    analogous: "#FB923C",
    onAnalogous: "#ffffff",
    analogousContainer: "#9A3412",
    onAnalogousContainer: "#FFF7ED",
    analogousTwo: "#A78BFA",
    onAnalogousTwo: "#ffffff",
    analogousTwoContainer: "#581C87",
    onAnalogousTwoContainer: "#F3E8FF",
    triadic: "#22D3EE",
    onTriadic: "#ffffff",
    triadicContainer: "#164E63",
    onTriadicContainer: "#ECFEFF",
    triadicTwo: "#A3E635",
    onTriadicTwo: "#ffffff",
    triadicTwoContainer: "#365314",
    onTriadicTwoContainer: "#F7FEE7",
  },
  disableDarkMode: false,
};

const setColors = (colors: typeof Colors) => {
  Colors = colors;
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();

  return useMemo(
    () =>
      !Colors?.disableDarkMode && colorScheme === "dark"
        ? Colors.dark
        : Colors.light,
    []
  );
};

export { Colors, setColors, useThemeColors };
