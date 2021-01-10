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

export type SelectProps = BaseButtonProps & {
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

  const label = usePlaceholder(children, SelectLabel);
  let placeholder = usePlaceholder(children, SelectPlaceholder, selectedItems);
  let { left, right } = useLeftRight(children, ContentLeft, ContentRight);
  const { Footer, Header, Empty } = useHeaderFooter(
    children,
    ContentHeader as any,
    ContentFooter as any,
    SelectEmpty
  );

  console.log(selectedItems);

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

Select.Label = SelectLabel;
Select.Item = SelectModal;
Select.Placeholder = SelectPlaceholder;
Select.Header = ContentHeader;
Select.Footer = ContentFooter;
Select.SelectedIcon = SelectSelectedIcon;
Select.Right = ContentRight;
Select.Left = ContentLeft;
export default Select;
