import React from 'react';
import AvatarContainer, { AvatarContainerProps } from './AvatarContainer';
import Text, { TextProps } from '../Typography/Text';
import type { ViewStyle } from 'react-native';

type AvatarTextProps = AvatarContainerProps &
  TextProps & {
    text: string | number;
    containerStyle?: ViewStyle;
  };

const AvatarText = ({
  sizeMultiply,
  containerStyle,
  size = 14,
  backgroundColor,
  text,
  ...rest
}: AvatarTextProps) => {
  return (
    <AvatarContainer
      style={containerStyle}
      sizeMultiply={sizeMultiply}
      size={size}
      backgroundColor={backgroundColor}
    >
      <Text
        {...rest}
        textAlign={'center'}
        numberOfLines={2}
        weight={'SemiBold'}
        fontSize={size}
      >
        {text}
      </Text>
    </AvatarContainer>
  );
};

export default AvatarText;
