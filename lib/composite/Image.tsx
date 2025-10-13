import { memo, useMemo, useState, useCallback } from "react";
import {
  Image as ExpoImage,
  ImageContentFit,
  ImageContentPosition,
  ImageStyle,
} from "expo-image";
import type { StyleProp } from "react-native";
import { buttonStyle } from "../../styles";

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

  const getSource = useMemo(() => {
    if (hasError) return fallbackSource;
    if (!source) return fallbackSource;
    if (typeof source === "string") return source;
    if (Array.isArray(source)) return source[0];
    return fallbackSource;
  }, [fallbackSource, source, hasError]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);
  
  if (!getSource) return null;
  return (
    <ExpoImage
      key={getSource}
      source={getSource}
      style={[style]}
      contentFit={resizeMode}
      transition={transition}
      placeholder={fallbackSource}
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
