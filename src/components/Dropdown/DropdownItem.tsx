import Card from '../Card/Card';
import Text from '../Typography/Text';
import React from 'react';
import type { DropdownItemType, OnDropdownSelect } from './Dropdown';
import ContentIcon from '../Icon/ContentIcon';

type Props = {
  item: DropdownItemType;
  onSelect: OnDropdownSelect;
  width: number;
};

export default function DropdownItem({ item, onSelect, width }: Props) {
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
      <ContentIcon>{item.leftIcon}</ContentIcon>
      <Text color={'text'}>{item.label}</Text>
      <ContentIcon>{item.rightIcon}</ContentIcon>
    </Card>
  );
}
