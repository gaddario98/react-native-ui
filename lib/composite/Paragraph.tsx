import { ComponentProps, memo, useMemo } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import {
  contentLayout,
  contentLayoutRow,
  gap,
  iconTitleSize,
  paragraphText,
  sectionSubtitle,
  sectionTitle,
  buttonStyle,
} from "../../styles";
import { Colors, useThemeColors } from "../../styles/colors";
import { Text } from "../base/Text";
import { TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";
import { ImageStyle } from "expo-image";
import Image from "./Image";

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

const Paragraph: React.FC<ParagraphComponentProps> = ({
  title = "",
  subTitle = "",
  contentStyle = {},
  description = "",
  img,
  titleStyle,
  ns,
  titleTransOption = {},
  imageStyle,
  titleLine,
}) => {
  const theme = useThemeColors();
  const titleProps = useMemo(
    () =>
      (typeof title === "string" ? {} : title) as Omit<
        ComponentProps<typeof Text>,
        "text"
      >,
    [title]
  );
  const titleText = useMemo(
    () => (typeof title === "string" ? title : (title?.text ?? "")),
    [title]
  );

  const subTitleProps = useMemo(
    () =>
      (typeof subTitle === "string" ? {} : subTitle) as Omit<
        ComponentProps<typeof Text>,
        "text"
      >,
    [subTitle]
  );
  const subTitleText = useMemo(
    () => (typeof subTitle === "string" ? subTitle : (subTitle?.text ?? "")),
    [subTitle]
  );

  const descriptionProps = useMemo(
    () =>
      (typeof description === "string" ? {} : description) as Omit<
        ComponentProps<typeof Text>,
        "text"
      >,
    [description]
  );
  const descriptionText = useMemo(
    () =>
      typeof description === "string" ? description : (description?.text ?? ""),
    [description]
  );
  return (
    <View style={[contentLayout, { borderRadius: buttonStyle.borderRadius }, contentStyle]}>
      <View style={contentLayoutRow}>
        {img && (
          <Image
            source={img}
            style={
              imageStyle ?? { height: iconTitleSize, width: iconTitleSize, borderRadius: buttonStyle.borderRadius }
            }
            fallbackSource=""
            resizeMode="cover"
          />
        )}
        <View style={{ flexDirection: "column", gap: gap / 2, width: "100%" }}>
          {!!titleText && (
            <View style={contentLayoutRow}>
              <Text
                text={titleText}
                numberOfLines={titleLine}
                props={{
                  style: [
                    sectionTitle,
                    titleStyle,
                    { color: (titleStyle?.color as string) ?? theme.primary },
                  ],
                }}
                iconProps={{
                  color: (titleStyle?.color as string) ?? theme.primary,
                }}
                endIconProps={{
                  color: (titleStyle?.color as string) ?? theme.primary,
                }}
                textTransOption={titleTransOption}
                ns={ns}
                {...titleProps}
              />
            </View>
          )}
          {!!subTitleText && (
            <Text
              props={{ style: sectionSubtitle }}
              text={subTitleText}
              ns={ns}
              {...subTitleProps}
            />
          )}
        </View>
      </View>
      {!!descriptionText && (
        <Text
          text={descriptionText}
          ns={ns}
          {...descriptionProps}
          props={{
            ...descriptionProps?.props,
            style: [paragraphText, descriptionProps?.props?.style],
          }}
        />
      )}
    </View>
  );
};

export default memo(Paragraph);
