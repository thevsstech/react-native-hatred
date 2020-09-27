import React from 'react';
import type { BoxProps } from '@shopify/restyle';
import type { Theme } from '../theme';
import Box from './Box';

type Props = BoxProps<Theme>;

const Divider = ({ ...rest }: Props) => {
  return <Box backgroundColor={'text'} height={1} width={'100%'} {...rest} />;
};

export default Divider;
