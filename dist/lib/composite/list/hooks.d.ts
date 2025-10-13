import { ComponentProps } from "react";
import { StyleProp, ViewStyle, ImageStyle } from "react-native";
import { ListItemProps, ListPress } from "./types";
import { Ionicons } from "@expo/vector-icons";
interface RenderersProps {
    customStyles?: {
        icon?: Omit<ComponentProps<typeof Ionicons>, "name">;
        profilePicture?: StyleProp<ImageStyle>;
        rightButton?: StyleProp<ViewStyle>;
    };
    defaultProfilePictureSize: number;
}
export declare const useListItemRenderers: ({ customStyles, defaultProfilePictureSize, }: RenderersProps) => {
    renderLeftContent: (profilePicture?: ListItemProps["items"][number]["profilePicture"], profilePictureSize?: number) => import("react/jsx-runtime").JSX.Element | null;
    renderRightContent: (iconRigth?: ComponentProps<typeof Ionicons>["name"], rightButton?: ListItemProps["items"][number]["rightButton"]) => import("react/jsx-runtime").JSX.Element | null;
    renderBottomContent: (bottomButton?: ListItemProps["items"][number]["bottomButtom"]) => import("react/jsx-runtime").JSX.Element | null;
};
export declare const useListItemActions: (ns?: string) => {
    handlePress: (onPress?: ListPress | (() => void)) => void;
};
export {};
