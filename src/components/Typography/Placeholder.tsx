import React from 'react';
import Text, { TextProps } from './Text';

const Placeholder = (props: TextProps) => {
  return (
    <Text variant={'placeholder'} {...props}>
      {' '}
      {props.children}
    </Text>
  );
};

export default Placeholder;
