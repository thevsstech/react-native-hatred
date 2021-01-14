import type { TextProps } from '../Typography';
import React from 'react';
import Text from '../Typography/Text';
import type { ButtonTextCallbackParams } from './Button';

type Props = TextProps & {
  children: string | JSX.Element | ButtonTextCallbackParams;
};

/*
   Example usage formats

   // with a static string
   <Button.Text>
     put your static placeholder here
   </Button.Text>

   // a custom JSX element
    <Button.Text>
      <View>
          <Text>your label</Text>
      </>
    </Button.Text>


   // with a  function
   // note: an object that contains your selected values will be passed as
   // { selected: {label, value} }
   // also if you have enabled multiple options selected option will be an array

   <Button.Text>
    {({selected: {label}}) => <View>
        <Text>{label}
   </View> }
   </Button.Text>
  */
export default function ButtonText({ children, ...rest }: Props) {
  // if we have a string content, return a Placeholder

  if (typeof children === 'string') {
    return <Text {...rest}>{children}</Text>;
  }

  return children;
}

ButtonText.displayName = 'Button.Text';
