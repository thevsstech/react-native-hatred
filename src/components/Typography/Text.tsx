import {
  color,
  createText,
  createVariant,
  opacity,
  spacing,
  typography as shopifyTypography,
  spacingShorthand,
  TextProps as ShopifyTextProps,
  textShadow,
  useRestyle,
  useTheme,
  visible,
} from '@shopify/restyle';
import type { Theme } from '../../theme';
import type { TextProps as NativeTextProps, TextStyle } from 'react-native';
import typography, { Fonts } from '../../theme/typography';
import React, { useMemo } from 'react';
import colored from 'color';

let functions = [
  color,
  opacity,
  visible,
  shopifyTypography,
  spacing,
  spacingShorthand,
  textShadow,
  createVariant({ themeKey: 'textVariants' }) as any,
];

export type TextProps = ShopifyTextProps<Theme> &
  NativeTextProps & {
    children?: any;
    alpha?: number;
    weight?: keyof Fonts;
  };

const BaseText = createText<Theme>();

const Text = ({ alpha, weight, ...rest }: TextProps) => {
  const props = useRestyle(functions, rest) as {
    style: TextStyle[];
  };

  let theme = useTheme<Theme>();

  const additionalStyle = useMemo<TextStyle>(() => {
    // @ts-ignore
    let font = weight ? theme.typography.primary[weight] : {};

    let style = {
      writingDirection: theme.settings.isRtl ? 'rtl' : 'ltr',
      ...font,
    } as TextStyle;

    if (props.style[0]?.color && alpha) {
      style.color = colored(props.style[0].color).alpha(alpha).rgb().string();
    }
    return style;
  }, [theme.settings.isRtl, props.style, alpha, weight, theme.typography]);

  return <BaseText {...props} style={[props.style, additionalStyle]} />;
};

Text.defaultProps = {
  color: 'text',
  alpha: 1,
  ...typography.primary?.Regular,
};

export default Text;
