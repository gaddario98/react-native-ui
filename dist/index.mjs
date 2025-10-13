import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useMemo, memo, useCallback, useRef, useEffect, useState, createElement } from 'react';
import { useColorScheme, Animated, Platform, Alert as Alert$2, Pressable, ActivityIndicator, Text as Text$1, StyleSheet, Linking, TouchableOpacity, Easing, View, Dimensions, TouchableWithoutFeedback, ScrollView, Modal as Modal$2, Image as Image$2, TextInput as TextInput$2, useWindowDimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image as Image$1 } from 'expo-image';
import { appLinks, openLink } from '@gaddario98/react-native-utiles';
import { useNotificationState } from '@gaddario98/react-notifications';
export * from '@gaddario98/react-notifications';
import { useLoadingValue } from '@gaddario98/react-state';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isBefore, isAfter, isSameDay, isSameMonth, addDays, subYears, addYears } from 'date-fns';
import { it } from 'date-fns/locale';
import Animated$1, { useSharedValue, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';

// Default configuration object with all the parameters
let styleConfig = {
    truncateStyle: {
        numberOfLines: 1,
        ellipsizeMode: 'tail',
    },
    padding: 20, // più arioso
    gap: 14, // spacing moderno
    paragraphLayout: {
        paddingHorizontal: 20,
    },
    pageLayout: {
        flexDirection: 'column',
        gap: 14,
        flexGrow: 1,
    },
    fouterLayout: {
        flexDirection: 'column',
        gap: 14,
    },
    contentLayout: {
        flexDirection: 'column',
        gap: 14,
    },
    contentLayoutRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 38,
        fontWeight: '900',
        fontFamily: 'Roboto-Bold',
        letterSpacing: 0.5,
        color: '#222',
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: '800',
        fontFamily: 'Roboto-Bold',
        letterSpacing: 0.2,
        color: '#333',
    },
    sectionSubtitle: {
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        color: '#666',
    },
    sectionListItemTitle: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        color: '#444',
    },
    paragraphText: {
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        color: '#444',
        lineHeight: 26,
    },
    tabLabel: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
        color: '#555',
    },
    inputLabel: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Roboto-Medium',
        color: '#222',
    },
    buttonStyle: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        borderRadius: 24,
        letterSpacing: 0.2,
        color: '#fff',
    },
    iconTitleSize: 26,
};
/**
 * Allows the user to override the default style configuration during app startup.
 * This function merges the current configuration with the provided partial configuration.
 *
 * @param newConfig A partial configuration object containing the style properties to override.
 */
function setStyleConfig(newConfig) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    styleConfig = Object.assign(Object.assign(Object.assign({}, styleConfig), newConfig), { 
        // Override nested objects if provided. If a nested configuration is provided,
        // it will completely replace the old nested configuration.
        truncateStyle: (_a = newConfig.truncateStyle) !== null && _a !== void 0 ? _a : styleConfig.truncateStyle, paragraphLayout: (_b = newConfig.paragraphLayout) !== null && _b !== void 0 ? _b : styleConfig.paragraphLayout, pageLayout: (_c = newConfig.pageLayout) !== null && _c !== void 0 ? _c : styleConfig.pageLayout, fouterLayout: (_d = newConfig.fouterLayout) !== null && _d !== void 0 ? _d : styleConfig.fouterLayout, contentLayout: (_e = newConfig.contentLayout) !== null && _e !== void 0 ? _e : styleConfig.contentLayout, contentLayoutRow: (_f = newConfig.contentLayoutRow) !== null && _f !== void 0 ? _f : styleConfig.contentLayoutRow, headerTitle: (_g = newConfig.headerTitle) !== null && _g !== void 0 ? _g : styleConfig.headerTitle, sectionTitle: (_h = newConfig.sectionTitle) !== null && _h !== void 0 ? _h : styleConfig.sectionTitle, sectionSubtitle: (_j = newConfig.sectionSubtitle) !== null && _j !== void 0 ? _j : styleConfig.sectionSubtitle, sectionListItemTitle: (_k = newConfig.sectionListItemTitle) !== null && _k !== void 0 ? _k : styleConfig.sectionListItemTitle, paragraphText: (_l = newConfig.paragraphText) !== null && _l !== void 0 ? _l : styleConfig.paragraphText, tabLabel: (_m = newConfig.tabLabel) !== null && _m !== void 0 ? _m : styleConfig.tabLabel, inputLabel: (_o = newConfig.inputLabel) !== null && _o !== void 0 ? _o : styleConfig.inputLabel, buttonStyle: (_p = newConfig.buttonStyle) !== null && _p !== void 0 ? _p : styleConfig.buttonStyle });
}
/**
 * Returns the current style configuration.
 */
function getStyleConfig() {
    return styleConfig;
}
const { buttonStyle, contentLayout, contentLayoutRow, fouterLayout, gap, headerTitle, iconTitleSize, inputLabel, padding, pageLayout, paragraphLayout, paragraphText, sectionListItemTitle, sectionSubtitle, sectionTitle, tabLabel, truncateStyle, } = styleConfig;

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
const setColors = (colors) => {
    Colors = colors;
};
const useThemeColors = () => {
    const colorScheme = useColorScheme();
    return useMemo(() => !(Colors === null || Colors === void 0 ? void 0 : Colors.disableDarkMode) && colorScheme === "dark"
        ? Colors.dark
        : Colors.light, []);
};

const radiusMap = {
    square: 0,
    rounded: 8,
    pill: 9999,
};
const useButtonColors = (theme) => {
    return useMemo(() => ({
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
    }), [theme]);
};
const useButtonStyles = (props, colorSet) => {
    const getButtonStyles = useCallback((pressed) => (Object.assign(Object.assign(Object.assign({ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: props.variant === "contained"
            ? colorSet.main
            : props.variant === "outlined" || props.variant === "text"
                ? "transparent"
                : colorSet.main, borderWidth: props.variant === "outlined" ? 2 : 0, borderColor: props.variant === "outlined" ? colorSet.main : "transparent", paddingHorizontal: props.compact ? 12 : 20, paddingVertical: props.compact ? 6 : 12, borderRadius: radiusMap[props.shape || "rounded"], opacity: props.disabled ? 0.5 : pressed ? 0.8 : 1, width: props.fullWidth ? "100%" : undefined }, (props.iconOnly && {
        width: props.compact ? 36 : 44,
        height: props.compact ? 36 : 44,
        padding: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        aspectRatio: 1,
    })), props.style), (props.variant === "text" && {
        padding: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    }))), [props, colorSet]);
    const textStyles = useMemo(() => (Object.assign({ color: props.variant === "contained" ? colorSet.contrast : colorSet.main, textTransform: props.uppercase ? "uppercase" : "none", fontWeight: "600", fontSize: props.size === "small" ? 13 : props.size === "large" ? 17 : 15, textAlign: "center", marginHorizontal: 6 }, props.labelStyle)), [props, colorSet]);
    return { getButtonStyles, textStyles };
};
const Button = memo(({ text, children, variant = "contained", color = "primary", shape = "rounded", size = "medium", iconOnly = false, fullWidth = false, compact = false, uppercase = false, loading = false, disabled = false, startIcon, endIcon, labelStyle, style, loadingText, requireConfirm, ns = "buttons", textTransOption, onPress, onClick, }) => {
    const { t } = useTranslation(ns);
    const theme = useThemeColors();
    const COLORS = useButtonColors(theme);
    const colorSet = COLORS[color];
    const { getButtonStyles, textStyles } = useButtonStyles({
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
    }, colorSet);
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
    const handlePress = useCallback((e) => {
        var _a;
        (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
        if (requireConfirm) {
            if (Platform.OS === "web") {
                const confirmed = window.confirm(t(requireConfirm.text));
                if (confirmed) {
                    onClick === null || onClick === void 0 ? void 0 : onClick(e);
                    onPress === null || onPress === void 0 ? void 0 : onPress(e);
                }
            }
            else {
                Alert$2.alert(t("confirm"), t(requireConfirm.text), [
                    { text: t("cancel"), style: "cancel" },
                    {
                        text: t("ok"),
                        onPress: () => {
                            onClick === null || onClick === void 0 ? void 0 : onClick(e);
                            onPress === null || onPress === void 0 ? void 0 : onPress(e);
                        },
                    },
                ]);
            }
        }
        else {
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
            onPress === null || onPress === void 0 ? void 0 : onPress(e);
        }
    }, [onClick, onPress, requireConfirm, t]);
    return (jsx(Pressable, { onPressIn: handlePressIn, onPressOut: handlePressOut, onPress: handlePress, disabled: disabled || loading, style: style, children: ({ pressed }) => (jsxs(Animated.View, { style: [getButtonStyles(pressed), { transform: [{ scale: scaleAnim }] }], children: [loading && (jsx(ActivityIndicator, { size: "small", color: variant === "contained" ? colorSet.contrast : colorSet.main, style: { marginRight: 6 } })), startIcon && !loading && (jsx(Ionicons, { name: startIcon.name, size: startIcon.size || 20, color: startIcon.color ||
                        (variant === "contained" ? colorSet.contrast : colorSet.main), style: { marginRight: 4 } })), !iconOnly && (jsx(Text$1, { style: textStyles, children: loading && loadingText
                        ? t(loadingText, textTransOption)
                        : children || t(text !== null && text !== void 0 ? text : "", textTransOption) })), endIcon && !loading && (jsx(Ionicons, { name: endIcon.name, size: endIcon.size || 20, color: endIcon.color ||
                        (variant === "contained" ? colorSet.contrast : colorSet.main), style: { marginLeft: 4 } }))] })) }));
});

const SOCIAL_BASE_URLS = {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
    tiktok: "https://www.tiktok.com/@",
    linkedin: "https://www.linkedin.com/in/",
    youtube: "https://www.youtube.com/",
};
const SOCIAL_ICONS = {
    instagram: "instagram",
    facebook: "facebook",
    twitter: "twitter",
    tiktok: "music-note", // Alternativa per TikTok
    linkedin: "linkedin",
    youtube: "youtube",
    custom: "web",
};
const SOCIAL_COLORS = {
    instagram: "#E4405F",
    facebook: "#1877F2",
    twitter: "#1DA1F2",
    tiktok: "#000000",
    linkedin: "#0A66C2",
    youtube: "#FF0000",
    custom: "#6B7280",
};
const DEFAULT_ICON_SIZE = 26;
const SocialLink = ({ platform, username, url, text, icon, style, textStyle, onError, iconOnly = true, iconSize = DEFAULT_ICON_SIZE, iconColor, }) => {
    const handlePress = useCallback(async () => {
        try {
            let linkUrl = "";
            if (platform === "custom" && url) {
                linkUrl = url;
            }
            else if (username && platform !== "custom") {
                linkUrl = `${SOCIAL_BASE_URLS[platform]}${username}/`;
            }
            if (linkUrl) {
                await Linking.openURL(linkUrl);
            }
        }
        catch (error) {
            if (error instanceof Error && onError) {
                onError(error);
            }
            throw error;
        }
    }, [platform, username, url, onError]);
    const renderIcon = useCallback(() => {
        if (icon)
            return icon;
        const color = iconColor || SOCIAL_COLORS[platform];
        const iconName = SOCIAL_ICONS[platform];
        return (jsx(MaterialCommunityIcons, { name: iconName, size: iconSize, color: color }));
    }, [platform, icon, iconSize, iconColor]);
    const displayText = useMemo(() => text || platform, [platform, text]);
    if (!username && !url)
        return;
    return (jsx(TouchableOpacity, { style: [iconOnly && styles$g.iconOnly, contentLayoutRow, style], onPress: handlePress, activeOpacity: 0.7, children: jsxs(Fragment, { children: [renderIcon(), !iconOnly && displayText && (jsx(Text$1, { style: [styles$g.text, paragraphText, textStyle], numberOfLines: 1, children: displayText }))] }) }));
};
const styles$g = StyleSheet.create({
    iconOnly: {
        borderRadius: buttonStyle.borderRadius,
        padding: gap / 2,
        backgroundColor: Colors.light.surface,
    },
    text: {
        marginLeft: gap / 2,
        fontSize: tabLabel.fontSize,
        color: Colors.light.primary,
        fontWeight: "600",
    },
});

const Text = ({ props = {}, text, icon, iconProps, numberOfLines, ns, textTransOption, contentStyle, loading, endIcon, endIconProps, onEndIconPress, endIconDisabled, disableTranslation, style, }) => {
    const { t } = useTranslation(ns);
    const spinValue = useRef(new Animated.Value(0));
    useEffect(() => {
        if (loading) {
            Animated.loop(Animated.timing(spinValue.current, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })).start();
        }
        else {
            spinValue.current.setValue(0);
        }
    }, [loading]);
    const spin = useMemo(() => spinValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    }), []);
    // Memoized end icon rendering
    const renderEndIcon = useMemo(() => {
        if (loading) {
            return (jsx(Animated.View, { style: { transform: [{ rotate: spin }] }, children: jsx(ActivityIndicator, { size: "small", color: Colors.light.onPrimaryContainer, animating: true }) }));
        }
        if (endIcon) {
            return (jsx(TouchableOpacity, { onPress: onEndIconPress, disabled: endIconDisabled || loading, children: jsx(Ionicons, Object.assign({ name: endIcon, size: iconTitleSize }, endIconProps)) }));
        }
        return null;
    }, [endIcon, endIconDisabled, endIconProps, loading, onEndIconPress, spin]);
    // Early return if nothing to render
    if (!text && !icon && !endIcon && !loading)
        return null;
    return (jsxs(View, { style: [
            { flexShrink: 1, width: "100%", backgroundColor: "transparent" },
            contentLayoutRow,
            contentStyle,
        ], children: [icon ? (jsx(Ionicons, Object.assign({ name: icon, size: iconTitleSize }, iconProps))) : null, jsx(Text$1, Object.assign({}, props, { style: [
                    { flex: 1, backgroundColor: "transparent" },
                    style,
                    props.style,
                ], numberOfLines: numberOfLines, children: disableTranslation ? (text !== null && text !== void 0 ? text : "") : t(text !== null && text !== void 0 ? text : "", textTransOption) })), renderEndIcon] }));
};

const Header = ({ title, ns, rightAction, leftAction, hiddenLeftAction, style, variant = "primary", customGradientColors, }) => {
    var _a, _b;
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
                return [theme.secondary, theme.surface, theme.primary];
            case "danger":
                return [theme.error, theme.error, theme.surface];
            case "primary":
            default:
                return [theme.primary, theme.secondary, theme.surface];
        }
    }, [theme, variant, customGradientColors]);
    return (jsx(Animated.View, { style: [styles$f.container, style, { opacity: fadeAnim }], children: jsx(LinearGradient, { colors: gradientColors, start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, style: styles$f.header, children: jsxs(View, { style: styles$f.innerContent, children: [!hiddenLeftAction && (jsx(TouchableOpacity, { onPress: (_a = leftAction === null || leftAction === void 0 ? void 0 : leftAction.onPress) !== null && _a !== void 0 ? _a : router.back, style: styles$f.iconButton, hitSlop: HIT_SLOP, activeOpacity: 0.7, children: jsx(Ionicons, { name: (_b = leftAction === null || leftAction === void 0 ? void 0 : leftAction.icon) !== null && _b !== void 0 ? _b : "arrow-back", size: iconTitleSize + 6, color: textColor }) })), jsx(Text, { ns: ns, text: title, numberOfLines: 1, props: {
                            style: [
                                styles$f.title,
                                sectionTitle,
                                {
                                    color: textColor,
                                    fontWeight: "800",
                                    fontSize: 24,
                                    letterSpacing: 0.5,
                                },
                            ],
                        } }), rightAction && (jsx(TouchableOpacity, { onPress: rightAction.onPress, style: styles$f.iconButton, hitSlop: HIT_SLOP, activeOpacity: 0.7, children: jsx(Ionicons, { name: rightAction.icon, size: iconTitleSize + 6, color: textColor }) }))] }) }) }));
};
const HIT_SLOP = { top: 12, bottom: 12, left: 12, right: 12 };
const styles$f = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 100,
        borderRadius: 18,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 12,
    },
    innerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
    iconButton: {
        borderRadius: 12,
        padding: 6,
        backgroundColor: "rgba(0,0,0,0.04)",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        flex: 1,
        marginLeft: 4,
    },
});

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Modal = (props) => {
    var _a;
    const { t } = useTranslation((_a = props.ns) !== null && _a !== void 0 ? _a : "modals");
    const theme = useThemeColors();
    const isIOS = Platform.OS === "ios";
    const isAndroid = Platform.OS === "android";
    const isWeb = Platform.OS === "web";
    const handleBackdropPress = useCallback(() => {
        if (props.onClose &&
            (props.type === "actionSheet" || props.closeOnBackdropPress)) {
            props.onClose();
        }
    }, [props]);
    const renderHeader = useMemo(() => {
        if (!props.title && (props.type !== "default" || !props.showCloseButton))
            return null;
        return (jsxs(View, { style: [
                styles$e.header,
                props.type === "default" && { backgroundColor: theme.primary },
                { padding },
            ], children: [props.title && (jsx(View, { style: styles$e.titleContainer, children: jsx(Text$1, { style: [
                            styles$e.title,
                            props.type === "default" && { color: theme.onPrimary },
                        ], children: t(props.title) }) })), props.type === "default" && props.showCloseButton && (jsx(TouchableWithoutFeedback, { onPress: props.onClose, children: jsx(View, { style: styles$e.closeButton, children: jsx(Ionicons, { source: "close", size: 24, color: theme.onPrimary }) }) }))] }));
    }, [props, theme, t]);
    const renderActionSheetContent = useMemo(() => {
        if (props.type !== "actionSheet")
            return props.children;
        const containerDynamic = [
            styles$e.actionSheetContainer,
            isIOS && {
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: -4 },
            },
            isAndroid && {
                elevation: 12,
                borderTopWidth: 0,
            },
            isWeb && {
                maxWidth: 560,
                alignSelf: "center",
            },
        ];
        return (jsxs(View, { style: [
                containerDynamic,
                props.usePseudoSafeArea && isIOS && { paddingBottom: 16 },
            ], children: [!props.title && (jsx(View, { style: styles$e.grabberContainer, children: jsx(View, { style: styles$e.grabber }) })), props.subtitle && (jsx(Text$1, { style: styles$e.subtitle, children: t(props.subtitle) })), jsx(ScrollView, { keyboardShouldPersistTaps: "handled", contentContainerStyle: [
                        contentLayout,
                        { padding: padding, paddingBottom: props.showCloseButton ? 8 : 16 },
                        props.containerStyle,
                    ], children: props.children }), (props.showCloseButton || props.footer) && (jsxs(View, { style: [styles$e.cancelContainer, { padding, gap: gap }], children: [props.footer, props.showCloseButton && (jsx(Button, Object.assign({ onPress: props.onClose, variant: isIOS ? "text" : "outlined", color: "error", fullWidth: true, text: "cancel", ns: "buttons" }, props.cancelProps)))] }))] }));
    }, [props, t, isIOS, isAndroid, isWeb]);
    if (!props.visible)
        return null;
    if (props.type === "actionSheet") {
        return (jsx(Modal$2, { transparent: true, visible: props.visible, animationType: isIOS ? "slide" : "fade", onRequestClose: props.onClose, style: [props.modalStyle], children: jsx(SafeAreaView, { style: { flex: 1 }, children: jsx(TouchableWithoutFeedback, { onPress: handleBackdropPress, children: jsx(View, { style: styles$e.backdrop, children: jsx(TouchableWithoutFeedback, { children: jsxs(View, { style: { width: "100%" }, children: [renderHeader, renderActionSheetContent] }) }) }) }) }) }));
    }
    // Default modal
    return (jsx(Modal$2, { visible: props.visible, animationType: "slide", onRequestClose: props.onClose, style: [props.modalStyle], children: jsxs(SafeAreaView, { style: { flex: 1 }, children: [renderHeader, jsx(ScrollView, { contentContainerStyle: [contentLayout, props.containerStyle], style: { flex: 1, padding }, showsVerticalScrollIndicator: false, children: renderActionSheetContent })] }) }));
};
const styles$e = StyleSheet.create({
    actionSheetContainer: {
        backgroundColor: Colors.light.surface,
        borderTopColor: Colors.light.surfaceVariant,
        borderTopLeftRadius: buttonStyle.borderRadius,
        borderTopRightRadius: buttonStyle.borderRadius,
        borderTopWidth: 8,
        bottom: 0,
        maxHeight: SCREEN_HEIGHT * 0.5, // Altezza massima del 50% dello schermo
        position: "relative",
        width: "100%",
    },
    backdrop: {
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // sfondo semitrasparente
        flex: 1,
        justifyContent: "flex-end",
    },
    grabberContainer: {
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 4,
    },
    grabber: {
        width: 42,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#C6C6C8",
        opacity: 0.8,
    },
    cancelContainer: {
        borderTopColor: "#F5F5F5",
        borderTopWidth: 8,
        padding: padding / 2,
    },
    closeButton: {
        padding: 4,
    },
    header: {
        alignItems: "center",
        borderBottomColor: Colors.light.outline,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding,
        borderTopLeftRadius: buttonStyle.borderRadius,
        borderTopRightRadius: buttonStyle.borderRadius,
    },
    subtitle: {
        color: Colors.light.primary,
        fontSize: sectionSubtitle.fontSize,
        padding,
        fontWeight: "500",
    },
    title: {
        fontSize: headerTitle.fontSize,
        fontWeight: headerTitle.fontWeight,
        color: Colors.light.primary,
        fontFamily: headerTitle.fontFamily,
    },
    titleContainer: {
        flex: 1,
    },
});
var Modal$1 = memo(Modal);

const ImageWithFallback = ({ source, style = {}, resizeMode = "cover", fallbackSource, onLoad, onError, transition = 0, contentPosition, }) => {
    const [hasError, setHasError] = useState(false);
    const getSource = useMemo(() => {
        if (hasError)
            return fallbackSource;
        if (!source)
            return fallbackSource;
        if (typeof source === "string")
            return source;
        if (Array.isArray(source))
            return source[0];
        return fallbackSource;
    }, [fallbackSource, source, hasError]);
    const handleError = useCallback(() => {
        setHasError(true);
        onError === null || onError === void 0 ? void 0 : onError();
    }, [onError]);
    if (!getSource)
        return null;
    return (jsx(Image$1, { source: getSource, style: [style], contentFit: resizeMode, transition: transition, placeholder: fallbackSource, placeholderContentFit: resizeMode, onLoad: onLoad, onError: handleError, cachePolicy: "memory-disk", recyclingKey: getSource, contentPosition: contentPosition, responsivePolicy: "live" }, getSource));
};
var Image = memo(ImageWithFallback);

const Paragraph = ({ title = "", subTitle = "", contentStyle = {}, description = "", img, titleStyle, ns, titleTransOption = {}, imageStyle, titleLine, }) => {
    var _a, _b, _c, _d;
    const theme = useThemeColors();
    const titleProps = useMemo(() => (typeof title === "string" ? {} : title), [title]);
    const titleText = useMemo(() => { var _a; return (typeof title === "string" ? title : ((_a = title === null || title === void 0 ? void 0 : title.text) !== null && _a !== void 0 ? _a : "")); }, [title]);
    const subTitleProps = useMemo(() => (typeof subTitle === "string" ? {} : subTitle), [subTitle]);
    const subTitleText = useMemo(() => { var _a; return (typeof subTitle === "string" ? subTitle : ((_a = subTitle === null || subTitle === void 0 ? void 0 : subTitle.text) !== null && _a !== void 0 ? _a : "")); }, [subTitle]);
    const descriptionProps = useMemo(() => (typeof description === "string" ? {} : description), [description]);
    const descriptionText = useMemo(() => { var _a; return typeof description === "string" ? description : ((_a = description === null || description === void 0 ? void 0 : description.text) !== null && _a !== void 0 ? _a : ""); }, [description]);
    return (jsxs(View, { style: [contentLayout, { borderRadius: buttonStyle.borderRadius, backgroundColor: Colors.light.surface }, contentStyle], children: [jsxs(View, { style: contentLayoutRow, children: [img && (jsx(Image, { source: img, style: imageStyle !== null && imageStyle !== void 0 ? imageStyle : { height: iconTitleSize, width: iconTitleSize, borderRadius: buttonStyle.borderRadius }, fallbackSource: "", resizeMode: "cover" })), jsxs(View, { style: { flexDirection: "column", gap: gap / 2, width: "100%" }, children: [!!titleText && (jsx(View, { style: contentLayoutRow, children: jsx(Text, Object.assign({ text: titleText, numberOfLines: titleLine, props: {
                                        style: [
                                            sectionTitle,
                                            titleStyle,
                                            { color: (_a = titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.color) !== null && _a !== void 0 ? _a : theme.primary },
                                        ],
                                    }, iconProps: {
                                        color: (_b = titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.color) !== null && _b !== void 0 ? _b : theme.primary,
                                    }, endIconProps: {
                                        color: (_c = titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.color) !== null && _c !== void 0 ? _c : theme.primary,
                                    }, textTransOption: titleTransOption, ns: ns }, titleProps)) })), !!subTitleText && (jsx(Text, Object.assign({ props: { style: sectionSubtitle }, text: subTitleText, ns: ns }, subTitleProps)))] })] }), !!descriptionText && (jsx(Text, Object.assign({ text: descriptionText, ns: ns }, descriptionProps, { props: Object.assign(Object.assign({}, descriptionProps === null || descriptionProps === void 0 ? void 0 : descriptionProps.props), { style: [paragraphText, (_d = descriptionProps === null || descriptionProps === void 0 ? void 0 : descriptionProps.props) === null || _d === void 0 ? void 0 : _d.style] }) })))] }));
};
var Paragraph$1 = memo(Paragraph);

const Footer = ({ style, links }) => {
    const theme = useThemeColors();
    const backgroundColor = useMemo(() => theme.primary, [theme.primary]);
    const textColor = useMemo(() => theme.onPrimary, [theme.onPrimary]);
    const finalLinks = useMemo(() => (Object.assign(Object.assign({}, appLinks), links)), [links]);
    return (jsxs(View, { style: [
            fouterLayout,
            { backgroundColor, padding, justifyContent: "center" },
            style,
        ], children: [jsx(Text, { text: "\u00A9 Copyright 2025 IRV Group", style: [paragraphText, { color: textColor, textAlign: "center" }] }), jsxs(View, { style: [contentLayoutRow, { justifyContent: "center" }], children: [jsx(TouchableOpacity, { onPress: () => openLink(finalLinks.privacy), children: jsx(Text, { style: [
                                paragraphText,
                                styles$d.footerLink,
                                { color: textColor, textAlign: "center", width: "auto" },
                            ], contentStyle: { width: "auto" }, text: "Privacy" }) }), jsx(TouchableOpacity, { onPress: () => openLink(finalLinks.cookie), children: jsx(Text, { style: [
                                paragraphText,
                                styles$d.footerLink,
                                { color: textColor, textAlign: "center" },
                            ], contentStyle: { width: "auto" }, text: "Cookie" }) }), jsx(TouchableOpacity, { onPress: () => openLink(finalLinks.eula), children: jsx(Text, { style: [
                                paragraphText,
                                styles$d.footerLink,
                                { color: textColor, textAlign: "center" },
                            ], contentStyle: { width: "auto" }, text: "Eula" }) })] }), jsxs(View, { style: [contentLayoutRow, { justifyContent: "center" }], children: [jsx(TouchableOpacity, { onPress: () => openLink("mailto:" + finalLinks.mail), children: jsx(Text, { style: [
                                paragraphText,
                                styles$d.footerLink,
                                { color: textColor, textAlign: "center", width: "auto" },
                            ], contentStyle: { width: "auto" }, text: finalLinks.mail }) }), jsx(TouchableOpacity, { onPress: () => openLink("tel:" + finalLinks.telephone), children: jsx(Text, { style: [
                                paragraphText,
                                styles$d.footerLink,
                                { color: textColor, textAlign: "center" },
                            ], contentStyle: { width: "auto" }, text: finalLinks.telephone }) })] }), jsx(TouchableOpacity, { onPress: () => openLink("https://" + finalLinks.website), children: jsx(Text, { style: [
                        paragraphText,
                        styles$d.footerLink,
                        { color: textColor, textAlign: "center" },
                    ], contentStyle: { width: "auto" }, text: finalLinks.website }) })] }));
};
const styles$d = StyleSheet.create({
    footerLink: {
        textDecorationLine: "underline",
    },
});
var Footer$1 = memo(Footer);

const Card = ({ title, subtitle, content, image, actions, socialLinks, outlined = true, elevated = false, onPress, style, titleStyle, subtitleStyle, contentStyle, actionsContainerStyle, socialContainerStyle, ns, onlyImage, containerStyle, imageStyle = {
    height: 200,
    width: "100%",
}, imagePosition, icon, fallbackSource = "", }) => {
    const { t } = useTranslation(ns);
    const colors = useThemeColors();
    const CardContainer = useMemo(() => (onPress ? TouchableOpacity : View), [onPress]);
    const renderIcon = useMemo(() => {
        if (!icon)
            return null;
        return (jsx(TouchableOpacity, { onPress: icon.onPress, style: [styles$c.iconContainer, icon.style], disabled: !icon.onPress, children: jsx(MaterialIcons, { name: icon.name, size: icon.size || 24, color: icon.color || colors.primary }) }));
    }, [icon, colors.primary]);
    const renderContent = useCallback((content, defaultStyle, customStyle, textProps) => {
        if (typeof content === "string") {
            return (jsx(Text, Object.assign({ contentStyle: [defaultStyle, customStyle], style: [defaultStyle, customStyle], text: t(content) }, textProps)));
        }
        return content;
    }, [t]);
    const containerStyles = useMemo(() => [
        styles$c.container,
        outlined && styles$c.outlined,
        elevated &&
            (Platform.OS === "ios" ? styles$c.elevatedIOS : styles$c.elevatedAndroid),
        style,
        containerStyle,
        ["left", "right"].includes(imagePosition !== null && imagePosition !== void 0 ? imagePosition : "") && contentLayoutRow,
        onlyImage && { borderRadius: 18 },
    ], [outlined, elevated, style, containerStyle, imagePosition]);
    const renderSocialLinks = useMemo(() => {
        if (!(socialLinks === null || socialLinks === void 0 ? void 0 : socialLinks.length))
            return null;
        return (jsx(View, { style: [styles$c.socialLinks, contentLayoutRow, socialContainerStyle], children: socialLinks.map((link, index) => (jsx(SocialLink, { platform: link.platform, username: link.username, url: link.url, text: link.text, icon: link.icon }, index))) }));
    }, [socialLinks, socialContainerStyle]);
    const renderActions = useMemo(() => {
        if (!(actions === null || actions === void 0 ? void 0 : actions.length))
            return null;
        return (jsx(View, { style: [styles$c.actions, contentLayoutRow, actionsContainerStyle], children: actions.map((action, index) => (jsx(Button, Object.assign({ variant: "text", ns: ns }, action), index))) }));
    }, [actions, ns, actionsContainerStyle]);
    const renderImage = useMemo(() => {
        if (!image && !fallbackSource)
            return null;
        return (jsx(Image, { fallbackSource: fallbackSource, source: image === null || image === void 0 ? void 0 : image.toString(), resizeMode: "cover", style: imageStyle }));
    }, [image, imageStyle, fallbackSource]);
    const renderedTitle = useMemo(() => title &&
        renderContent(title, [sectionTitle, { color: colors.primary }], titleStyle, {
            numberOfLines: 2,
        }), [title, renderContent, colors.primary, titleStyle]);
    const renderedSubtitle = useMemo(() => subtitle && renderContent(subtitle, [sectionSubtitle], subtitleStyle), [subtitle, subtitleStyle, renderContent]);
    const renderedContent = useMemo(() => content && renderContent(content, [paragraphText], contentStyle), [content, contentStyle, renderContent]);
    const hasFooter = useMemo(() => !!(socialLinks === null || socialLinks === void 0 ? void 0 : socialLinks.length) || !!(actions === null || actions === void 0 ? void 0 : actions.length), [actions === null || actions === void 0 ? void 0 : actions.length, socialLinks === null || socialLinks === void 0 ? void 0 : socialLinks.length]);
    const imageTitleStyle = useMemo(() => [
        styles$c.imageTitle,
        {
            backgroundColor: colors.backdrop,
            color: colors.background,
        },
    ], [colors]);
    const renderImageTitle = useMemo(() => {
        if (!onlyImage || typeof title !== "string")
            return null;
        return (jsx(Text, { contentStyle: [styles$c.imageTitleContainer], style: [imageTitleStyle, titleStyle], text: t(title) }));
    }, [onlyImage, title, imageTitleStyle, t, titleStyle]);
    return (jsx(View, { children: jsxs(CardContainer, { style: containerStyles, onPress: onPress, disabled: !onPress, children: [[undefined, "left", "top"].includes(imagePosition) && renderImage, renderIcon, jsxs(View, { style: { flexShrink: 1, height: "100%" }, children: [renderImageTitle, !onlyImage && (jsx(View, { style: [pageLayout, styles$c.content], children: jsxs(View, { style: contentLayout, children: [renderedTitle, renderedSubtitle, renderedContent, renderSocialLinks] }) })), !onlyImage && hasFooter && (jsx(View, { style: styles$c.footer, children: renderActions }))] }), ["bottom", "right"].includes(imagePosition !== null && imagePosition !== void 0 ? imagePosition : "") && renderImage] }) }));
};
const styles$c = StyleSheet.create({
    actions: {
        flexWrap: "wrap",
        padding: padding,
        borderRadius: buttonStyle.borderRadius,
        backgroundColor: Colors.light.surface,
    },
    container: {
        backgroundColor: Colors.light.surface,
        borderRadius: buttonStyle.borderRadius,
        flex: 1,
        height: "100%",
        overflow: "hidden",
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    content: {
        padding: padding,
    },
    // Stile elevation separato per Android
    elevatedAndroid: {
        elevation: 2,
    },
    // Stile shadow migliorato per iOS
    elevatedIOS: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    footer: {
        borderTopColor: "rgba(0, 0, 0, 0.12)",
        borderTopWidth: 1,
        flexWrap: "wrap",
    },
    iconContainer: {
        padding: 8,
        position: "absolute",
        right: 0,
        top: 0,
    },
    imageTitle: {
        color: Colors.light.onPrimary,
        flex: 1,
        padding: 4,
        textAlign: "center",
        fontWeight: "700",
    },
    imageTitleContainer: {
        alignItems: "center",
        borderBottomEndRadius: 8,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        left: 0,
        position: "absolute",
        right: 0,
    },
    // Bordi più evidenti per iOS
    outlined: {
        borderColor: Platform.OS === "ios" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.12)",
        borderWidth: Platform.OS === "ios" ? 0.5 : 1,
    },
    socialLinks: {},
});
var Card$1 = memo(Card);

const getNotificationColors = (type) => {
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
const Alert = ({ message, type = "info", style, ns = "alert", textTransOption, textProps, }) => {
    const colors = getNotificationColors(type);
    if (!message) {
        return;
    }
    return (jsx(View, { style: [
            styles$b.container,
            {
                backgroundColor: colors.background,
                borderColor: colors.border,
            },
            style,
        ], children: jsx(Text, Object.assign({ text: message, ns: ns, textTransOption: textTransOption, props: {
                style: [styles$b.message, { color: colors.text }],
            } }, textProps)) }));
};
const styles$b = StyleSheet.create({
    container: Object.assign({ alignItems: "center", borderRadius: 4, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", padding: 12 }, Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
        },
        android: {
            elevation: 2,
        },
    })),
    message: {
        flex: 1,
        fontSize: 15,
        lineHeight: 20,
    },
});
var Alert$1 = memo(Alert);

const Notification = ({ message, type = "info", visible = true, onDismiss, autoHideDuration = 5000, style, ns, textTransOption, }) => {
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
            onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
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
        }
        else {
            fadeOut();
        }
    }, [visible, autoHideDuration, fadeIn, fadeOut]);
    if (!visible)
        return null;
    return (jsxs(Animated.View, { style: [
            styles$a.container,
            {
                opacity: fadeAnim,
                backgroundColor: colors.background,
                borderColor: colors.border,
            },
            style,
        ], children: [jsx(Text, { text: message, ns: ns, textTransOption: textTransOption, props: {
                    style: [styles$a.message, { color: colors.text }],
                } }), onDismiss && (jsx(TouchableOpacity, { onPress: fadeOut, style: styles$a.dismissButton, children: jsx(Ionicons, { name: "close", size: 20 }) }))] }));
};
const styles$a = StyleSheet.create({
    container: Object.assign({ alignItems: "center", borderRadius: 4, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", margin: 8, padding: 12 }, Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
        },
        android: {
            elevation: 2,
        },
    })),
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

const NotificationContainer = () => {
    const [notification, setNotification] = useNotificationState();
    const handleDismiss = () => {
        setNotification(null);
    };
    if (!notification)
        return null;
    return (jsx(SafeAreaView, { style: [styles$9.container, { flex: 1 }], children: jsx(Notification, Object.assign({ visible: true, onDismiss: handleDismiss }, notification)) }));
};
const styles$9 = StyleSheet.create({
    container: {
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1000,
    },
});
var NotificationContainer$1 = memo(NotificationContainer);

const { width } = Dimensions.get("window");
const Loading = ({ visible = true, text, overlay = false, size = "large", style, textStyle, color, ns = "translation", // Ensure ns is always defined
 }) => {
    console.log("Loading component rendered");
    const theme = useThemeColors();
    const { t } = useTranslation(ns);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const backgroundAnim1 = useRef(new Animated.Value(0)).current;
    const backgroundAnim2 = useRef(new Animated.Value(0)).current;
    const loadingColor = useMemo(() => color || theme.primary, [color, theme.primary]);
    useEffect(() => {
        if (visible) {
            // Animazioni del contenuto
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 7,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
            // Rotazione continua
            Animated.loop(Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ])).start();
            // Animazione pulsante
            Animated.loop(Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])).start();
            // Animazioni dello sfondo
            Animated.loop(Animated.sequence([
                Animated.timing(backgroundAnim1, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(backgroundAnim1, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])).start();
            Animated.loop(Animated.sequence([
                Animated.timing(backgroundAnim2, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(backgroundAnim2, {
                    toValue: 0,
                    duration: 4000,
                    useNativeDriver: true,
                }),
            ])).start();
        }
        else {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [
        backgroundAnim1,
        backgroundAnim2,
        opacityAnim,
        pulseAnim,
        rotateAnim,
        scaleAnim,
        visible,
    ]);
    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
    const scale = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.95, 1.05],
    });
    const LoadingContent = useMemo(() => (jsxs(Animated.View, { style: [
            styles$8.container,
            {
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
            },
            style,
        ], children: [jsx(Animated.View, { style: { transform: [{ rotate: spin }, { scale }] }, children: jsx(Ionicons, { name: "sync", size: size === "large" ? 50 : 24, color: loadingColor }) }), text && (jsx(Animated.Text, { style: [
                    styles$8.text,
                    paragraphText,
                    { color: loadingColor },
                    textStyle,
                    { transform: [{ scale }] },
                ], children: t(text) }))] })), [
        opacityAnim,
        scaleAnim,
        style,
        spin,
        scale,
        loadingColor,
        size,
        text,
        textStyle,
        t,
    ]);
    if (!visible)
        return jsx(Fragment, {});
    if (overlay) {
        if (Platform.OS === "web") {
            // Render a fullscreen overlay using View for web
            return (jsxs(View, { style: styles$8.modalContainer, children: [jsx(Animated.View, { style: {
                            opacity: opacityAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            }),
                        } }), jsx(Animated.View, { style: [
                            styles$8.backgroundBubble,
                            {
                                transform: [
                                    {
                                        translateX: backgroundAnim1.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-width / 2, width / 2],
                                        }),
                                    },
                                    {
                                        scale: backgroundAnim1.interpolate({
                                            inputRange: [0, 0.5, 1],
                                            outputRange: [0.8, 1.2, 0.8],
                                        }),
                                    },
                                ],
                                opacity: 0.3,
                            },
                        ] }), jsx(Animated.View, { style: [
                            styles$8.backgroundBubble,
                            {
                                backgroundColor: theme.secondary,
                                transform: [
                                    {
                                        translateX: backgroundAnim2.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [width / 2, -width / 2],
                                        }),
                                    },
                                    {
                                        scale: backgroundAnim2.interpolate({
                                            inputRange: [0, 0.5, 1],
                                            outputRange: [1, 1.5, 1],
                                        }),
                                    },
                                ],
                                opacity: 0.2,
                            },
                        ] }), jsx(Animated.View, { style: [
                            styles$8.modalContent,
                            {
                                opacity: opacityAnim,
                                transform: [{ scale: scaleAnim }],
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                            style,
                        ], children: LoadingContent })] }));
        }
        return (jsx(Modal$2, { visible: visible, animationType: "fade", statusBarTranslucent: true, transparent: false, children: jsxs(View, { style: styles$8.modalContainer, children: [jsx(Animated.View, { style: {
                            opacity: opacityAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            }),
                        } }), jsx(Animated.View, { style: [
                            styles$8.backgroundBubble,
                            {
                                transform: [
                                    {
                                        translateX: backgroundAnim1.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-width / 2, width / 2],
                                        }),
                                    },
                                    {
                                        scale: backgroundAnim1.interpolate({
                                            inputRange: [0, 0.5, 1],
                                            outputRange: [0.8, 1.2, 0.8],
                                        }),
                                    },
                                ],
                                opacity: 0.3,
                            },
                        ] }), jsx(Animated.View, { style: [
                            styles$8.backgroundBubble,
                            {
                                backgroundColor: theme.secondary,
                                transform: [
                                    {
                                        translateX: backgroundAnim2.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [width / 2, -width / 2],
                                        }),
                                    },
                                    {
                                        scale: backgroundAnim2.interpolate({
                                            inputRange: [0, 0.5, 1],
                                            outputRange: [1, 1.5, 1],
                                        }),
                                    },
                                ],
                                opacity: 0.2,
                            },
                        ] }), jsx(Animated.View, { style: [
                            styles$8.modalContent,
                            {
                                opacity: opacityAnim,
                                transform: [{ scale: scaleAnim }],
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                            style,
                        ], children: LoadingContent })] }) }));
    }
    return LoadingContent;
};
const styles$8 = StyleSheet.create({
    backgroundBubble: {
        backgroundColor: "#8cc91b",
        borderRadius: 150,
        height: 300,
        opacity: 0.2,
        position: "absolute",
        width: 300,
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
        padding: 16,
    },
    modalContainer: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        flex: 1,
        justifyContent: "center",
    },
    modalContent: {
        borderRadius: 16,
        elevation: 4,
        minWidth: 120,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 2,
    },
    text: {
        marginTop: 12,
        textAlign: "center",
    },
});

const LoadingContainer = (props) => {
    const visible = useLoadingValue();
    return jsx(Loading, Object.assign({}, props, { visible: visible }));
};

const useListStyles = () => {
    const colors = useThemeColors();
    return StyleSheet.create({
        listSection: {
            borderRadius: 24,
        },
        listItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.background,
            borderRadius: 18,
            padding: 12,
            elevation: 2,
        },
        leftIcon: {
            marginRight: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
        rightIcon: {
            marginLeft: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
        rightButton: {
            minWidth: 'auto',
            paddingHorizontal: 8,
            borderRadius: 12
        },
        icon: {
            fontSize: 24,
            color: colors.primary,
            opacity: 0.85,
        },
        content: {
            flex: 1,
            flexShrink: 1,
            gap: 6,
            justifyContent: 'center',
        },
        divider: {
            height: 1,
            backgroundColor: colors.outline,
            marginVertical: 2,
            borderRadius: 1,
            opacity: 0.7,
        },
        profilePicture: {
            borderRadius: 999,
        },
        touchableContent: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 18,
        },
    });
};

const useListItemRenderers = ({ customStyles, defaultProfilePictureSize, }) => {
    const styles = useListStyles();
    const renderLeftContent = useCallback((profilePicture, profilePictureSize) => {
        if (profilePicture) {
            const size = profilePictureSize !== null && profilePictureSize !== void 0 ? profilePictureSize : defaultProfilePictureSize;
            return (jsx(View, { style: styles.leftIcon, children: jsx(Image$2, { source: { uri: profilePicture }, style: [
                        styles.profilePicture,
                        { width: size, height: size },
                        customStyles === null || customStyles === void 0 ? void 0 : customStyles.profilePicture,
                    ] }) }));
        }
        return null;
    }, [customStyles, defaultProfilePictureSize, styles]);
    const renderRightContent = useCallback((iconRigth, rightButton) => {
        var _a;
        if (rightButton) {
            return (jsx(View, { style: [styles.rightIcon, customStyles === null || customStyles === void 0 ? void 0 : customStyles.rightButton], children: jsx(Button, Object.assign({ size: "small" }, rightButton, { style: styles.rightButton })) }));
        }
        if (iconRigth) {
            return (jsx(View, { style: styles.rightIcon, children: jsx(Ionicons, Object.assign({}, ((_a = customStyles === null || customStyles === void 0 ? void 0 : customStyles.icon) !== null && _a !== void 0 ? _a : {}), { name: iconRigth, size: iconTitleSize })) }));
        }
        return null;
    }, [customStyles, styles]);
    const renderBottomContent = useCallback((bottomButton) => {
        if (bottomButton) {
            if (Array.isArray(bottomButton)) {
                return (jsx(View, { style: contentLayoutRow, children: bottomButton === null || bottomButton === void 0 ? void 0 : bottomButton.map((el, index) => jsx(Button, Object.assign({}, el), index)) }));
            }
            return jsx(Button, Object.assign({}, bottomButton));
        }
        return null;
    }, [styles]);
    return {
        renderLeftContent,
        renderRightContent,
        renderBottomContent,
    };
};
const useListItemActions = (ns) => {
    const { t } = useTranslation(ns);
    const handlePress = useCallback((onPress) => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (onPress) {
            if (typeof onPress === "function") {
                onPress();
            }
            else {
                const { link, route, action } = onPress;
                if (route) {
                    router.push(route);
                }
                else if (link) {
                    openLink(link);
                }
                else {
                    Alert$2.alert(t((_a = action === null || action === void 0 ? void 0 : action.title) !== null && _a !== void 0 ? _a : "confirm", { ns: action === null || action === void 0 ? void 0 : action.ns }), (action === null || action === void 0 ? void 0 : action.description) && t(action === null || action === void 0 ? void 0 : action.description, { ns: action === null || action === void 0 ? void 0 : action.ns }), [
                        {
                            text: t((_c = (_b = action === null || action === void 0 ? void 0 : action.cancelButton) === null || _b === void 0 ? void 0 : _b.label) !== null && _c !== void 0 ? _c : "cancel", {
                                ns: action === null || action === void 0 ? void 0 : action.ns,
                            }),
                            style: "cancel",
                            onPress: (_d = action === null || action === void 0 ? void 0 : action.cancelButton) === null || _d === void 0 ? void 0 : _d.action,
                        },
                        {
                            text: t((_f = (_e = action === null || action === void 0 ? void 0 : action.okButton) === null || _e === void 0 ? void 0 : _e.label) !== null && _f !== void 0 ? _f : "ok", { ns: action === null || action === void 0 ? void 0 : action.ns }),
                            onPress: (_g = action === null || action === void 0 ? void 0 : action.okButton) === null || _g === void 0 ? void 0 : _g.action,
                        },
                    ]);
                }
            }
        }
    }, [t]);
    return { handlePress };
};

const DEFAULT_PROFILE_PICTURE_SIZE = 65;
const Container = memo(({ children, onPress, handlePress, }) => {
    const styles = useListStyles();
    if (onPress) {
        return (jsx(TouchableOpacity, { style: styles.touchableContent, onPress: () => handlePress(onPress), children: children }));
    }
    return children;
});
const Item = ({ iconRigth, rightButton, onPress, text = "", title = "", profilePicture, profilePictureSize, bottomButtom, ns, onPressGeneral, customStyles, defaultProfilePictureSize = DEFAULT_PROFILE_PICTURE_SIZE, disableDivider, }) => {
    const styles = useListStyles();
    const { handlePress } = useListItemActions(ns);
    const { renderLeftContent, renderRightContent, renderBottomContent } = useListItemRenderers({
        customStyles,
        defaultProfilePictureSize,
    });
    return (jsxs(View, { style: { gap }, children: [jsx(View, { style: [styles.listItem, customStyles === null || customStyles === void 0 ? void 0 : customStyles.item], children: jsx(Container, { onPress: onPress !== null && onPress !== void 0 ? onPress : onPressGeneral, handlePress: handlePress, children: jsxs(Fragment, { children: [renderLeftContent(profilePicture, profilePictureSize), jsxs(View, { style: styles.content, children: [!!title && (jsx(Text, Object.assign({ numberOfLines: 1, ns: ns, props: {
                                            style: [sectionListItemTitle, customStyles === null || customStyles === void 0 ? void 0 : customStyles.title],
                                        } }, (typeof title === "string" ? { text: title } : title)))), !!text && (jsx(Text, Object.assign({ ns: ns, props: {
                                            style: [paragraphText, customStyles === null || customStyles === void 0 ? void 0 : customStyles.description],
                                        } }, (typeof text === "string" ? { text } : text))))] }), renderRightContent(iconRigth, rightButton)] }) }) }), bottomButtom && renderBottomContent(bottomButtom), !disableDivider && jsx(View, { style: styles.divider })] }));
};
var Item$1 = memo(Item);

const ListItem = ({ items, ns, onPressGeneral, styles: customStyles, defaultProfilePictureSize, }) => {
    const styles = useListStyles();
    return (!!(items === null || items === void 0 ? void 0 : items.length) && (jsx(View, { style: [
            styles.listSection,
            customStyles === null || customStyles === void 0 ? void 0 : customStyles.container,
            { gap },
        ], children: items === null || items === void 0 ? void 0 : items.map((item, index) => {
            var _a;
            return (createElement(Item$1, Object.assign({}, item, { key: (_a = item.key) !== null && _a !== void 0 ? _a : index.toString(), ns: ns, onPressGeneral: onPressGeneral, customStyles: customStyles, defaultProfilePictureSize: defaultProfilePictureSize, disableDivider: item.disableDivider || index === items.length - 1 })));
        }) })));
};
var ListItem$1 = memo(ListItem);

const List = ({ ns, button, itemsKey, paragraph, onPressGeneral, mapItems, listItems, styles: customStyles, }) => {
    const { t } = useTranslation(ns);
    const items = useMemo(() => {
        if (itemsKey) {
            const translatedItems = t(itemsKey, {
                returnObjects: true,
            });
            return Array.isArray(translatedItems) ? translatedItems : [];
        }
        return listItems !== null && listItems !== void 0 ? listItems : [];
    }, [itemsKey, t, listItems]);
    const mappedItems = useMemo(() => (mapItems ? mapItems(items) : items), [items, mapItems]);
    const styles = useListStyles();
    if (!(mappedItems === null || mappedItems === void 0 ? void 0 : mappedItems.length)) {
        return;
    }
    return (jsxs(View, { style: [styles.listSection, customStyles === null || customStyles === void 0 ? void 0 : customStyles.container, contentLayout], children: [paragraph && jsx(Paragraph$1, Object.assign({}, paragraph, { ns: ns })), jsx(ListItem$1, { items: mappedItems, onPressGeneral: onPressGeneral, ns: ns, styles: customStyles }), button && (jsx(Button, Object.assign({ size: "large", compact: true }, button, { style: styles.rightButton, ns: ns })))] }));
};
var List$1 = memo(List);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const Actions = (_a) => {
    var { buttons, children: modalChildren } = _a, modalProps = __rest(_a, ["buttons", "children"]);
    const children = useMemo(() => buttons === null || buttons === void 0 ? void 0 : buttons.map((button, index) => {
        if (button.divider) {
            return jsx(View, { style: styles$7.optionDivider }, `divider-${index}`);
        }
        return (jsx(View, { style: styles$7.buttonWrapper, children: jsx(Button, Object.assign({}, button, { fullWidth: true, onPress: (e) => {
                    var _a, _b;
                    (_a = button === null || button === void 0 ? void 0 : button.onPress) === null || _a === void 0 ? void 0 : _a.call(button, e);
                    (_b = modalProps === null || modalProps === void 0 ? void 0 : modalProps.onClose) === null || _b === void 0 ? void 0 : _b.call(modalProps);
                } })) }, index));
    }), [buttons, modalProps === null || modalProps === void 0 ? void 0 : modalProps.onClose]);
    return (jsx(Modal$1, Object.assign({ showCloseButton: true }, modalProps, { type: "actionSheet", usePseudoSafeArea: true, children: jsxs(View, { style: styles$7.container, children: [modalChildren, jsx(ScrollView, { style: { maxHeight: 320 }, bounces: Platform.OS === "ios", children: children })] }) })));
};
const styles$7 = StyleSheet.create({
    container: {
        width: "100%"
    },
    scrollContent: {
        paddingHorizontal: 12,
        paddingBottom: 4,
    },
    optionDivider: {
        backgroundColor: Platform.select({ ios: "#D1D1D6", android: "#d9d9d9", default: "#e0e0e0" }),
        height: StyleSheet.hairlineWidth,
        marginVertical: 10,
    },
    buttonWrapper: {
        marginBottom: 10,
    },
});

const Calendar$1 = ({ value, onChange, mode = "date", errorMessage, disabled = false, minimumDate, maximumDate, label, ns }) => {
    const [show, setShow] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const theme = useThemeColors();
    useEffect(() => {
        if ((value === null || value === void 0 ? void 0 : value.toISOString()) !== (localValue === null || localValue === void 0 ? void 0 : localValue.toISOString()))
            setLocalValue(value);
    }, [localValue, value]);
    const formattedDate = useMemo(() => {
        if (!localValue)
            return " ";
        switch (mode) {
            case "date":
                return format(localValue, "dd/MM/yyyy", { locale: it });
            case "time":
                return format(localValue, "HH:mm", { locale: it });
            case "datetime":
                return format(localValue, "dd/MM/yyyy HH:mm", { locale: it });
            default:
                return "";
        }
    }, [localValue, mode]);
    const handleNativeChange = useCallback((event, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setLocalValue(selectedDate);
            onChange === null || onChange === void 0 ? void 0 : onChange(selectedDate);
        }
    }, [onChange]);
    const getNativeMode = useCallback(() => {
        switch (mode) {
            case "datetime":
                return show ? "date" : "time";
            default:
                return mode;
        }
    }, [mode, show]);
    return (jsxs(Fragment, { children: [label && jsx(Text, { style: [paragraphText], text: label, ns: ns }), jsx(TouchableOpacity, { onPress: () => !disabled && setShow(true), style: [
                    styles$6.input,
                    disabled && styles$6.disabled,
                    !!errorMessage && styles$6.errorInput,
                ], children: jsx(Text, { style: [inputLabel, disabled && styles$6.disabledText], text: formattedDate }) }), errorMessage && (jsx(Text, { style: [paragraphText, styles$6.error], text: errorMessage })), show && (jsx(DateTimePicker, { value: localValue !== null && localValue !== void 0 ? localValue : new Date(), mode: getNativeMode(), is24Hour: true, display: "default", onChange: handleNativeChange, minimumDate: minimumDate, maximumDate: maximumDate, locale: "it", themeVariant: "light", accentColor: theme.primary }))] }));
};
const styles$6 = StyleSheet.create({
    disabled: {
        backgroundColor: "#f5f5f5",
        borderColor: "#ddd",
    },
    disabledText: {
        color: "#999",
    },
    error: {
        color: "#B00020",
        marginTop: 4,
    },
    errorInput: {
        borderColor: "#B00020",
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderRadius: 4,
        borderWidth: 1,
        padding: 14,
    }
});

const Dropdown = ({ label, value, onChange, options = [], errorMessage, disabled = false, variant = "primary", styleView, labelStyle, multiSelect = false, placeholder = " ", disableTranslation, icon, ns, loading, isCloseIconHidden, inputStyle, }) => {
    var _a, _b;
    const { t } = useTranslation(ns);
    const theme = useThemeColors();
    const [isOpen, setIsOpen] = useState(false);
    const getOptions = useMemo(() => {
        if (options === null || options === void 0 ? void 0 : options.length)
            return options === null || options === void 0 ? void 0 : options.map((el) => (Object.assign(Object.assign({}, el), { label: typeof (el === null || el === void 0 ? void 0 : el.label) === "string" && !disableTranslation
                    ? t(el === null || el === void 0 ? void 0 : el.label)
                    : el === null || el === void 0 ? void 0 : el.label })));
        return [];
    }, [options, t, disableTranslation]);
    const handleOpen = useCallback(() => {
        if (!disabled) {
            setIsOpen(true);
        }
    }, [disabled]);
    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);
    const selectedOptions = useMemo(() => multiSelect
        ? getOptions.filter((opt) => Array.isArray(value) && value.includes(opt.value))
        : [getOptions.find((opt) => opt.value === value)].filter(Boolean), [getOptions, value, multiSelect]);
    const handleSelect = useCallback((option) => {
        if (multiSelect) {
            const currentValues = Array.isArray(value) ? value : [];
            const newValues = currentValues.includes(option.value)
                ? currentValues.filter((v) => v !== option.value)
                : [...currentValues, option.value];
            onChange === null || onChange === void 0 ? void 0 : onChange(newValues);
        }
        else {
            onChange === null || onChange === void 0 ? void 0 : onChange(option.value);
            setIsOpen(false);
        }
    }, [onChange, multiSelect, value]);
    return (jsxs(View, { style: [styles$5.container, styleView], children: [!!label && (jsx(Text, { text: label || "", props: { style: [styles$5.label, inputLabel, labelStyle] } })), jsx(TouchableOpacity, { onPress: handleOpen, disabled: disabled, style: [
                    styles$5.input,
                    disabled && styles$5.disabled,
                    !!errorMessage && styles$5.errorInput,
                    multiSelect && styles$5.multiselectInput,
                    inputStyle,
                ], activeOpacity: 0.85, accessibilityRole: "button", accessibilityLabel: label || "dropdown", children: jsx(Text, { text: multiSelect
                        ? selectedOptions.map((opt) => opt === null || opt === void 0 ? void 0 : opt.label).join(", ") ||
                            placeholder
                        : ((_b = (_a = selectedOptions[0]) === null || _a === void 0 ? void 0 : _a.label) === null || _b === void 0 ? void 0 : _b.toString()) || placeholder, disableTranslation: disableTranslation, contentStyle: { backgroundColor: "transparent" }, props: {
                        style: [
                            {
                                color: disabled
                                    ? theme.onSurfaceDisabled
                                    : theme.onPrimaryContainer,
                            },
                            inputLabel,
                        ],
                    }, endIcon: !!(multiSelect ? (value || []).length : value) && !isCloseIconHidden
                        ? "close"
                        : isOpen
                            ? "chevron-up-sharp"
                            : "chevron-down-sharp", onEndIconPress: () => {
                        if (!isCloseIconHidden) {
                            onChange === null || onChange === void 0 ? void 0 : onChange(multiSelect ? [] : "");
                        }
                        else {
                            handleOpen();
                        }
                    }, icon: icon, loading: loading, endIconProps: {} }) }), errorMessage && (jsx(Text, { props: { style: [styles$5.error, buttonStyle] }, text: errorMessage })), jsx(Modal$1, { visible: isOpen, onClose: handleClose, showCloseButton: true, type: "actionSheet", usePseudoSafeArea: true, footer: multiSelect ? (jsx(Button, { onPress: handleClose, text: "Ok", variant: "outlined", fullWidth: true })) : (jsx(Fragment, {})), children: getOptions.map((option, index) => {
                    var _a;
                    const isSelected = multiSelect
                        ? selectedOptions.some((opt) => (opt === null || opt === void 0 ? void 0 : opt.value) === option.value)
                        : option.value === value;
                    return (jsx(TouchableOpacity, { style: [
                            styles$5.option,
                            isSelected && styles$5.optionSelected,
                            Platform.OS === "web" && styles$5.optionWeb,
                        ], activeOpacity: 0.6, onPress: () => handleSelect(option), accessibilityRole: "button", accessibilityState: { selected: isSelected }, children: jsx(Text, { text: (_a = option.label) === null || _a === void 0 ? void 0 : _a.toString(), icon: isSelected ? "checkmark-circle" : undefined, disableTranslation: disableTranslation, iconProps: {
                                color: isSelected ? theme[variant] : theme.outline,
                            }, props: {
                                style: [paragraphText, isSelected && { fontWeight: "600" }],
                            } }) }, index));
                }) })] }));
};
const styles$5 = StyleSheet.create({
    container: { width: "auto" },
    disabled: {
        backgroundColor: "rgba(240,241,245,0.7)",
        borderColor: "#E0E0E0",
        opacity: 0.6,
    },
    doneButton: {
        alignItems: "center",
        borderTopColor: "#E0E0E0",
        borderTopWidth: StyleSheet.hairlineWidth,
        padding: 14,
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 12,
        marginTop: 8,
        shadowColor: "#4F8AFA",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 2,
    },
    sheetContainer: {
        width: "100%",
    },
    optionsScroll: {
        maxHeight: 320,
    },
    optionsContainer: {
        paddingBottom: 8,
        gap: gap,
    },
    error: {
        color: "#B00020",
        marginTop: 4,
        fontWeight: "600",
        fontSize: 15,
    },
    errorInput: {
        borderColor: "#B00020",
        backgroundColor: "rgba(255,0,0,0.07)",
    },
    input: {
        backgroundColor: "rgba(255,255,255,0.7)",
        borderColor: "#ccc",
        borderRadius: 14,
        borderWidth: 1,
        padding: 16,
    },
    multiselectInput: {
        minHeight: 54,
    },
    label: {
        color: "#4F8AFA",
        marginBottom: 6,
        fontWeight: "600",
        fontSize: 16,
        letterSpacing: 0.1,
    },
    option: {
        alignItems: "center",
        borderRadius: 14,
        flexDirection: "row",
        padding: 16,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    optionSelected: {
        backgroundColor: "#E8F3FF",
        borderColor: "#4F8AFA",
        borderWidth: 1,
    },
    optionWeb: {
        transitionProperty: "background-color",
        transitionDuration: "120ms",
    },
});

const INPUT_TYPES = {
    TEXT: "text"};
const TextInput = (_a) => {
    var { label, value = "", onChange, placeholder = "", errorMessage = "", type = INPUT_TYPES.TEXT, containerStyle, inputStyle, min, max, variant = "primary", startIcon, endIcon, onEndIconPress, disabled = false, loading = false, debounceTime = 1000, ns } = _a, restProps = __rest(_a, ["label", "value", "onChange", "placeholder", "errorMessage", "type", "containerStyle", "inputStyle", "min", "max", "variant", "startIcon", "endIcon", "onEndIconPress", "disabled", "loading", "debounceTime", "ns"]);
    // Stato e refs
    const [isFocused, setIsFocused] = useState(false);
    //const [validationError, setValidationError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const debounceTimeout = useRef(null);
    const spinValue = useRef(new Animated.Value(0));
    const theme = useThemeColors();
    // Animazione di loading
    useEffect(() => {
        if (loading) {
            Animated.loop(Animated.timing(spinValue.current, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })).start();
        }
        else {
            spinValue.current.setValue(0);
        }
    }, [loading]);
    const spin = spinValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
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
    const THEME_COLORS = useMemo(() => ({
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
    }), [theme]);
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
    const handleChangeText = useCallback((text) => {
        let formattedText = text;
        if (type === "phone") {
            formattedText = text.replace(/[^\d+]/g, "");
        }
        else if (type === "number") {
            if (text === "") {
                formattedText = "";
            }
            else {
                const num = parseInt(text.replace(/\D/g, ""));
                if (!isNaN(num)) {
                    if (min !== undefined && num < min) {
                        formattedText = min.toString();
                    }
                    else if (max !== undefined && num > max) {
                        formattedText = max.toString();
                    }
                    else {
                        formattedText = num.toString();
                    }
                }
                else {
                    formattedText = "";
                }
            }
        }
        setLocalValue(formattedText);
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            onChange === null || onChange === void 0 ? void 0 : onChange(formattedText);
            //   validateInput(formattedText);
        }, debounceTime);
    }, [type, onChange, min, max, debounceTime]);
    const handleFocus = useCallback(() => setIsFocused(true), []);
    /**/ const handleBlur = useCallback(() => {
        setIsFocused(false);
        // validateInput(value);
    }, [value]);
    const togglePasswordVisibility = useCallback(() => setShowPassword((prev) => !prev), []);
    const textColor = useMemo(() => (isFocused ? THEME_COLORS[variant] : theme.onPrimaryContainer), [THEME_COLORS, isFocused, theme, variant]);
    const containerStyles = useMemo(() => [
        styles$4.container,
        {
            backgroundColor: theme.background,
            borderColor: isFocused ? THEME_COLORS[variant] : "#ccc",
        },
        disabled && styles$4.disabledContainer,
    ], [theme, isFocused, THEME_COLORS, variant, disabled]);
    const inputStyles = useMemo(() => [
        styles$4.input,
        inputLabel,
        { color: disabled ? theme.onSurfaceDisabled : textColor },
        inputStyle,
        { outline: 0 },
    ], [disabled, theme.onSurfaceDisabled, textColor, inputStyle]);
    const iconColor = useMemo(() => (disabled ? theme.onSurfaceDisabled : textColor), [disabled, theme.onSurfaceDisabled, textColor]);
    const inputMode = useMemo(() => {
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
        if (loading) {
            return (jsx(Animated.View, { style: { transform: [{ rotate: spin }] }, children: jsx(Ionicons, { name: "sync", size: iconTitleSize, color: iconColor }) }));
        }
        if (type === "password") {
            return (jsx(TouchableOpacity, { onPress: togglePasswordVisibility, children: jsx(Ionicons, { name: showPassword ? "eye" : "eye-off", size: iconTitleSize, color: iconColor }) }));
        }
        if (endIcon) {
            return (jsx(TouchableOpacity, { onPress: onEndIconPress, disabled: disabled || loading, children: jsx(Ionicons, { name: endIcon, size: 24, color: iconColor }) }));
        }
        return null;
    }, [
        loading,
        type,
        endIcon,
        spin,
        iconColor,
        togglePasswordVisibility,
        showPassword,
        onEndIconPress,
        disabled,
    ]);
    return (jsxs(View, { style: [styles$4.wrapper, containerStyle], children: [label ? (
            // Usa il tuo componente Text custom per il label
            jsx(Text, { text: label, style: [styles$4.label, paragraphText, { color: theme.onBackground }], ns: ns })) : null, jsxs(View, { style: containerStyles, children: [startIcon && (jsx(Ionicons, { name: startIcon, size: iconTitleSize, color: iconColor, style: styles$4.icon })), jsx(TextInput$2, Object.assign({ style: [
                            inputStyles,
                            type === "textarea" && { height: "100%", textAlignVertical: "top" },
                        ], multiline: type === "textarea", numberOfLines: type === "textarea" ? 10 : undefined, value: localValue === null || localValue === void 0 ? void 0 : localValue.toString(), onChangeText: handleChangeText, onFocus: handleFocus, onBlur: handleBlur, placeholder: placeholder, placeholderTextColor: textColor, secureTextEntry: type === "password" && !showPassword, inputMode: inputMode, editable: !disabled && !loading }, restProps)), renderEndIcon()] }), errorMessage ? (jsx(Text, { text: errorMessage, style: [styles$4.errorText, paragraphText, { color: theme.error }] })) : null] }));
};
const styles$4 = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 14,
        flexDirection: "row",
        padding: 16,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderWidth: 1,
        borderColor: "#E3F0FF",
    },
    disabledContainer: {
        opacity: 0.5,
        backgroundColor: "rgba(240,241,245,0.7)",
        borderColor: "#E0E0E0",
    },
    errorText: {
        marginTop: 4,
        color: "#B00020",
        fontWeight: "600",
        fontSize: 15,
    },
    icon: {
        marginRight: 8,
        color: "#4F8AFA",
    },
    input: {
        fontWeight: "500",
        fontSize: 18,
        color: "#222",
        letterSpacing: 0.1,
        padding: 0,
        margin: 0,
        paddingVertical: 0,
        marginVertical: 0,
        width: "100%",
        flex: 1,
    },
    label: {
        marginBottom: 6,
        fontWeight: "600",
        fontSize: 16,
        letterSpacing: 0.1,
    },
    wrapper: {
        width: "100%",
    },
});
var TextInput$1 = memo(TextInput);

const dateFormat = "d";
const WebCalendar = ({ value, onChange, label, disabled, minimumDate, maximumDate, mode = "date", displayMode = "input", ns, }) => {
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const formattedDate = useMemo(() => (value ? format(new Date(value), "dd/MM/yyyy", { locale: it }) : ""), [value]);
    const handleDateChange = useCallback((date) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(date);
        if (displayMode === "input") {
            setShowCalendarModal(false);
        }
    }, [onChange, displayMode]);
    if (displayMode === "calendar") {
        return (jsx(WebCalendar, { value: value, onChange: handleDateChange, label: label, disabled: disabled, minimumDate: minimumDate, maximumDate: maximumDate, mode: mode, ns: ns }));
    }
    return (jsxs(View, { children: [jsx(TouchableOpacity, { onPress: () => setShowCalendarModal(true), children: jsx(TextInput$1, { label: label, value: formattedDate, disabled: disabled, endIcon: "calendar", editable: false, ns: ns }) }), jsx(Modal$1, { visible: showCalendarModal, onClose: () => setShowCalendarModal(false), type: "actionSheet", children: jsx(View, { style: styles$3.modalContent, children: jsx(OnlyCalendar, { value: value, onChange: (val) => {
                            handleDateChange(val);
                            setShowCalendarModal(false);
                        }, disabled: disabled, minimumDate: minimumDate, maximumDate: maximumDate, mode: mode, ns: ns }) }) })] }));
};
const OnlyCalendar = ({ value, onChange, label, disabled, minimumDate, maximumDate, mode = "date", ns, }) => {
    const theme = useThemeColors();
    const initialMonth = useMemo(() => (value ? new Date(value) : new Date()), [value]);
    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const monthStart = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
    const monthEnd = useMemo(() => endOfMonth(currentMonth), [currentMonth]);
    const startDate = useMemo(() => startOfWeek(monthStart, { weekStartsOn: 1 }), [monthStart]);
    const endDate = useMemo(() => endOfWeek(monthEnd, { weekStartsOn: 1 }), [monthEnd]);
    const rows = useMemo(() => {
        let day = startDate;
        const rowArray = [];
        while (day <= endDate) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                const formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isDisabled = (minimumDate && isBefore(cloneDay, minimumDate)) ||
                    (maximumDate && isAfter(cloneDay, maximumDate));
                week.push(jsx(TouchableOpacity, { style: [
                        styles$3.dayContainer,
                        !isSameMonth(cloneDay, monthStart) && styles$3.notCurrentMonth,
                        isSameDay(cloneDay, value || new Date()) && {
                            backgroundColor: theme.primary,
                        },
                        isDisabled && styles$3.disabledDay,
                    ], disabled: disabled || isDisabled, onPress: () => onChange === null || onChange === void 0 ? void 0 : onChange(cloneDay), children: jsx(Text, { text: formattedDate, style: [
                            styles$3.dayText,
                            !isSameMonth(cloneDay, monthStart) &&
                                styles$3.notCurrentMonthText,
                            isSameDay(cloneDay, value || new Date()) &&
                                styles$3.selectedDayText,
                            isDisabled && styles$3.disabledDayText,
                        ] }) }, cloneDay.toISOString()));
                day = addDays(day, 1);
            }
            rowArray.push(jsx(View, { style: styles$3.weekRow, children: week }, day.toISOString()));
        }
        return rowArray;
    }, [
        startDate,
        endDate,
        monthStart,
        minimumDate,
        maximumDate,
        disabled,
        onChange,
        value,
    ]);
    const dayNames = useMemo(() => ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"], []);
    const handlePrevMonth = useCallback(() => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }, []);
    const handleNextMonth = useCallback(() => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }, []);
    const baseYear = useMemo(() => (value ? new Date(value).getFullYear() : new Date().getFullYear()), [value]);
    const minYear = minimumDate ? minimumDate.getFullYear() : baseYear - 100;
    const maxYear = maximumDate ? maximumDate.getFullYear() : baseYear + 10;
    const yearOptions = useMemo(() => {
        const options = [];
        for (let y = minYear; y <= maxYear; y++) {
            options.push({ label: y.toString(), value: y });
        }
        return options === null || options === void 0 ? void 0 : options.reverse();
    }, [minYear, maxYear]);
    // Quando si seleziona un anno dal dropdown, aggiorniamo currentMonth
    const handleYearSelect = useCallback((selectedYear) => {
        setCurrentMonth(new Date(+selectedYear, currentMonth.getMonth(), 1));
    }, [currentMonth]);
    const handlePrevYear = useCallback(() => {
        setCurrentMonth((prev) => subYears(prev, 1));
    }, []);
    const handleNextYear = useCallback(() => {
        setCurrentMonth((prev) => addYears(prev, 1));
    }, []);
    if (mode !== "date") {
        return (jsxs(View, { style: styles$3.fallbackContainer, children: [!!label && jsx(Text, { text: label, style: styles$3.label }), jsx(Text, { text: "Modalit\u00E0 non supportata per il calendario. Utilizza un input nativo." })] }));
    }
    const navButtonStyle = useMemo(() => (Object.assign(Object.assign({}, styles$3.navButton), { color: theme.primary })), [theme.primary]);
    return (jsxs(Fragment, { children: [label && (jsx(Text, { style: [styles$3.label, paragraphText], text: label, ns: ns })), jsxs(View, { style: styles$3.container, children: [jsxs(View, { style: styles$3.header, children: [jsxs(View, { style: [styles$3.yearHeader, contentLayoutRow], children: [jsx(TouchableOpacity, { onPress: handlePrevYear, children: jsx(Text, { text: "<<", style: navButtonStyle }) }), jsx(Dropdown, { disabled: disabled, label: "", multiSelect: false, ns: "dropdown", options: yearOptions, onChange: (val) => handleYearSelect(val), value: currentMonth.getFullYear(), placeholder: "Seleziona anno", styleView: {}, inputStyle: { borderWidth: 0, padding: 5 }, isCloseIconHidden: true }), jsx(TouchableOpacity, { onPress: handleNextYear, children: jsx(Text, { text: ">>", style: navButtonStyle }) })] }), jsxs(View, { style: styles$3.monthHeader, children: [jsx(TouchableOpacity, { onPress: handlePrevMonth, children: jsx(Text, { text: "<", style: navButtonStyle }) }), jsx(Text, { text: format(currentMonth, "MMMM", { locale: it }), style: [styles$3.headerTitle, paragraphText, { paddingBottom: 5 }] }), jsx(TouchableOpacity, { onPress: handleNextMonth, children: jsx(Text, { text: ">", style: navButtonStyle }) })] })] }), jsx(View, { style: styles$3.dayNamesRow, children: dayNames.map((dayName) => (jsx(Text, { text: dayName, style: [styles$3.dayNameText, paragraphText] }, dayName))) }), rows] })] }));
};
const styles$3 = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderColor: '#E3F0FF',
        borderRadius: 18,
        borderWidth: 1,
        padding: 18,
        shadowColor: '#4F8AFA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 6,
        marginBottom: 12,
    },
    dayContainer: {
        alignItems: "center",
        borderRadius: 12,
        height: 36,
        justifyContent: "center",
        width: 36,
        margin: 2,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderWidth: 1,
        borderColor: '#E3F0FF',
        shadowColor: '#4F8AFA',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 2,
    },
    dayNameText: {
        color: "#4F8AFA",
        fontWeight: "700",
        textAlign: "center",
        width: 36,
        fontSize: 15,
        letterSpacing: 0.2,
    },
    dayNamesRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
    },
    dayText: {
        color: "#222",
        fontSize: 16,
        textAlign: "center",
        fontWeight: '500',
        letterSpacing: 0.1,
    },
    disabledDay: {
        backgroundColor: "#F0F1F5",
        borderColor: '#E0E0E0',
    },
    disabledDayText: {
        color: "#B0B0B0",
    },
    fallbackContainer: {
        padding: 10,
    },
    header: {
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 14,
        padding: 8,
        shadowColor: '#4F8AFA',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        color: '#4F8AFA',
        letterSpacing: 0.2,
    },
    label: {
        marginBottom: 6,
        fontSize: 16,
        fontWeight: '600',
        color: '#4F8AFA',
        letterSpacing: 0.1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        width: '100%',
        padding,
        borderRadius: 18,
        shadowColor: '#4F8AFA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 6,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 16,
    },
    monthHeader: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 12,
        padding: 6,
        shadowColor: '#4F8AFA',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 2,
    },
    navButton: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: '#4F8AFA',
        fontWeight: '700',
        letterSpacing: 0.1,
    },
    notCurrentMonth: {
        backgroundColor: '#F0F1F5',
        borderColor: '#E0E0E0',
    },
    notCurrentMonthText: {
        color: '#B0B0B0',
    },
    selectedDayText: {
        color: '#fff',
        fontWeight: '700',
        textShadowColor: '#4F8AFA',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
    },
    yearHeader: {
        justifyContent: "space-between",
        marginBottom: 5,
    },
});

const Calendar = Platform.select({
    native: Calendar$1,
    web: WebCalendar,
}) || WebCalendar;

const SearchBar = (_a) => {
    var { value, onChange, onSubmit, onClear, placeholder = "Search...", containerStyle, inputStyle, autoFocus = false, disabled = false, variant = "primary", loading = false } = _a, props = __rest(_a, ["value", "onChange", "onSubmit", "onClear", "placeholder", "containerStyle", "inputStyle", "autoFocus", "disabled", "variant", "loading"]);
    const handleSubmitEditing = useCallback(() => {
        // Keyboard?.dismiss();
        onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
    }, [onSubmit]);
    const handleClear = useCallback(() => {
        if (!loading) {
            onClear === null || onClear === void 0 ? void 0 : onClear();
            onChange === null || onChange === void 0 ? void 0 : onChange("");
        }
    }, [loading, onClear, onChange]);
    // Importante: impostare endIcon solo quando loading è false
    const endIcon = useMemo(() => {
        // Non impostare 'sync' quando loading è true
        // Lascia che MaterialTextInput gestisca l'icona di caricamento
        return value && !loading ? "close" : undefined;
    }, [loading, value]);
    return (jsx(TextInput$1, Object.assign({ value: value, onChange: onChange, onSubmitEditing: handleSubmitEditing, placeholder: placeholder, containerStyle: containerStyle, inputStyle: inputStyle, autoFocus: autoFocus, disabled: disabled, variant: variant, loading: loading, startIcon: "search", endIcon: endIcon, onEndIconPress: handleClear, returnKeyType: "search" }, props)));
};
var SearchBar$1 = memo(SearchBar);

const Checkbox = ({ value = false, onChange, label, disabled = false, error, variant = "primary", styleView, labelStyle, size = 22, indeterminate = false, }) => {
    const theme = useThemeColors();
    const THEME_COLORS = useMemo(() => ({
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
    }), [
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
    ]);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(value ? 1 : 0);
    const handlePress = useCallback(() => {
        if (disabled)
            return;
        scale.value = withSequence(withTiming(0.8, { duration: 50 }), withTiming(1.1, { duration: 100 }), withTiming(1, { duration: 50 }));
        opacity.value = withTiming(value ? 0 : 1, { duration: 150 });
        onChange === null || onChange === void 0 ? void 0 : onChange(!value);
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
    const renderCheckbox = () => (jsxs(Animated$1.View, { style: [
            styles$2.checkbox,
            containerSize,
            {
                borderColor: color,
                borderWidth: 2,
                borderRadius: 2,
                backgroundColor: value ? color : "transparent",
            },
            checkboxAnimatedStyle,
        ], children: [value && !indeterminate && (jsx(Animated$1.Text, { style: [styles$2.checkmark, { fontSize: 15 }, checkmarkAnimatedStyle], children: "\u2713" })), indeterminate && (jsx(View, { style: [
                    styles$2.indeterminate,
                    {
                        backgroundColor: value ? THEME_COLORS.onPrimary : color,
                        width: size * 0.6,
                    },
                ] }))] }));
    const rippleSize = size * 2;
    return (jsxs(View, { style: styleView, children: [jsxs(TouchableOpacity, { onPress: handlePress, style: [
                    styles$2.touchable,
                    { minHeight: rippleSize, minWidth: rippleSize },
                ], disabled: disabled, children: [jsx(View, { style: [
                            styles$2.rippleContainer,
                            { width: rippleSize, height: rippleSize },
                        ], children: renderCheckbox() }), label && (jsx(Text$1, { style: [
                            paragraphText,
                            styles$2.label,
                            { color: disabled ? "#9E9E9E" : "#000000" },
                            labelStyle,
                        ], children: label }))] }), error && jsx(Text$1, { style: [paragraphText, styles$2.error], children: error })] }));
};
const styles$2 = StyleSheet.create({
    checkbox: Object.assign({ alignItems: "center", justifyContent: "center", backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 8, borderWidth: 2, shadowColor: '#4F8AFA', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 12, elevation: 6 }, Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
        },
        android: {
            elevation: 2,
        },
    })),
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
var Checkbox$1 = memo(Checkbox);

const RadioButton = ({ value = false, onChange, label, disabled = false, errorMessage, variant = "primary", styleView, labelStyle, size = 20, }) => {
    const theme = useThemeColors();
    const THEME_COLORS = useMemo(() => ({
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
    }), [
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
    ]);
    const scale = useSharedValue(1);
    const innerScale = useSharedValue(value ? 1 : 0);
    useEffect(() => {
        innerScale.value = value ? 1 : 0;
    }, [value, innerScale]);
    const handlePress = useCallback(() => {
        if (disabled || value)
            return;
        scale.value = withSequence(withTiming(0.8, { duration: 50 }), withTiming(1.1, { duration: 100 }), withTiming(1, { duration: 50 }));
        innerScale.value = withTiming(1, { duration: 150 });
        onChange === null || onChange === void 0 ? void 0 : onChange(!value);
    }, [disabled, value, onChange, scale, innerScale]);
    const radioAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    const innerCircleAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: innerScale.value }],
    }));
    const color = useMemo(() => disabled ? "#9E9E9E" : errorMessage ? "#B00020" : THEME_COLORS[variant], [THEME_COLORS, disabled, errorMessage, variant]);
    const containerSize = useMemo(() => ({
        width: size,
        height: size,
    }), [size]);
    const innerSize = useMemo(() => size * 0.5, [size]);
    const renderRadio = useMemo(() => {
        return (jsx(Animated$1.View, { style: [
                styles$1.radio,
                containerSize,
                {
                    borderColor: color,
                    borderWidth: 2,
                    borderRadius: size,
                },
                radioAnimatedStyle,
            ], children: value && (jsx(Animated$1.View, { style: [
                    styles$1.innerCircle,
                    {
                        width: innerSize,
                        height: innerSize,
                        borderRadius: innerSize / 2,
                        backgroundColor: color,
                    },
                    innerCircleAnimatedStyle,
                ] })) }));
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
    return (jsx(View, { style: styleView, children: jsxs(TouchableOpacity, { onPress: handlePress, style: [
                styles$1.touchable,
                { minHeight: rippleSize, minWidth: rippleSize },
            ], disabled: disabled, children: [jsx(View, { style: [
                        styles$1.rippleContainer,
                        { width: rippleSize, height: rippleSize },
                    ], children: renderRadio }), label && (jsx(Text$1, { style: [
                        paragraphText,
                        { color: disabled ? "#9E9E9E" : "#000000" },
                        labelStyle,
                    ], children: label }))] }) }));
};
const styles$1 = StyleSheet.create({
    innerCircle: {
        position: "absolute",
        shadowColor: '#4F8AFA',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 2,
    },
    radio: Object.assign({ alignItems: "center", justifyContent: "center", backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 24, borderWidth: 2, shadowColor: '#4F8AFA', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 12, elevation: 6 }, Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
        },
        android: {
            elevation: 2,
        },
    })),
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

const RadioGroup = ({ radioOptions = [], value, onChange, errorMessage, variant = "primary", styleView, disabled = false, label, direction = "vertical", }) => {
    return (jsxs(View, { style: [styles.container, styleView], children: [label && (jsx(Text$1, { style: [paragraphText, styles.label, { color: "#666" }], children: label })), jsx(View, { style: [
                    styles.radioContainer,
                    direction === "horizontal" && styles.horizontalContainer,
                ], children: radioOptions.map((option, index) => (jsx(RadioButton, { value: value === (option === null || option === void 0 ? void 0 : option.value), onChange: () => onChange === null || onChange === void 0 ? void 0 : onChange(option === null || option === void 0 ? void 0 : option.value), label: option.label, disabled: disabled || option.disabled, errorMessage: errorMessage, variant: variant, styleView: [
                        direction === "vertical"
                            ? styles.verticalRadio
                            : styles.horizontalRadio,
                        index === radioOptions.length - 1 &&
                            direction === "horizontal" &&
                            styles.lastHorizontalRadio,
                    ] }, option.label))) }), errorMessage && direction === "horizontal" && (jsx(Text$1, { style: [paragraphText, styles.error], children: errorMessage }))] }));
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    error: {
        color: "#B00020",
        marginTop: 4,
    },
    horizontalContainer: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    horizontalRadio: {
        marginRight: 16,
        marginVertical: 4,
    },
    label: {
        marginBottom: 8,
    },
    lastHorizontalRadio: {
        marginRight: 0,
    },
    radioContainer: {
        width: "100%",
    },
    verticalRadio: {
        marginVertical: 4,
    },
});

const useBreakpoint = (sm, md, lg, xl) => {
    const { width } = useWindowDimensions();
    const breakpoint = useMemo(() => {
        if (width >= 1280) {
            return 'xl';
        }
        else if (width >= 1024) {
            return 'lg';
        }
        else if (width >= 768) {
            return 'md';
        }
        else {
            return 'sm';
        }
    }, [width]);
    const valueWithBreakpoint = useMemo(() => {
        switch (breakpoint) {
            case 'sm':
                return sm;
            case 'md':
                return md;
            case 'lg':
                return lg;
            case 'xl':
                return xl;
            default:
                return sm;
        }
    }, [breakpoint, lg, md, sm, xl]);
    return { breakpoint, valueWithBreakpoint };
};

export { Actions, Alert$1 as Alert, Button, Calendar, Card$1 as Card, Checkbox$1 as Checkbox, Colors, Dropdown, Footer$1 as Footer, Header, Image, Item$1 as Item, List$1 as List, ListItem$1 as ListItem, Loading, LoadingContainer, NotificationContainer$1 as MaterialNotificationContainer, Modal$1 as Modal, Paragraph$1 as Paragraph, RadioButton, RadioGroup, SearchBar$1 as SearchBar, SocialLink, Text, TextInput$1 as TextInput, buttonStyle, contentLayout, contentLayoutRow, fouterLayout, gap, getStyleConfig, headerTitle, iconTitleSize, inputLabel, padding, pageLayout, paragraphLayout, paragraphText, sectionListItemTitle, sectionSubtitle, sectionTitle, setColors, setStyleConfig, tabLabel, truncateStyle, useBreakpoint, useThemeColors };
//# sourceMappingURL=index.mjs.map
