import Card from '../Card/Card';
import Text from '../Typography/Text';
import React from 'react';
import type { DropdownItemType, OnDropdownSelect } from './Dropdown';
import ContentIcon, { IconType } from '../Icon/ContentIcon';
import useRtl from '../../hooks/useRtl';

type Props = {
  item: DropdownItemType;
  onSelect: OnDropdownSelect;
  width: number;
  selected: boolean;
  selectedIcon: IconType | null;
};

export default function DropdownItem({
  item,
  onSelect,
  width,
  selected,
  selectedIcon,
}: Props) {
  let { left, right } = useRtl(
    item.leftIcon,
    selected ? selectedIcon : item.rightIcon
  );

  return (
    <Card
      minWidth={width}
      zIndex={99999}
      onPress={() => onSelect(item)}
      padding={'s'}
      paddingHorizontal={'m'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      {left}
      <Text color={'text'}>{item.label}</Text>
      {right}
    </Card>
  );
}
