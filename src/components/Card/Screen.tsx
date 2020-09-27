import React from 'react';
import Card, { CardProps } from './Card';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 *  the screen wrapper component which uses SafeAreView from react-native-safe-area-context
 *  all box props are available on this
 *  it's also uses screen card variant
 *
 *
 * @param props
 * @constructor
 */
const Screen = (props: CardProps) => {
  return (
    <SafeAreaView>
      <Card variant={'screen'} {...props}>
        {props.children}
      </Card>
    </SafeAreaView>
  );
};

export default Screen;
