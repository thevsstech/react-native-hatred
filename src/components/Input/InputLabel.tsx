import type { TextProps } from '../Typography';
import React from 'react';
import Label from '../Typography/Label';

interface InputLabelCallbackProps {
  focused?: boolean;
  error?: string;
}

type InputLabelCallback = (
  props: InputLabelCallbackProps
) => JSX.Element | string;

type Props = TextProps & {
  children: string | JSX.Element | InputLabelCallback;
};

/*
   Example usage formats

   // with a static string
   <Input.Label>
     put your static placeholder here
   </Input.Label>

   // a custom JSX element
    <Input.Label>
      <View>
          <Text>your label</Text>
      </>
    </Input.Label>


   // with a  function
   // note: an object that contains your selected values will be passed as
   // {  focused: false, error: '' }
   // also if you have enabled multiple options selected option will be an array

   <Input.Label>
    {( {focused} ) => <View>
        <Text>{focused ? 'Test' : 'test'}
   </View> }
   </Input.Label>
  */
export default function InputLabel({ children, ...rest }: Props) {
  // if we have a string content, return a Placeholder

  if (typeof children === 'string') {
    return <Label {...rest}>{children}</Label>;
  }

  return children;
}

InputLabel.displayName = 'Input.Label';
