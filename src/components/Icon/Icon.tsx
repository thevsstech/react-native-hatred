import React from 'react';
import { ResponsiveValue, useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type ThemeIconProps = {
  color?: keyof ResponsiveValue<Theme['colors'], Theme> | string;
  size: number;
  name: string;
  component?: any;
  style?: any;
  onPress?: () => void;
};

const Icon = ({
  component = MaterialCommunityIcons,
  color,
  ...rest
}: ThemeIconProps) => {
  const theme = useTheme<Theme>();

  if ((color as string) in theme.colors) {
    color =
      theme.colors[color as keyof ResponsiveValue<Theme['colors'], Theme>];
  }

  // if components is not specified, fallback to default icon component
  const Component = component || theme.settings.icon;

  return <Component color={color as string} {...rest} />;
};

Icon.displayName = 'Icon';

export default Icon;
