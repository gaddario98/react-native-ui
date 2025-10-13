import { memo } from "react";
import { View } from "react-native";
import type { ListItemProps } from "./types";
import { useListStyles } from "./styles";
import Item from "./Item";
import { gap } from "../../../styles";

const ListItem: React.FC<ListItemProps> = ({
  items,
  ns,
  onPressGeneral,
  styles: customStyles,
  defaultProfilePictureSize,
}) => {
  const styles = useListStyles();
  return (
    !!items?.length && (
      <View
        style={[
          styles.listSection,
          customStyles?.container,
          { gap },
        ]}
      >
        {items?.map((item, index) => (
          <Item
            {...item}
            key={item.key ?? index.toString()}
            ns={ns}
            onPressGeneral={onPressGeneral}
            customStyles={customStyles}
            defaultProfilePictureSize={defaultProfilePictureSize}
            disableDivider={item.disableDivider || index === items.length - 1}
          />
        ))}
      </View>
    )
  );
};

export default memo(ListItem);
