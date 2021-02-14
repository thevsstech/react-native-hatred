import { TouchableOpacity } from 'react-native';
import Card, { CardProps } from '../Card/Card';
import Text, { TextProps } from '../Typography/Text';
import React from 'react';
import type { OnSelect, SelectItemType } from './Select';
import type { IconType } from '../Icon/ContentIcon';
import useRtl from '../../hooks/useRtl';
import Box from '../Box';

type Props = CardProps & {
  onSelect: OnSelect;
  item: SelectItemType;
  index: number;
  selected: boolean;
  textProps?: TextProps;
  selectedIcon: IconType;
};

export default function SelectItem({
  onSelect,
  item,
  index,
  selected,
  selectedIcon,
  textProps = {},
  ...rest
}: Props) {
  let { left, right } = useRtl(
    item.leftIcon,
    selected ? selectedIcon : item.rightIcon
  );

  return (
    <TouchableOpacity onPress={() => onSelect(item.value, item, index)}>
      <Card
        width={'100%'}
        paddingHorizontal={'s'}
        flexDirection={'row'}
        height={40}
        borderTopWidth={index !== 0 ? 1 : 0}
        borderTopColor={'border'}
        backgroundColor={'surface'}
        alignItems={'center'}
        {...rest}
      >
        <Box flexDirection={'row'} alignItems={'center'} flex={1}>
          {left}
          <Text marginLeft={left ? 'xs' : 'none'} {...textProps}>
            {item.label}
          </Text>
        </Box>

        {right}
      </Card>
    </TouchableOpacity>
  );
}

SelectItem.displayName = 'Select.Item';
