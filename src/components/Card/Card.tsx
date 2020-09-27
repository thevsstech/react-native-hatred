import {
  backgroundColor,
  border,
  BoxProps,
  createVariant,
  layout,
  spacing,
  useRestyle,
  VariantProps,
  opacity,
  visible,
} from '@shopify/restyle';
import type { Theme } from '../../theme';
import React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';

export type CardProps = ViewProps &
  BoxProps<Theme> &
  VariantProps<Theme, 'cardVariants'> & {
    children?: any;
    onPress?: () => void;
  };

const Card = (props: CardProps) => {
  const propsToPass = useRestyle(
    [
      spacing,
      backgroundColor,
      border,
      layout,
      opacity,
      visible,
      createVariant({ themeKey: 'cardVariants' }) as any,
    ],
    props
  );

  return props.onPress ? (
    <TouchableOpacity {...propsToPass}>{props.children}</TouchableOpacity>
  ) : (
    <View {...propsToPass}>{props.children}</View>
  );
};

export default React.memo(Card);
