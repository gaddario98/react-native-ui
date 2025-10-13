import { useCallback, useMemo } from "react";
import { TouchableOpacity, Text, StyleSheet, Linking } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SocialLinkProps } from "./types";
import {
  contentLayoutRow,
  paragraphText,
  gap,
  buttonStyle,
  tabLabel,
} from "../../styles";
import { Colors } from "../../styles/colors";

const SOCIAL_BASE_URLS = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  twitter: "https://twitter.com/",
  tiktok: "https://www.tiktok.com/@",
  linkedin: "https://www.linkedin.com/in/",
  youtube: "https://www.youtube.com/",
} as const;

const SOCIAL_ICONS = {
  instagram: "instagram",
  facebook: "facebook",
  twitter: "twitter",
  tiktok: "music-note", // Alternativa per TikTok
  linkedin: "linkedin",
  youtube: "youtube",
  custom: "web",
} as const;

const SOCIAL_COLORS = {
  instagram: "#E4405F",
  facebook: "#1877F2",
  twitter: "#1DA1F2",
  tiktok: "#000000",
  linkedin: "#0A66C2",
  youtube: "#FF0000",
  custom: "#6B7280",
} as const;

const DEFAULT_ICON_SIZE = 26;

export const SocialLink: React.FC<SocialLinkProps> = ({
  platform,
  username,
  url,
  text,
  icon,
  style,
  textStyle,
  onError,
  iconOnly = true,
  iconSize = DEFAULT_ICON_SIZE,
  iconColor,
}) => {
  const handlePress = useCallback(async () => {
    try {
      let linkUrl = "";

      if (platform === "custom" && url) {
        linkUrl = url;
      } else if (username && platform !== "custom") {
        linkUrl = `${SOCIAL_BASE_URLS[platform]}${username}/`;
      }

      if (linkUrl) {
        await Linking.openURL(linkUrl);
      }
    } catch (error) {
      if (error instanceof Error && onError) {
        onError(error);
      }
      throw error;
    }
  }, [platform, username, url, onError]);

  const renderIcon = useCallback(() => {
    if (icon) return icon;

    const color = iconColor || SOCIAL_COLORS[platform];
    const iconName = SOCIAL_ICONS[
      platform
    ] as keyof typeof MaterialCommunityIcons.glyphMap;

    return (
      <MaterialCommunityIcons name={iconName} size={iconSize} color={color} />
    );
  }, [platform, icon, iconSize, iconColor]);

  const displayText = useMemo(() => text || platform, [platform, text]);

  if (!username && !url) return;
  return (
    <TouchableOpacity
      style={[iconOnly && styles.iconOnly, contentLayoutRow, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <>
        {renderIcon()}
        {!iconOnly && displayText && (
          <Text
            style={[styles.text, paragraphText, textStyle]}
            numberOfLines={1}
          >
            {displayText}
          </Text>
        )}
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
