import {
  spacing,
  SpacingProps,
  color,
  ColorProps,
  TypographyProps,
  layout,
  LayoutProps,
  VariantProps,
  createVariant,
  BackgroundColorProps,
  backgroundColor,
  useRestyle,
  shadow,
  ShadowProps,
} from '@shopify/restyle';
import { TextInput, TextInputProps } from 'react-native';
import type { Theme } from '../../theme';
import React from 'react';

export type BaseTextInputProps = SpacingProps<Theme> &
  LayoutProps<Theme> &
  TextInputProps &
  ColorProps<Theme> &
  ShadowProps<Theme> &
  VariantProps<Theme, 'textInputVariants'> &
  BackgroundColorProps<Theme> &
  TypographyProps<Theme> & {
    renderInput?: (props: TextInputProps) => JSX.Element;
  };

const restyleFunctions = [
  spacing,
  layout,
  color,
  shadow,
  backgroundColor,
  createVariant({ themeKey: 'textInputVariants' }) as any,
];

const BaseTextInput = ({ renderInput, ...rest }: BaseTextInputProps) => {
  const props = useRestyle(restyleFunctions, rest);

  return renderInput ? renderInput(props) : <TextInput {...props} />;
};

export default React.memo(BaseTextInput);
