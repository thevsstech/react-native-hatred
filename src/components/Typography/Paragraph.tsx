import React from 'react';
import Text, { TextProps } from './Text';

const Paragraph = (props: TextProps) => {
  return <Text variant={'paragraph'}> {props.children}</Text>;
};

export default Paragraph;
