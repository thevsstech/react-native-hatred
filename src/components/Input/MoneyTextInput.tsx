import React, { useMemo } from 'react';
import Input, { TextInputProps } from './TextInput';
import TextInputMask from 'react-native-masked-input';

type Props = TextInputProps & {
  precision?: number;
  separator?: string;
  delimiter?: string;
  unit?: string;
  suffixUnit?: string;
};

const MoneyTextInput = ({
  precision = 2,
  separator = ',',
  delimiter = '.',
  unit = '$',
  suffixUnit = '',
  ...rest
}: Props) => {
  const options = useMemo(
    () => ({
      precision,
      separator,
      delimiter,
      unit,
      suffixUnit,
    }),
    [precision, separator, delimiter, unit, suffixUnit]
  );

  return (
    <Input
      {...rest}
      renderInput={(props) => {
        return (
          <TextInputMask
            enablesReturnKeyAutomatically
            returnKeyType={'done'}
            type={'money'}
            options={options}
            {...props}
          />
        );
      }}
    />
  );
};

export default MoneyTextInput;
