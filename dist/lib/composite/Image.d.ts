import { ImageContentFit, ImageContentPosition, ImageStyle } from "expo-image";
import type { StyleProp } from "react-native";
export interface ImageWithFallbackProps {
    source: string | string[] | null | undefined;
    style?: StyleProp<ImageStyle>;
    resizeMode?: ImageContentFit;
    fallbackSource: string;
    onLoad?: () => void;
    onError?: () => void;
    transition?: number;
    contentPosition?: ImageContentPosition | undefined;
}
declare const _default: import("react").MemoExoticComponent<({ source, style, resizeMode, fallbackSource, onLoad, onError, transition, contentPosition, }: ImageWithFallbackProps) => import("react/jsx-runtime").JSX.Element | null>;
export default _default;
