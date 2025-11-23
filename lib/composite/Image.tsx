import { memo, useMemo, useState, useCallback } from "react";
import {
  Image as ExpoImage,
  ImageContentFit,
  ImageContentPosition,
  ImageStyle,
} from "expo-image";
import type { StyleProp } from "react-native";

export interface ImageWithFallbackProps {
  source: string | string[] | number | { uri: string } | null | undefined;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageContentFit;
  fallbackSource: string | number | { uri: string };
  onLoad?: () => void;
  onError?: () => void;
  transition?: number;
  contentPosition?: ImageContentPosition | undefined;
}

const ImageWithFallback = ({
  source,
  style = {},
  resizeMode = "cover",
  fallbackSource,
  onLoad,
  onError,
  transition = 0,
  contentPosition,
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  const getUri = useCallback(
    (
      src: string | string[] | number | { uri: string } | null | undefined
    ): string => {
      if (typeof src === "string") return src;
      if (typeof src === "number") return src.toString();
      if (Array.isArray(src)) {
        const first = src[0];
        if (typeof first === "string") return first;
        if (typeof first === "number") return (first as number).toString();
        if (first && typeof first === "object" && "uri" in first)
          return (first as { uri: string }).uri;
        return "";
      }
      if (src && typeof src === "object" && "uri" in src)
        return (src as { uri: string }).uri;
      return "";
    },
    []
  );

  const getSource = useMemo(() => {
    if (hasError) return getUri(fallbackSource);
    if (!source) return getUri(fallbackSource);
    return getUri(source);
  }, [fallbackSource, source, hasError, getUri]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  if (!getSource) return null;
  return (
    <ExpoImage
      key={getSource}
      source={getSource}
      style={style}
      contentFit={resizeMode}
      transition={transition}
      placeholder={getUri(fallbackSource)}
      placeholderContentFit={resizeMode}
      onLoad={onLoad}
      onError={handleError}
      cachePolicy="memory-disk"
      recyclingKey={getSource}
      contentPosition={contentPosition}
      responsivePolicy="live"
    />
  );
};

export default memo(ImageWithFallback);
