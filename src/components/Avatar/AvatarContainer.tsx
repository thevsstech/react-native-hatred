import React from 'react';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import type { ViewStyle } from 'react-native';

export type AvatarContainerProps = {
  backgroundColor?: keyof Theme['colors'] | string;
  size: number;
  sizeMultiply?: number;
  style?: ViewStyle;
};

const AvatarContainer = ({
  style,
  backgroundColor,
  children,
  sizeMultiply = 1.5,
  size,
}: AvatarContainerProps & { children: any }) => {
  const theme = useTheme<Theme>();
  size = size * sizeMultiply;

  backgroundColor = (theme.colors[backgroundColor as string] ||
    backgroundColor) as string;

  return (
    <Box
      alignItems={'center'}
      justifyContent={'center'}
      width={size}
      height={size}
      style={[
        { borderRadius: size / 2 },
        backgroundColor ? { backgroundColor } : null,
        style,
      ]}
    >
      {children}
    </Box>
  );
};

AvatarContainer.defaultProps = {
  backgroundColor: 'primary',
};

export default AvatarContainer;
