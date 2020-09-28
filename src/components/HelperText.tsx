import React from 'react';
import Text, { TextProps } from './Typography/Text';

export type HelperTextProps = TextProps & {
  error?: boolean;
  children?: JSX.Element | string;
};

const HelperText = ({ error, children, ...rest }: HelperTextProps) => {
  return (
    <Text
      variant={'helperText'}
      alpha={0.87}
      color={error ? 'error' : 'text'}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default HelperText;
