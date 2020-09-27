import React from 'react';
import Text, { TextProps } from './Text';

const Headline = (props: TextProps) => {
  return <Text variant={'headline'}> {props.children}</Text>;
};

export default Headline;
