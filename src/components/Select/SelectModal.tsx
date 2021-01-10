import React, { useCallback } from 'react';
import SelectItem from './SelectItem';
import {
  FlatList,
  ListRenderItem,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Box from '../Box';
import { spacing as margin } from '../../theme/spacing';
import type { OnSelect, SelectItemType } from './Select';
type Value = Array<string | number>;

type ModalProps = {
  visible: boolean;
  selectedIcon: JSX.Element;
  items: SelectItemType[];
  onSelect: OnSelect;
  onDismiss: () => void;
  Header?: JSX.Element;
  Footer?: JSX.Element;
  EmptyComponent?: JSX.Element;
  value: Value;
  renderItem?: ListRenderItem<any>;
};

const styles = {
  flatList: { width: '100%' },
  flatListContent: {
    paddingVertical: margin.m,
  },

  innerContainer: {
    zIndex: 999999,
  },
  rectButton: {
    flex: 1,
  },
  titleBoxStyle: {
    borderBottomColor: '#dbdbdb',
  },
  modalBackgroundTouchableStyle: {
    flex: 1,
  },
};

const isSelected = (selectedItemValue: Value, itemValue: any) => {
  if (
    Array.isArray(selectedItemValue) &&
    selectedItemValue.includes(itemValue)
  ) {
    return true;
  }

  return selectedItemValue === itemValue;
};

const SelectModal = ({
  visible,
  onSelect,
  onDismiss,
  renderItem,
  value,
  items,
  Header,
  Footer,
  EmptyComponent,
  selectedIcon,
}: ModalProps) => {
  const renderItemCallback = useCallback(
    ({ item, index }) => {
      const selected = isSelected(value, item.value);

      return (
        <SelectItem
          onSelect={onSelect}
          item={item}
          index={index}
          selected={selected}
          selectedIcon={selectedIcon}
        />
      );
    },
    [onSelect, selectedIcon, value]
  );

  return (
    <Modal
      animationType={'fade'}
      transparent
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback
        onPress={onDismiss}
        style={styles.modalBackgroundTouchableStyle}
      >
        <Box
          backgroundColor={'backdrop'}
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            pointerEvents={'box-none'}
            padding={'m'}
            style={styles.innerContainer}
            minHeight={50}
            backgroundColor={'surface'}
            borderRadius={'s'}
            margin={'l'}
            width={'85%'}
          >
            {visible ? (
              <FlatList
                data={items || []}
                style={styles.flatList}
                initialNumToRender={7}
                ListEmptyComponent={EmptyComponent}
                contentContainerStyle={styles.flatListContent}
                ListHeaderComponent={Header}
                ListFooterComponent={Footer}
                keyExtractor={(item) =>
                  typeof item.value === 'number'
                    ? item.value.toString()
                    : item.value
                }
                renderItem={renderItem || renderItemCallback}
              />
            ) : null}
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

SelectModal.defaultProps = {
  containerProps: {},
};

export default SelectModal;
