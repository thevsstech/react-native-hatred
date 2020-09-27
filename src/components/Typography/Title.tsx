import React from 'react';
import Text, { TextProps } from './Text';

const Title = (props: TextProps) => {
  return <Text variant={'title'}> {props.children}</Text>;
};

export default Title;
