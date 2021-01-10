import React from 'react';
import Text, { TextProps } from './Text';

const Subtitle = (props: TextProps) => {
  return (
    <Text variant={'subtitle'} {...props}>
      {' '}
      {props.children}
    </Text>
  );
};

export default Subtitle;
