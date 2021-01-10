import BaseGradient, { LinearGradientProps } from '../Gradient/BaseGradient';
import React from 'react';
import type { Theme } from '../../theme';
import MaskedView from '@react-native-community/masked-view';
import type { ViewStyle } from 'react-native';

type Props = {
  maskGradient?: LinearGradientProps;
  maskGradientVariant?: keyof Theme['gradientVariants'];
  size: number;
  style?: ViewStyle;
  icon: JSX.Element;
};

const styles = {
  width: size,
  height: size,
  borderRadius: 0,
};

export default function MaskedIcon({
  maskGradient,
  maskGradientVariant,
  size,
  icon,
  style,
}: Props) {
  return (
    <MaskedView
      style={[
        style,
        {
          width: size,
          height: size,
        },
      ]}
      maskElement={icon}
    >
      <BaseGradient
        variant={maskGradientVariant}
        {...maskGradient}
        style={styles}
      />
    </MaskedView>
  );
}
