import React from 'react';
import Text, { TextProps } from './Text';

const Label = ({ children, ...rest }: TextProps) => {
  return (
    <Text alpha={0.87} variant={'label'} {...rest}>
      {' '}
      {children}
    </Text>
  );
};

export default Label;
