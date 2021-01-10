import type { Theme } from '../../theme';
import {
  Dimensions,
  FlatList,
  LayoutRectangle,
  Modal,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import DropdownItem from './DropdownItem';
import Card from '../Card/Card';
import type {
  DropdownItemType,
  DropDownPositionType,
  OnDropdownSelect,
} from './Dropdown';
import Box from '../Box';

const styles = {
  modalBackgroundTouchableStyle: {
    flex: 1,
  },
};

const { height: screenHeight } = Dimensions.get('window');

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  items: DropdownItemType[];
  backdropColor: keyof Theme['colors'];
  onSelect: OnDropdownSelect;
  anchorPosition: LayoutRectangle;
  position?: DropDownPositionType;
  Header?: JSX.Element;
  Footer?: JSX.Element;
  Empty?: JSX.Element;
  selectedIcon: JSX.Element | null;
  height: number;
  value: string | number;
};

const DropDownModal = ({
  visible,
  position,
  onDismiss,
  items,
  anchorPosition,
  selectedIcon,
  backdropColor,
  Header,
  Footer,
  Empty,
  value,
  onSelect,
  height = 200,
}: ModalProps) => {
  const keyExtractor = useCallback((item: DropdownItemType) => {
    return typeof item.value === 'number' ? item.value.toString() : item.value;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: DropdownItemType }) => {
      return (
        <DropdownItem
          item={item}
          onSelect={onSelect}
          selected={item.value === value}
          selectedIcon={selectedIcon || null}
          width={anchorPosition.width}
        />
      );
    },
    [onSelect, value, anchorPosition.width, selectedIcon]
  );

  const viewStyle = useMemo<ViewStyle>(() => {
    let top = anchorPosition.y + anchorPosition.height;

    if (position === 'top' && anchorPosition.y > height) {
      top = top - height;
    }

    if (top + height > screenHeight) {
      top = anchorPosition.y - height;
    }

    return {
      position: 'absolute',
      left: anchorPosition.x,
      top: top,
      zIndex: 9999,
      height,
    };
  }, [anchorPosition, position, height]);
  return (
    <Modal
      visible={visible}
      transparent
      onDismiss={onDismiss}
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback
        onPress={onDismiss}
        style={styles.modalBackgroundTouchableStyle}
      >
        <Card flex={1} backgroundColor={backdropColor}>
          <Box borderRadius={'m'} backgroundColor={'surface'} style={viewStyle}>
            <FlatList<DropdownItemType>
              data={items}
              ListEmptyComponent={Empty}
              ListHeaderComponent={Header}
              ListFooterComponent={Footer}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </Box>
        </Card>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DropDownModal;
