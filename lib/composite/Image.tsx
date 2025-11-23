import { memo, useMemo, useState, useCallback, ComponentProps } from "react";
import { Image as ExpoImage } from "expo-image";

type ExpoImageProps = ComponentProps<typeof ExpoImage>;

export interface ImageWithFallbackProps extends ExpoImageProps {
  onLoad?: () => void;
  onError?: () => void;
  fallbackSource: ExpoImageProps["source"];
}
const ImageWithFallback = ({
  source,
  style = {},
  fallbackSource,
  onLoad,
  onError,
  transition = 0,
  contentPosition,
  ...props
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  const getUri = useCallback((src: ExpoImageProps["source"]): string => {
    if (typeof src === "string") return src;
    if (typeof src === "number") return src.toString();
    if (Array.isArray(src)) {
      const first = src[0];
      if (typeof first === "string") return first;
      if (typeof first === "number") return (first as number).toString();
      if (first && typeof first === "object" && "uri" in first)
        return (first as { uri?: string }).uri ?? "";
      return "";
    }
    if (src && typeof src === "object" && "uri" in src)
      return (src as { uri?: string }).uri ?? "";
    return "";
  }, []);

  const getSource = useMemo(() => {
    if (hasError) return getUri(fallbackSource ?? "");
    if (!source) return getUri(fallbackSource ?? "");
    return getUri(source) ?? "";
  }, [fallbackSource, source, hasError, getUri]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  if (!getSource) return null;
  return (
    <ExpoImage
      key={getSource}
      source={source}
      placeholder={fallbackSource}
      style={style}
      transition={transition}
      onLoad={onLoad}
      onError={handleError}
      cachePolicy="memory-disk"
      recyclingKey={getSource}
      contentPosition={contentPosition}
      responsivePolicy="live"
      {...props}
    />
  );
};

export default memo(ImageWithFallback);
