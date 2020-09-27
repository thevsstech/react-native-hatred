import type { TextProps } from '../Typography';
import Placeholder from '../Typography/Placeholder';
import React from 'react';
import type { DropdownPlaceholderCallbackParams } from './Dropdown';

type Props = TextProps & {
  children: string | JSX.Element | DropdownPlaceholderCallbackParams;
};

/*
   Example usage formats

   // with a static string
   <Dropdown.Placeholder>
     put your static placeholder here
   </Dropdown.Placeholder>

   // a custom JSX element
    <Dropdown.Placeholder>
      <View>
          <Text>your label</Text>
      </>
    </Dropdown.Placeholder>


   // with a  function
   // note: an object that contains your selected values will be passed as
   // { selected: {label, value} }
   // also if you have enabled multiple options selected option will be an array

   <Dropdown.Placeholder>
    {({selected: {label}}) => <View>
        <Text>{label}
   </View> }
   </Dropdown.Placeholder>
  */
export default function DropdownPlaceholder({ children, ...rest }: Props) {
  // if we have a string content, return a Placeholder

  if (typeof children === 'string') {
    return <Placeholder {...rest}>{children}</Placeholder>;
  }

  return children;
}

DropdownPlaceholder.displayName = 'Dropdown.Placeholder';
