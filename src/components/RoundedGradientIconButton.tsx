import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import BaseGradient, { BaseGradientProps } from './Gradient/BaseGradient';
import Icon, { ThemeIconProps } from './Icon/Icon';

export type GradientIconButtonProps = BaseGradientProps &
  ThemeIconProps & {
    onPress: () => void;
    sizeMultiply?: number;
  };

const RoundedGradientIconButton = ({
  size = 20,
  name,
  color,
  component,
  onPress,
  sizeMultiply = 1.5,
  ...rest
}: GradientIconButtonProps) => {
  let buttonSize = size * sizeMultiply;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          alignSelf: 'flex-start',
        }}
      >
        <BaseGradient
          {...rest}
          style={{ flex: 1, borderRadius: buttonSize / 2 }}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Icon name={name} color={color} size={size} component={component} />
          </View>
        </BaseGradient>
      </View>
    </TouchableOpacity>
  );
};

RoundedGradientIconButton.defaultProps = {
  variant: 'primary',
};

export default RoundedGradientIconButton;
