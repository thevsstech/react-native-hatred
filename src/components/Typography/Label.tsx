import React from 'react';
import Text, { TextProps } from './Text';

const Label = (props: TextProps) => {
  return <Text variant={'label'}> {props.children}</Text>;
};

export default Label;
