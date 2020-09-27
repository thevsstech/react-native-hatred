import React from 'react';
import Card, { CardProps } from './Card/Card';
import Image, { ImageProps } from './Image/Image';
import type { TextProps } from '@shopify/restyle';
import type { Theme } from '../theme';
import type { TextStyle } from 'react-native';
import Box from './Box';
import Title from './Typography/Title';
import Subtitle from './Typography/Subtitle';

type Props = CardProps & {
  title?: string;
  subtitle?: string;
  image: ImageProps;
  titleProps?: TextProps<Theme>;
  titleStyle?: TextStyle;
  subtitleProps?: TextProps<Theme>;
  subtitleStyle?: TextStyle;
  titlePosition?:
    | 'bottom'
    | 'top'
    | 'inside-center'
    | 'inside-top'
    | 'inside-bottom';
};

const Tile = ({
  title,
  subtitle,
  image,
  titlePosition = 'bottom',
  titleProps,
  titleStyle,
  subtitleProps,
  subtitleStyle,
  ...rest
}: Props) => {
  const titleContent = (
    <Box>
      <Title style={titleStyle} {...titleProps}>
        {title}
      </Title>
      <Subtitle style={subtitleStyle} {...subtitleProps}>
        {subtitle}
      </Subtitle>
    </Box>
  );

  return (
    <Card {...rest}>
      {titlePosition === 'top' ? titleContent : null}
      <Image {...image} />
      {titlePosition === 'bottom' ? titleContent : null}
    </Card>
  );
};

export default React.memo(Tile);
