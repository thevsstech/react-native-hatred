import React from 'react';
import Text from './Typography/Text';
import { TextProps, useTheme } from '@shopify/restyle';
import type { Theme } from '../theme';
import Box from './Box';
import Icon from './Icon/Icon';
import { TouchableOpacity, ViewProps, ViewStyle } from 'react-native';
import HelperText from './HelperText';

type Props = ViewProps & {
  labelProps?: TextProps<Theme>;
  label?: string;
  activeColor?: string;
  deactiveColor?: string;
  onPress: () => void;
  checked: boolean;
  size?: number;
  error?: string;
  helperText?: string;
  activeIcon?: string;
};

const Radio = ({
  checked,
  activeColor,
  deactiveColor,
  onPress,
  size = 24,
  label,
  labelProps,
  activeIcon = 'check',
  helperText,
  error,
  ...rest
}: Props) => {
  const theme = useTheme<Theme>();

  if (!activeColor) {
    activeColor = theme.colors.primary;
  }

  if (!deactiveColor) {
    deactiveColor = theme.colors.white;
  }

  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 1,
    shadowColor: theme.colors.border,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: checked ? activeColor : deactiveColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.border,
  } as ViewStyle;

  return (
    <>
      <Box flexDirection={'row'} alignItems={'center'}>
        <TouchableOpacity
          {...rest}
          style={[style, rest.style]}
          onPress={onPress}
        >
          {checked ? <Icon name={activeIcon} color={'#fff'} size={11} /> : null}
        </TouchableOpacity>

        {label ? (
          <Text onPress={onPress} marginLeft={'xs'} {...labelProps}>
            {label}
          </Text>
        ) : null}
      </Box>

      <HelperText error={!!error} helperText={error || helperText} />
    </>
  );
};

Radio.defaultProps = {
  activeColor: '#343efd',
  deactiveColor: '#fff',
};

export default React.memo(Radio);
