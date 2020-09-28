import React from 'react';
import Text, { TextProps } from './Text';

const Label = (props: TextProps) => {
  return (
    <Text alpha={0.87} variant={'label'}>
      {' '}
      {props.children}
    </Text>
  );
};

export default Label;
