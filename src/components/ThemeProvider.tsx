import React from 'react';
import { ThemeProvider as ShopifyProvider } from '@shopify/restyle';
import baseTheme, { Theme } from '../theme';
import mergeDeep from '../utils/theme';
import Portal from './Portal/Portal';

type Props = {
  theme?: Record<string, any>;
  IconComponent?: React.ComponentType<any>;
  isRtl?: boolean;
  children: JSX.Element | JSX.Element[];
};

const ThemeProvider = ({
  theme = {},
  IconComponent,
  isRtl = false,
  children,
}: Props) => {
  let settings = {
    isRtl,
    icon: IconComponent,
  } as Theme['settings'];

  let mergedTheme = mergeDeep(baseTheme, {
    settings,
    ...theme,
  }) as Theme;
  return (
    <ShopifyProvider theme={mergedTheme}>
      <Portal.Host>{children}</Portal.Host>
    </ShopifyProvider>
  );
};

export default ThemeProvider;
