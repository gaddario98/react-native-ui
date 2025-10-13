import React, { memo, useCallback, useMemo } from "react";
import {
  padding,
  gap,
  buttonStyle,
  sectionSubtitle,
  sectionTitle,
  contentLayoutRow,
} from "../../styles";
import { Colors } from "../../styles/colors";
import {
  pageLayout,
  contentLayout,
  paragraphText,
  useThemeColors,
} from "../../styles";
import { ReactNode } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { ImageStyle } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, SocialLink, Text } from "../base";
import Image from "./Image";

type SocialPlatform =
  | "instagram"
  | "facebook"
  | "twitter"
  | "tiktok"
  | "linkedin"
  | "youtube"
  | "custom";

interface SocialLink {
  platform: SocialPlatform;
  username?: string;
  url?: string;
  text?: string;
  icon?: React.ReactNode;
}

interface IconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface CardProps {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  content?: string | ReactNode;
  image?: string;
  fallbackSource?: string;
  actions?: Array<React.ComponentProps<typeof Button>>;
  socialLinks?: SocialLink[];
  outlined?: boolean;
  elevated?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<TextStyle>;
  actionsContainerStyle?: StyleProp<ViewStyle>;
  socialContainerStyle?: StyleProp<ViewStyle>;
  ns?: string;
  onlyImage?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  imagePosition?: "left" | "right" | "bottom" | "top";
  icon?: IconProps;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  content,
  image,
  actions,
  socialLinks,
  outlined = true,
  elevated = false,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  contentStyle,
  actionsContainerStyle,
  socialContainerStyle,
  ns,
  onlyImage,
  containerStyle,
  imageStyle = {
    height: 200,
    width: "100%",
  },
  imagePosition,
  icon,
  fallbackSource = "",
}) => {
  const { t } = useTranslation(ns);

  const colors = useThemeColors();
  const CardContainer: React.ComponentType<any> = useMemo(
    () => (onPress ? TouchableOpacity : View),
    [onPress]
  );

  const renderIcon = useMemo(() => {
    if (!icon) return null;
    return (
      <TouchableOpacity
        onPress={icon.onPress}
        style={[styles.iconContainer, icon.style]}
        disabled={!icon.onPress}
      >
        <MaterialIcons
          name={icon.name}
          size={icon.size || 24}
          color={icon.color || colors.primary}
        />
      </TouchableOpacity>
    );
  }, [icon, colors.primary]);

  const renderContent = useCallback(
    (
      content: string | ReactNode,
      defaultStyle: StyleProp<TextStyle>,
      customStyle?: StyleProp<TextStyle>,
      textProps?: Partial<React.ComponentProps<typeof Text>>
    ) => {
      if (typeof content === "string") {
        return (
          <Text
            contentStyle={[defaultStyle, customStyle]}
            style={[defaultStyle, customStyle]}
            text={t(content)}
            {...textProps}
          />
        );
      }
      return content;
    },
    [t]
  );

  const containerStyles = useMemo(
    () => [
      styles.container,
      outlined && styles.outlined,
      elevated &&
        (Platform.OS === "ios" ? styles.elevatedIOS : styles.elevatedAndroid),
      style,
      containerStyle,
      ["left", "right"].includes(imagePosition ?? "") && contentLayoutRow,
      onlyImage && { borderRadius: 18 },
    ],
    [outlined, elevated, style, containerStyle, imagePosition]
  );

  const renderSocialLinks = useMemo(() => {
    if (!socialLinks?.length) return null;
    return (
      <View
        style={[styles.socialLinks, contentLayoutRow, socialContainerStyle]}
      >
        {socialLinks.map((link, index) => (
          <SocialLink
            key={index}
            platform={link.platform}
            username={link.username}
            url={link.url}
            text={link.text}
            icon={link.icon}
          />
        ))}
      </View>
    );
  }, [socialLinks, socialContainerStyle]);

  const renderActions = useMemo(() => {
    if (!actions?.length) return null;

    return (
      <View style={[styles.actions, contentLayoutRow, actionsContainerStyle]}>
        {actions.map((action, index) => (
          <Button key={index} variant="text" ns={ns} {...action} />
        ))}
      </View>
    );
  }, [actions, ns, actionsContainerStyle]);

  const renderImage = useMemo(() => {
    if (!image && !fallbackSource) return null;
    return (
      <Image
        fallbackSource={fallbackSource}
        source={image?.toString()}
        resizeMode="cover"
        style={imageStyle}
      />
    );
  }, [image, imageStyle, fallbackSource]);

  const renderedTitle = useMemo(
    () =>
      title &&
      renderContent(
        title,
        [sectionTitle, { color: colors.primary }],
        titleStyle,
        {
          numberOfLines: 2,
        }
      ),
    [title, renderContent, colors.primary, titleStyle]
  );

  const renderedSubtitle = useMemo(
    () => subtitle && renderContent(subtitle, [sectionSubtitle], subtitleStyle),
    [subtitle, subtitleStyle, renderContent]
  );

  const renderedContent = useMemo(
    () => content && renderContent(content, [paragraphText], contentStyle),
    [content, contentStyle, renderContent]
  );

  const hasFooter = useMemo(
    () => !!socialLinks?.length || !!actions?.length,
    [actions?.length, socialLinks?.length]
  );
  const imageTitleStyle = useMemo(
    () => [
      styles.imageTitle,
      {
        backgroundColor: colors.backdrop,
        color: colors.background,
      },
    ],
    [colors]
  );

  const renderImageTitle = useMemo(() => {
    if (!onlyImage || typeof title !== "string") return null;
    return (
      <Text
        contentStyle={[styles.imageTitleContainer]}
        style={[imageTitleStyle, titleStyle]}
        text={t(title)}
      />
    );
  }, [onlyImage, title, imageTitleStyle, t, titleStyle]);

  return (
    <View>
      <CardContainer
        style={containerStyles}
        onPress={onPress}
        disabled={!onPress}
      >
        {[undefined, "left", "top"].includes(imagePosition) && renderImage}
        {renderIcon}
        <View style={{ flexShrink: 1, height: "100%" }}>
          {renderImageTitle}
          {!onlyImage && (
            <View style={[pageLayout, styles.content]}>
              <View style={contentLayout}>
                {renderedTitle as React.JSX.Element}
                {renderedSubtitle as React.JSX.Element}
                {renderedContent as React.JSX.Element}
                {renderSocialLinks}
              </View>
            </View>
          )}
          {!onlyImage && hasFooter && (
            <View style={styles.footer}>{renderActions}</View>
          )}
        </View>
        {["bottom", "right"].includes(imagePosition ?? "") && renderImage}
      </CardContainer>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor:
      Platform.OS === "ios" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.12)",
    borderWidth: Platform.OS === "ios" ? 0.5 : 1,
  },
  socialLinks: {},
});

export default memo(Card);
