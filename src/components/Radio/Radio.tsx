import React, { useMemo } from 'react';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import Icon from '../Icon/Icon';
import { TouchableOpacity, ViewProps, ViewStyle } from 'react-native';
import usePlaceholder from '../../hooks/usePlaceholder';
import RadioLabel from './RadioLabel';

type Props = ViewProps & {
  activeColor?: string;
  deactiveColor?: string;
  onPress: () => void;
  checked: boolean;
  size?: number;
  activeIcon?: string;
  children?: JSX.Element | JSX.Element[];
};

const Radio = ({
  checked,
  activeColor,
  deactiveColor,
  onPress,
  size = 24,
  activeIcon = 'check',
  children,
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

  const passObject = useMemo(
    () => ({
      checked,
    }),
    [checked]
  );

  let label = usePlaceholder(children || [], RadioLabel, passObject);

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

        {label}
      </Box>
    </>
  );
};

Radio.defaultProps = {
  activeColor: '#343efd',
  deactiveColor: '#fff',
};

export default React.memo(Radio);
