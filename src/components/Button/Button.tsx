import Text from '../Typography/Text';
import React from 'react';
import BaseButton, { BaseButtonProps } from './BaseButton';
import { TextProps, useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';

export type ButtonProps = BaseButtonProps & {
  onPress: () => void;
  labelProps?: TextProps<Theme>;
  disabled?: boolean;
  children: string;
  loading?: boolean;
};

const Button = ({ onPress, children, disabled, ...rest }: ButtonProps) => {
  const theme = useTheme<Theme>();
  return (
    <BaseButton
      alignItems={'center'}
      flexDirection={'row'}
      {...rest}
      opacity={
        disabled || rest.loading ? (rest.opacity as number) - 0.2 : rest.opacity
      }
      onPress={(disabled || rest.loading ? null : onPress) as any}
    >
      {children ? (
        <Text
          letterSpacing={1}
          fontSize={13}
          marginHorizontal={'s'}
          {...labelProps}
        >
          {children}
        </Text>
      ) : null}
    </BaseButton>
  );
};

Button.defaultProps = ({
  variant: 'primary',
  opacity: 1,
} as unknown) as ButtonProps;

export default React.memo(Button);
