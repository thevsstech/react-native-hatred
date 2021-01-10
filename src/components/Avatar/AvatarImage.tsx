import React from 'react';

import Image, { ImageProps } from '../Image/Image';
import AvatarContainer, { AvatarContainerProps } from './AvatarContainer';
import type { ViewStyle } from 'react-native';

type Props = AvatarContainerProps &
  ImageProps & {
    size: number;
    onPress?: () => void;
    containerStyle?: ViewStyle;
  };

/**
 * user avatar component
 *
 *
 * @param size
 * @param backgroundColor
 * @param containerStyle
 * @param sizeMultiply
 * @param onPress
 * @param style
 * @param rest
 * @constructor
 */
const AvatarImage = ({
  size,
  backgroundColor,
  containerStyle,
  sizeMultiply,
  onPress,
  style,
  ...rest
}: Props) => {
  const image = <Image onPress={onPress} {...rest} style={style} />;

  return (
    <AvatarContainer
      backgroundColor={backgroundColor}
      style={containerStyle}
      sizeMultiply={sizeMultiply}
      size={size}
    >
      {image}
    </AvatarContainer>
  );
};

export default React.memo(AvatarImage);
