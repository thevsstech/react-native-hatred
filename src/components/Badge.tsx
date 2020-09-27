import React from 'react';
import Text from './Typography/Text';
import type { Theme } from '../theme';
import type { BoxProps, TextProps } from '@shopify/restyle';
import { TextStyle, TouchableOpacity } from 'react-native';
import AvatarContainer from './Avatar/AvatarContainer';

type Props = BoxProps<Theme> & {
  badge: number | string;
  size: number;
  textStyle?: TextStyle;
  textProps?: TextProps<Theme>;
  sizeMultiply?: number;
  onPress?: () => void;
  backgroundColor: keyof Theme['colors'] | string;
};

const Badge = ({
  badge,
  onPress,
  backgroundColor,
  size,
  sizeMultiply = 1.7,
  textProps,
  textStyle,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AvatarContainer
        size={size}
        sizeMultiply={sizeMultiply}
        backgroundColor={backgroundColor}
        {...rest}
      >
        <Text color={'white'} fontSize={size} style={textStyle} {...textProps}>
          {badge}
        </Text>
      </AvatarContainer>
    </TouchableOpacity>
  );
};

Badge.defaultProps = {
  backgroundColor: 'primary',
};

export default Badge;
