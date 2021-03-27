import React, { useCallback, useMemo, useState } from 'react';
import BaseButton, { BaseButtonProps } from '../Button/BaseButton';
import SelectPlaceholder from './SelectPlaceholder';

import usePlaceholder from '../../hooks/usePlaceholder';
import useHeaderFooter from '../../hooks/useHeaderFooter';
import SelectEmpty from './SelectEmpty';
import SelectSelectedIcon from './SelectSelectedIcon';
import useSelectedIcon from '../../hooks/useSelectedIcon';
import type { IconType } from '../Icon/ContentIcon';

import useLeftRight from '../../hooks/useLeftRight';
import ContentHeader from '../Content/ContentHeader';
import ContentFooter from '../Content/ContentFooter';
import ContentRight from '../Content/ContentRight';
import ContentLeft from '../Content/ContentLeft';
import SelectModal from './SelectModal';
import SelectLabel from './SelectLabel';
import SelectItem from './SelectItem';

export type SelectItemType = {
  label: string;
  value: string | number;
  leftIcon?: IconType;
  rightIcon?: IconType;
  originalItem?: any;
};

type Value = Array<string | number>;

export type OnSelect = (
  value: string | number,
  item: SelectItemType,
  index: number
) => void;

export type SelectRenderItemType = (data: {
  selected: boolean;
  item: SelectItemType;
  index: number;
  selectedIcon: any;
  onSelect: OnSelect;
}) => React.ReactElement | null;

export type SelectProps = BaseButtonProps & {
  items: Array<SelectItemType>;
  onSelect: Function;
  placeholder?: string;
  multiple?: boolean;
  value: string | number | Value;
  children: JSX.Element | JSX.Element[];
  renderItem?: SelectRenderItemType;
};

export type SelectRefType = {
  onDismiss: () => void;
};

const Select = ({
  items,
  onSelect,
  value,
  renderItem,
  children,
  multiple = false,
  ...rest
}: SelectProps) => {
  const [visible, setVisible] = useState(false);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const openSelect = useCallback(() => {
    setVisible(true);
  }, []);

  const selectedValues = useMemo<any[]>(() => {
    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  }, [value]);

  const onSelectCallback = useCallback(
    (v, item, index) => {
      if (!multiple) {
        if (v === value) {
          onSelect(null, null, null);
        } else {
          onSelect(v, item, item);
        }

        onDismiss();
      } else {
        const valueExists = selectedValues.find((i) => i === v);

        onSelect(
          valueExists
            ? selectedValues.filter((i) => i !== v)
            : [...selectedValues, v],
          item,
          index
        );
      }
    },
    [onSelect, onDismiss, multiple, selectedValues]
  );

  const selectedItems = useMemo(() => {
    if (!selectedValues.length) {
      return null;
    }
    const selected = selectedValues
      .map((value) => {
        return items.find((item: SelectItemType) => item.value === value);
      })
      .filter((item) => !!item);

    if (selected.length === 0) {
      return null;
    }

    return multiple ? selected : selected[0];
  }, [selectedValues, multiple, items]);

  const label = usePlaceholder(children, SelectLabel, selectedItems);
  let placeholder = usePlaceholder(children, SelectPlaceholder, selectedItems);
  let { left, right } = useLeftRight(children, ContentLeft, ContentRight);
  const { Footer, Header, Empty } = useHeaderFooter(
    children,
    ContentHeader as any,
    ContentFooter as any,
    SelectEmpty,
    { onDismiss }
  );

  const selectedIcon = useSelectedIcon<JSX.Element>(
    children,
    SelectSelectedIcon as any
  );

  return (
    <>
      {label}

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
        renderItem={renderItem}
        selectedIcon={selectedIcon}
        onSelect={onSelectCallback}
        onDismiss={onDismiss}
      />
    </>
  );
};

Select.defaultProps = {
  variant: 'select',
};

Select.Label = SelectLabel;
Select.Item = SelectItem;
Select.Placeholder = SelectPlaceholder;
Select.Header = ContentHeader;
Select.Footer = ContentFooter;
Select.SelectedIcon = SelectSelectedIcon;
Select.Right = ContentRight;
Select.Left = ContentLeft;
export default Select;
