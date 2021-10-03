import type { TextProps } from '../Typography';
import Placeholder from '../Typography/Placeholder';
import React from 'react';
import type { SelectItemType } from './Select';

// placeholder relevant types
export type SelectPlaceholderCallbackParams = {
  selected: SelectItemType | SelectItemType[];
  onPress?: () => void;
};

export type SelectPlaceholderCallback = (
  params: SelectPlaceholderCallbackParams
) => JSX.Element;

type Props = TextProps & {
  children: string | JSX.Element | SelectPlaceholderCallback;
};

/*
   Example usage formats

   // with a static string
   <Select.Placeholder>
     put your static placeholder here
   </Select.Placeholder>

   // a custom JSX element
    <Select.Placeholder>
      <View>
          <Text>your label</Text>
      </>
    </Select.Placeholder>


   // with a  function
   // note: an object that contains your selected values will be passed as
   // { selected: {label, value} }
   // also if you have enabled multiple options selected option will be an array

   <Select.Placeholder>
    {({selected: {label}}) => <View>
        <Text>{label}
   </View> }
   </Select.Placeholder>
  */
export default function SelectPlaceholder({ children, ...rest }: Props) {
  // if we have a string content, return a Placeholder

  if (typeof children === 'string') {
    return <Placeholder {...rest}>{children}</Placeholder>;
  }

  return children;
}

SelectPlaceholder.displayName = 'Select.Placeholder';
