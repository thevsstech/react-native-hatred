import React from 'react';
import Text, { TextProps } from './Text';

const Caption = (props: TextProps) => {
  return (
    <Text variant={'caption'} {...props}>
      {' '}
      {props.children}
    </Text>
  );
};

export default Caption;
