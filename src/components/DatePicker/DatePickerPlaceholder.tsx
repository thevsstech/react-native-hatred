import type { TextProps } from '../Typography';
import Placeholder from '../Typography/Placeholder';
import React from 'react';
import type { DatePickerPlaceholderCallbackParams } from './DatePicker';

type Props = TextProps & {
  children: string | JSX.Element | DatePickerPlaceholderCallbackParams;
};

/*
   Example usage formats

   // with a static string
   <Datepicker.Placeholder>
     put your static placeholder here
   </Datepicker.Placeholder>

   // a custom JSX element
    <Datepicker.Placeholder>
      <View>
          <Text>your label</Text>
      </>
    </Datepicker.Placeholder>


   // with a  function
   // note: an object that contains your Datepickered values will be passed as
   // { value, formatted }
   // also if you have enabled multiple options Datepickered option will be an array

   <Datepicker.Placeholder>
    {( {value, formatted} ) => <View>
        <Text>{formatted}</View> }
   </Datepicker.Placeholder>
  */
export default function DatePickerPlaceholder({ children, ...rest }: Props) {
  // if we have a string content, return a Placeholder

  if (typeof children === 'string') {
    return <Placeholder {...rest}>{children}</Placeholder>;
  }

  return children;
}

DatePickerPlaceholder.displayName = 'Datepicker.Placeholder';
