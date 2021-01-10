import React from 'react';
import type { TextProps } from './Typography/Text';
import Caption from './Typography/Caption';

export type HelperTextProps = TextProps & {
  error?: boolean;
  children?: JSX.Element | string;
};

const HelperText = ({ error, children, ...rest }: HelperTextProps) => {
  return (
    <Caption
      variant={'helperText'}
      alpha={0.87}
      color={error ? 'error' : 'text'}
      {...rest}
    >
      {children}
    </Caption>
  );
};

export default HelperText;
