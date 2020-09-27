import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  TouchableOpacity,
} from 'react-native';
import { TextProps, useTheme } from '@shopify/restyle';
import Text from '../Typography/Text';
import BaseGradient, { BaseGradientProps } from './BaseGradient';
import type { BaseButtonProps } from '../Button/BaseButton';
import Icon, { ThemeIconProps } from '../ThemeIcon';
import { Theme } from '../../theme';
import Box from '../Box';

type Props = BaseGradientProps & {
  children: string | JSX.Element;
  containerProps?: BaseButtonProps;
  loading?: boolean;
  disabled?: boolean;
  loadingProps?: ActivityIndicatorProps;
  leftIcon?: ThemeIconProps;
  rightIcon?: ThemeIconProps;
  textProps?: TextProps<Theme>;
  onPress: () => void;
};
const styles = {
  flex: { flex: 1 },
};

const GradientButton = ({
  textProps,
  leftIcon,
  rightIcon,
  disabled,
  loading,
  children,
  variant,
  containerProps,
  onPress,
  loadingProps,
  ...rest
}: Props) => {
  const theme = useTheme<Theme>();

  if (variant && theme.gradientVariants && theme.gradientVariants[variant]) {
    const grandientVariant = theme.gradientVariants[variant];

    if (grandientVariant.textProps && !textProps) {
      textProps = grandientVariant.textProps;
    }
  }

  return (
    <BaseGradient
      {...rest}
      variant={variant}
      overflow={'hidden'}
      opacity={disabled ? (rest.opacity as number) - 0.2 : rest.opacity}
    >
      <TouchableOpacity onPress={onPress} style={styles.flex}>
        <Box
          flex={1}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          {...containerProps}
        >
          {leftIcon ? <Icon {...leftIcon} /> : null}
          {typeof children === 'string' ? (
            <Text marginHorizontal={'s'} textAlign={'center'} {...textProps}>
              {children}
            </Text>
          ) : (
            children
          )}
          {loading ? (
            <ActivityIndicator color={'#fff'} {...loadingProps} />
          ) : null}
          {rightIcon ? <Icon {...rightIcon} /> : null}
        </Box>
      </TouchableOpacity>
    </BaseGradient>
  );
};

GradientButton.defaultProps = {
  variant: 'primary',
  opacity: 1,
};

export default React.memo(GradientButton);
