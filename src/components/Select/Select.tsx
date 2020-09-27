import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Box from '../Box';
import { spacing as margin } from '../../theme/spacing';
import BaseButton, { BaseButtonProps } from '../Button/BaseButton';
import SelectPlaceholder from './SelectPlaceholder';

import usePlaceholder from '../../hooks/usePlaceholder';
import useHeaderFooter from '../../hooks/useHeaderFooter';
import SelectEmpty from './SelectEmpty';
import SelectSelectedIcon from './SelectSelectedIcon';
import useSelectedIcon from '../../hooks/useSelectedIcon';
import type { IconType } from '../Icon/ContentIcon';
import SelectItem from './SelectItem';

import useLeftRight from '../../hooks/useLeftRight';
import ContentHeader from '../Content/ContentHeader';
import ContentFooter from '../Content/ContentFooter';
import ContentRight from '../Content/ContentRight';
import ContentLeft from '../Content/ContentLeft';

export type SelectItemType = {
  label: string;
  value: string | number;
  leftIcon?: IconType;
  rightIcon?: IconType;
  originalItem?: any;
};
type Value = Array<string | number>;

// placeholder relevant types
type SelectPlaceholderCallbackParams = {
  selected: SelectItemType | SelectItemType[];
};
export type SelectPlaceholderCallback = (
  params: SelectPlaceholderCallbackParams
) => JSX.Element;

export type OnSelect = (
  value: string | number,
  item: SelectItemType,
  index: number
) => void;

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

export type SelectProps = Pick<
  BaseButtonProps,
  Exclude<keyof BaseButtonProps, 'onPress'>
> & {
  items: Array<SelectItemType>;
  onSelect: Function;
  placeholder?: string;
  value: string | number | Value;
  children: JSX.Element | JSX.Element[];
};

const Select = ({ items, onSelect, value, children, ...rest }: SelectProps) => {
  const [visible, setVisible] = useState(false);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const openSelect = useCallback(() => {
    setVisible(true);
  }, []);

  const onSelectCallback = useCallback(
    (value, item, index) => {
      onSelect(value, item, index);
      onDismiss();
    },
    [onSelect, onDismiss]
  );

  const selectedValues = useMemo<any[]>(() => {
    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  }, [value]);

  const selectedItems = useMemo(() => {
    return selectedValues.map((value) => {
      return items.find((item) => item.value === value);
    });
  }, [selectedValues, items]);
  let placeholder = usePlaceholder(children, SelectPlaceholder, selectedItems);
  let { left, right } = useLeftRight(children, ContentLeft, ContentRight);
  const { Footer, Header, Empty } = useHeaderFooter(
    children,
    ContentHeader,
    ContentFooter,
    SelectEmpty
  );
  const selectedIcon = useSelectedIcon<JSX.Element>(
    children,
    SelectSelectedIcon
  );

  return (
    <>
      <BaseButton
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        {...rest}
        onPress={openSelect}
        leftIcon={left}
        rightIcon={right}
      >
        {placeholder}
      </BaseButton>

      <SelectModal
        visible={visible}
        items={items}
        Footer={Footer}
        Header={Header}
        EmptyComponent={Empty}
        value={selectedValues}
        selectedIcon={selectedIcon}
        onSelect={onSelectCallback}
        onDismiss={onDismiss}
      />
    </>
  );
};

Select.defaultProps = {
  variant: 'select',
  placeholderProps: {},
};

Select.Item = SelectModal;
Select.Placeholder = SelectPlaceholder;
Select.Header = ContentHeader;
Select.Footer = ContentFooter;
Select.SelectedIcon = SelectSelectedIcon;
Select.Right = ContentRight;
Select.Left = ContentLeft;
export default Select;
