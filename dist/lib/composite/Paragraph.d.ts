import { ComponentProps } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Text } from "../base/Text";
import { TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";
import { ImageStyle } from "expo-image";
export interface ParagraphComponentProps {
    title?: string | ComponentProps<typeof Text>;
    subTitle?: string | ComponentProps<typeof Text>;
    contentStyle?: StyleProp<ViewStyle>;
    description?: string | ComponentProps<typeof Text>;
    img?: string;
    alt?: string;
    imgClass?: string;
    titleStyle?: TextStyle;
    ns?: string;
    titleTransOption?: TOptionsBase & $Dictionary;
    imageStyle?: StyleProp<ImageStyle>;
    titleLine?: number;
}
declare const _default: import("react").NamedExoticComponent<ParagraphComponentProps>;
export default _default;
