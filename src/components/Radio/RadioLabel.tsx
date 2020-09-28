import type { TextProps } from '../Typography';
import React from 'react';
import Label from '../Typography/Label';

interface RadioLabelCallbackProps {
  checked: boolean;
}

type RadioLabelCallback = (
  props: RadioLabelCallbackProps
) => JSX.Element | string;

type Props = TextProps & {
  children: string | JSX.Element | RadioLabelCallback;
};

/*
   Example usage formats

   // with a static string
   <Radio.Label>
     put your static placeholder here
   </Radio.Label>

   // a custom JSX element
    <Radio.Label>
      <View>
          <Text>your label</Text>
      </>
    </Radio.Label>


   // with a  function
   // note: an object that contains your selected values will be passed as
   // {  checked: false, error: '' }
   // also if you have enabled multiple options selected option will be an array

   <Radio.Label>
    {( {checked} ) => <View>
        <Text>{checked ? 'Test' : 'test'}
   </View> }
   </Radio.Label>
  */
export default function RadioLabel({ children, ...rest }: Props) {
  // if we have a string content, return a Placeholder

  if (typeof children === 'string') {
    return (
      <Label marginLeft={'xs'} {...rest}>
        {children}
      </Label>
    );
  }

  return children;
}

RadioLabel.displayName = 'Radio.Label';
