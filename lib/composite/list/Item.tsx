import { memo } from "react";
import { View, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { useListStyles } from "./styles";
import { useListItemActions, useListItemRenderers } from "./hooks";
import { gap, paragraphText, sectionListItemTitle } from "../../../styles";
import { ListItemModel, ListPress } from "./types";
import { ImageStyle } from "expo-image";
import { Text } from "../../base";

interface ItemProps extends ListItemModel {
  ns?: string;
  onPressGeneral?: ListPress | (() => void);
  customStyles?: {
    container?: ViewStyle;
    item?: ViewStyle;
    title?: TextStyle;
    description?: TextStyle;
    profilePicture?: ImageStyle;
  };
  defaultProfilePictureSize?: number;
}

const DEFAULT_PROFILE_PICTURE_SIZE = 65;

const Container = memo(
  ({
    children,
    onPress,
    handlePress,
  }: {
    onPress?: ListPress | (() => void);
    children: React.JSX.Element;
    handlePress: (onPress?: ListPress | (() => void)) => void;
  }) => {
    const styles = useListStyles();
    if (onPress) {
      return (
        <TouchableOpacity
          style={styles.touchableContent}
          onPress={() => handlePress(onPress)}
        >
          {children}
        </TouchableOpacity>
      );
    }
    return children;
  }
);
const Item = ({
  iconRigth,
  rightButton,
  onPress,
  text = "",
  title = "",
  profilePicture,
  profilePictureSize,
  bottomButtom,
  ns,
  onPressGeneral,
  customStyles,
  defaultProfilePictureSize = DEFAULT_PROFILE_PICTURE_SIZE,
  disableDivider,
}: ItemProps) => {
  const styles = useListStyles();
  const { handlePress } = useListItemActions(ns);
  const { renderLeftContent, renderRightContent, renderBottomContent } =
    useListItemRenderers({
      customStyles,
      defaultProfilePictureSize,
    });
  return (
    <View style={{ gap }}>
      <View style={[styles.listItem, customStyles?.item]}>
        <Container
          onPress={onPress ?? onPressGeneral}
          handlePress={handlePress}
        >
          <>
            {renderLeftContent(profilePicture, profilePictureSize)}
            <View style={styles.content}>
              {!!title && (
                <Text
                  numberOfLines={1}
                  ns={ns}
                  props={{
                    style: [sectionListItemTitle, customStyles?.title],
                  }}
                  {...(typeof title === "string" ? { text: title } : title)}
                />
              )}
              {!!text && (
                <Text
                  ns={ns}
                  props={{
                    style: [paragraphText, customStyles?.description],
                  }}
                  {...(typeof text === "string" ? { text } : text)}
                />
              )}
            </View>
            {renderRightContent(iconRigth, rightButton)}
          </>
        </Container>
      </View>
      {bottomButtom && renderBottomContent(bottomButtom)}
      {!disableDivider && <View style={styles.divider} />}
    </View>
  );
};

export default memo(Item);
