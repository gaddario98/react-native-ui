// components/ListItemRenderers.tsx
import { ComponentProps, useCallback } from "react";
import {
  View,
  Image,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Alert,
} from "react-native";
import { ListItemProps, ListPress } from "./types";
import { useListStyles } from "./styles";
import { Button } from "../../base";
import { router } from "expo-router";
import { contentLayoutRow, iconTitleSize } from "../../../styles";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { openLink } from "@gaddario98/react-native-utiles";

interface RenderersProps {
  customStyles?: {
    icon?: Omit<ComponentProps<typeof Ionicons>, "name">;
    profilePicture?: StyleProp<ImageStyle>;
    rightButton?: StyleProp<ViewStyle>;
  };
  defaultProfilePictureSize: number;
}

export const useListItemRenderers = ({
  customStyles,
  defaultProfilePictureSize,
}: RenderersProps) => {
  const styles = useListStyles();
  const renderLeftContent = useCallback(
    (
      profilePicture?: ListItemProps["items"][number]["profilePicture"],
      profilePictureSize?: number
    ) => {
      if (profilePicture) {
        const size = profilePictureSize ?? defaultProfilePictureSize;
        return (
          <View style={styles.leftIcon}>
            <Image
              source={{ uri: profilePicture }}
              style={[
                styles.profilePicture,
                { width: size, height: size },
                customStyles?.profilePicture,
              ]}
            />
          </View>
        );
      }

      return null;
    },
    [customStyles, defaultProfilePictureSize, styles]
  );

  const renderRightContent = useCallback(
    (
      iconRigth?: ComponentProps<typeof Ionicons>["name"],
      rightButton?: ListItemProps["items"][number]["rightButton"]
    ) => {
      if (rightButton) {
        return (
          <View style={[styles.rightIcon, customStyles?.rightButton]}>
            <Button size="small" {...rightButton} style={styles.rightButton} />
          </View>
        );
      }

      if (iconRigth) {
        return (
          <View style={styles.rightIcon}>
            <Ionicons
              {...(customStyles?.icon ?? {})}
              name={iconRigth}
              size={iconTitleSize}
            />
          </View>
        );
      }

      return null;
    },
    [customStyles, styles]
  );

  const renderBottomContent = useCallback(
    (bottomButton?: ListItemProps["items"][number]["bottomButtom"]) => {
      if (bottomButton) {
        if (Array.isArray(bottomButton)) {
          return (
            <View style={contentLayoutRow}>
              {bottomButton?.map((el, index) => <Button key={index} {...el} />)}
            </View>
          );
        }

        return <Button {...bottomButton} />;
      }
      return null;
    },
    [styles]
  );

  return {
    renderLeftContent,
    renderRightContent,
    renderBottomContent,
  };
};

export const useListItemActions = (ns?: string) => {
  const { t } = useTranslation(ns);
  const handlePress = useCallback(
    (onPress?: ListPress | (() => void)): void => {
      if (onPress) {
        if (typeof onPress === "function") {
          onPress();
        } else {
          const { link, route, action } = onPress;
          if (route) {
            router.push(route);
          } else if (link) {
            openLink(link);
          } else {
            Alert.alert(
              t(action?.title ?? "confirm", { ns: action?.ns }),
              action?.description && t(action?.description, { ns: action?.ns }),
              [
                {
                  text: t(action?.cancelButton?.label ?? "cancel", {
                    ns: action?.ns,
                  }),
                  style: "cancel",
                  onPress: action?.cancelButton?.action,
                },
                {
                  text: t(action?.okButton?.label ?? "ok", { ns: action?.ns }),
                  onPress: action?.okButton?.action,
                },
              ]
            );
          }
        }
      }
    },
    [t]
  );

  return { handlePress };
};
