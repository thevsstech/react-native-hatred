import React from 'react';
import Text, { TextProps } from './Typography/Text';
import type { TextStyle } from 'react-native';

type Props = {
  style?: TextStyle;
  helperProps?: TextProps;
  helperText?: string;
  error: boolean;
  children?: JSX.Element | string;
};

const HelperText = ({ style, helperProps, error, children }: Props) => {
  return (
    <Text
      style={style}
      variant={'helperText'}
      alpha={0.87}
      color={error ? 'error' : 'text'}
      {...helperProps}
    >
      {children}
    </Text>
  );
};

export default HelperText;
