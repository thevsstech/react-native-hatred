import React, { useCallback, useState } from 'react';
import BaseTextInput, { BaseTextInputProps } from './BaseTextInput';
import {
  createRestyleComponent,
  createVariant,
  useTheme,
  VariantProps,
} from '@shopify/restyle';

import Box from '../Box';
import Icon, { ThemeIconProps } from '../Icon/Icon';
import type { Theme } from '../../theme';
import type {
  TextStyle,
  ViewStyle,
  TextInputProps as NativeTextInputProps,
} from 'react-native';
import useVariant from '../hooks/useVariant';
import Label from '../Typography/Label';
import HelperText from '../HelperText';
import type { TextProps } from '../Typography/Text';
export type InputBoxProps = VariantProps<Theme, 'textInputVariants'> &
  React.ComponentProps<typeof Box>;

type BaseProps = BaseTextInputProps & {
  label?: string;
  labelProps?: TextProps;
  leftIcon?: ThemeIconProps;
  rightIcon?: ThemeIconProps;
  error?: string;
  errorStyle?: TextStyle;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  containerProps?: InputBoxProps;
  helperTextProps: TextProps;
  helperTextStyle: TextStyle;
  rightButton?: JSX.Element;
  helperText?: string;

  renderInput?: (props: NativeTextInputProps) => JSX.Element;
};

export type TextInputProps = BaseTextInputProps &
  VariantProps<Theme, 'textInputVariants'> &
  BaseProps;

const variant = createVariant({ themeKey: 'textInputVariants' });
export const InputBox = createRestyleComponent<InputBoxProps, Theme>(
  [variant],
  Box
);

const TextInput = ({
  label,
  leftIcon,
  rightIcon,
  error,
  containerStyle,
  errorStyle,
  labelStyle,
  rightButton,
  renderInput,
  helperText,
  helperTextStyle,
  helperTextProps,
  ...rest
}: TextInputProps) => {
  const theme = useTheme<Theme>();
  const [focused, setFocused] = useState(false);

  const { containerProps, labelProps, ...inputProps } = useVariant({
    variantType: 'textInputVariants',
    variant: rest.variant,
    props: rest,
    subProps: ['containerProps', 'labelProps', 'rootProps'],
    states: { onFocused: focused, onError: !!error },
  });

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

  return (
    <>
      {label ? (
        <Label style={labelStyle} {...labelProps}>
          {label}
        </Label>
      ) : null}
      <InputBox
        alignItems={'center'}
        flexDirection={'row'}
        style={containerStyle}
        {...containerProps}
      >
        {leftIcon ? <Icon {...leftIcon} /> : null}
        <BaseTextInput
          placeholderTextColor={theme.colors.placeholder}
          flex={1}
          marginHorizontal={'xs'}
          renderInput={renderInput}
          {...inputProps}
          onFocus={onFocusCallback}
          onBlur={onBlurCallback}
        />
        {rightButton || null}
        {rightIcon ? <Icon {...rightIcon} /> : null}
      </InputBox>
      {helperText || error ? (
        <HelperText
          {...helperTextProps}
          style={errorStyle || helperTextStyle}
          error={!!error}
        >
          {helperText || error}
        </HelperText>
      ) : null}
    </>
  );
};

TextInput.defaultProps = {
  variant: 'primary',
};

export default TextInput;
