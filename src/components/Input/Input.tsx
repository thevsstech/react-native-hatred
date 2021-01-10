import React, { cloneElement, useCallback, useMemo, useState } from 'react';
import BaseTextInput, { BaseTextInputProps } from './BaseTextInput';
import { useTheme, VariantProps } from '@shopify/restyle';

import type { Theme } from '../../theme';
import usePlaceholder from '../../hooks/usePlaceholder';
import InputLabel from './InputLabel';
import InputHelperText from './InputHelperText';
type BaseProps = BaseTextInputProps & {
  children?: JSX.Element | JSX.Element[];
  error?: string;
};

export type TextInputProps = VariantProps<Theme, 'textInputVariants'> &
  BaseProps;

const Input = ({ children, ...rest }: TextInputProps) => {
  const theme = useTheme<Theme>();
  const [focused, setFocused] = useState(false);

  const onFocusCallback = useCallback(
    (e) => {
      if (rest.onFocus) {
        rest.onFocus(e);
      }

      setFocused(true);
    },
    [rest.onFocus]
  );

  const onBlurCallback = useCallback(
    (e) => {
      if (rest.onBlur) {
        rest.onBlur(e);
      }
      setFocused(false);
    },
    [rest.onBlur]
  );

  children = children || [];

  const passObject = useMemo(() => ({ focused, error: rest.error }), [
    focused,
    rest.error,
  ]);

  // fetch Input.Label from children
  const label = usePlaceholder(children, InputLabel, passObject);
  let helperText = usePlaceholder(children, InputHelperText, passObject);

  // now, if we have a helpertext we need to add error prop
  if (helperText && rest.error) {
    helperText = cloneElement(helperText, { error: !!rest.error });
  }
  return (
    <>
      {label}
      <BaseTextInput
        placeholderTextColor={theme.colors.placeholder}
        {...rest}
        onFocus={onFocusCallback}
        onBlur={onBlurCallback}
      />
      {helperText}
    </>
  );
};

Input.defaultProps = {
  variant: 'primary',
  children: [],
};

Input.Label = InputLabel;
Input.HelperText = InputHelperText;

export default Input;
