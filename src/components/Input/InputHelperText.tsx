import React from 'react';
import HelperText, { HelperTextProps } from '../HelperText';

interface InputLabelCallbackProps {
  focused?: boolean;
  error?: string;
}

type InputLabelCallback = (
  props: InputLabelCallbackProps
) => JSX.Element | string;

type Props = HelperTextProps & {
  children: string | JSX.Element | InputLabelCallback;
};

/*
   Example usage formats

   // with a static string
   <Input.HelperText>
     put your static helpertext here
   </Input.HelperText>

   // a custom JSX element
    <Input.HelperText>
      <View>
          <Text>your label</Text>
      </>
    </Input.HelperText>


   // with a  function
   // note: an object that contains your selected values will be passed as
   // {  focused: false, error: '' }
   // also if you have enabled multiple options selected option will be an array

   <Input.HelperText>
    {( {focused} ) => <View>
        <Text>{focused ? 'Test' : 'test'}
   </View> }
   </Input.HelperText>
  */
export default function InputHelperText({ children, ...rest }: Props) {
  // if we have a string content, return a Placeholder

  if (typeof children === 'string') {
    return (
      <HelperText marginTop={'xs'} {...rest}>
        {children}
      </HelperText>
    );
  }

  return children;
}

InputHelperText.displayName = 'Input.HelperText';
