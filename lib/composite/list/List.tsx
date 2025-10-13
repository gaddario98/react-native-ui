import { memo, useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ListItemModel, ListProps } from './types';
import ListItem from './ListItem';
import { useListStyles } from './styles';
import Paragraph from '../Paragraph';
import { Button } from '../../base';
import { contentLayout } from '../../../styles';

const List: React.FC<ListProps> = ({
  ns,
  button,
  itemsKey,
  paragraph,
  onPressGeneral,
  mapItems,
  listItems,
  styles: customStyles,
}) => {
  const { t } = useTranslation(ns);

  const items = useMemo(() => {
    if (itemsKey) {
      const translatedItems = t(itemsKey, {
        returnObjects: true,
      }) as ListItemModel[];
      return Array.isArray(translatedItems) ? translatedItems : [];
    }
    return listItems ?? [];
  }, [itemsKey, t, listItems]);

  const mappedItems = useMemo(
    () => (mapItems ? mapItems(items) : items),
    [items, mapItems],
  );
  const styles = useListStyles();

  if (!mappedItems?.length) {
    return;
  }

  return (
    <View style={[styles.listSection, customStyles?.container, contentLayout]}>
      {paragraph && <Paragraph {...paragraph} ns={ns} />}

      <ListItem items={mappedItems} onPressGeneral={onPressGeneral} ns={ns} styles={customStyles}/>

      {button && (
        <Button
          size="large"
          compact
          {...button}
          style={styles.rightButton}
          ns={ns}
        />
      )}
    </View>
  );
};

export default memo(List);
