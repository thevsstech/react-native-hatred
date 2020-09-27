import React from 'react';
import {
  useTheme,
  SpacingProps,
  ShadowProps,
  LayoutProps,
  useRestyle,
  spacing,
  layout,
  shadow,
  VariantProps,
  opacity,
  OpacityProps,
  BackgroundColorProps,
  backgroundColor,
  border,
  BorderProps,
} from '@shopify/restyle';
import type { Theme } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import type { ViewStyle } from 'react-native';
import type { ViewProps } from 'react-native';

export interface LinearGradientProps extends ViewProps {
  colors?: (string | number)[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  useAngle?: boolean;
  angleCenter?: { x: number; y: number };
  angle?: number;
}

export type BaseGradientProps = SpacingProps<Theme> &
  ShadowProps<Theme> &
  LayoutProps<Theme> &
  LinearGradientProps &
  OpacityProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  VariantProps<Theme, 'gradientVariants'> & {
    variant?: string;
    children?: string | JSX.Element | any;
    style?: ViewStyle;
  };

const BaseGradient = ({
  variant,
  children,
  colors,
  start,
  end,
  useAngle,
  angleCenter,
  angle,
  locations,
  ...rest
}: BaseGradientProps) => {
  const theme = useTheme<Theme>();

  if (variant && theme.gradientVariants && theme.gradientVariants[variant]) {
    const {
      colors: variantColors,
      start: variantStart,
      end: variantEnd,
      useAngle: variantUseAngle,
      angle: variantEngle,
      locations: variantLocations,
      angleCenter: variantAngleCenter,
      ...otherProps
    } = theme.gradientVariants[variant];

    colors = colors || variantColors;
    start = start || variantStart;
    end = end || variantEnd;
    useAngle = useAngle || variantUseAngle;
    angle = angle || variantEngle;
    locations = locations || variantLocations;
    angleCenter = angleCenter || variantAngleCenter;

    rest = { ...otherProps, ...rest };
  }

  const gradiantProps = {
    colors,
    start,
    end,
    useAngle,
    angleCenter,
    angle,
    locations,
  };

  const props = useRestyle(
    [spacing, layout, shadow, opacity, border, backgroundColor],
    rest
  );

  // @ts-ignore
  return (
    <LinearGradient {...gradiantProps} {...props}>
      {children || null}
    </LinearGradient>
  );
};

BaseGradient.defaultProps = ({} as unknown) as BaseGradientProps;

export default React.memo(BaseGradient);
