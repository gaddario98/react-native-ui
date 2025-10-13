// types.ts
import { ComponentProps } from "react";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import Paragraph from "../Paragraph";
import { Button, Text } from "../../base";
import { Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface ListPress {
  route?: Href;
  link?: string; // LinkTarget;
  action?: {
    title?: string;
    description?: string;
    ns?: string;
    okButton?: { action?: () => void; label?: string };
    cancelButton?: { action?: () => void; label?: string };
  };
}

interface ButtonProps {
  router: {
    push: (route: Href) => void;
  };
}

interface ListItemModel {
  title?: string | ComponentProps<typeof Text>;
  text?: string | ComponentProps<typeof Text>;
  onPress?: ListPress | (() => void);
  iconRigth?: ComponentProps<typeof Ionicons>["name"];
  profilePicture?: string;
  profilePictureSize?: number;
  rightButton?: ComponentProps<typeof Button>;
  key?: string;
  bottomButtom?:
    | ComponentProps<typeof Button>
    | ComponentProps<typeof Button>[];
  disableDivider?: boolean;
}

interface ListItemProps {
  items: ListItemModel[];
  ns?: string;
  onPressGeneral?: ListPress | (() => void);
  styles?: {
    container?: ViewStyle;
    item?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
    icon?: TextStyle;
    profilePicture?: ImageStyle;
  };
  defaultProfilePictureSize?: number;
}

interface ListProps extends Omit<ListItemProps, "items"> {
  itemsKey?: string;
  listItems?: ListItemModel[];
  button?: ComponentProps<typeof Button>;
  paragraph?: ComponentProps<typeof Paragraph>;
  mapItems?: (items: ListItemModel[]) => ListItemModel[];
  styles?: {
    container?: ViewStyle;
    item?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
    icon?: TextStyle;
    profilePicture?: ImageStyle;
  };
}

export type { ListProps, ListItemProps, ListItemModel, ButtonProps, ListPress };
