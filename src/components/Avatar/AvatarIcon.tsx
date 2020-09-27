import React from 'react';
import Icon, { ThemeIconProps } from '../Icon/Icon';
import AvatarContainer, { AvatarContainerProps } from './AvatarContainer';
import type { ViewStyle } from 'react-native';

type AvatarIconProps = ThemeIconProps &
  AvatarContainerProps & {
    containerStyle?: ViewStyle;
  };

const AvatarIcon = ({
  sizeMultiply,
  containerStyle,
  size,
  ...rest
}: AvatarIconProps) => {
  return (
    <AvatarContainer
      style={containerStyle}
      sizeMultiply={sizeMultiply}
      size={size}
    >
      <Icon size={size} {...rest} />
    </AvatarContainer>
  );
};

AvatarIcon.defaultProps = {};

export default React.memo(AvatarIcon);
