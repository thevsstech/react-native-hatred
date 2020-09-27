import {
  backgroundColor,
  border,
  createVariant,
  shadow,
  spacing,
  SpacingProps,
  VariantProps,
  BackgroundColorProps,
  BorderProps,
  ShadowProps,
  OpacityProps,
  LayoutProps,
  layout,
  opacity,
  useRestyle,
} from '@shopify/restyle';
import type { Theme } from '../../theme';
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';

export type BaseButtonProps = ViewProps &
  SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  BackgroundColorProps<Theme> &
  ShadowProps<Theme> &
  BorderProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  TouchableOpacityProps & {
    children?: JSX.Element | Array<JSX.Element>;
  };

type Props = BaseButtonProps & {
  onPress: () => void;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};

const functions = [
  spacing,
  backgroundColor,
  border,
  shadow,
  layout,
  opacity,
  createVariant({ themeKey: 'buttonVariants' }) as any,
];

const BaseButton = React.forwardRef<TouchableOpacity, Props>(
  (
    { onPress, children, leftIcon, rightIcon, loading, loadingProps, ...rest },
    ref
  ) => {
    const props = useRestyle(functions, rest);
    return (
      <TouchableOpacity ref={ref} {...props} onPress={onPress}>
        {leftIcon || null}
        {children || null}
        {rightIcon || null}
      </TouchableOpacity>
    );
  }
);

export default React.memo(BaseButton);
