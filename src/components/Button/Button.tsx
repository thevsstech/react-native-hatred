import React from 'react';
import BaseButton, { BaseButtonProps } from './BaseButton';
import usePlaceholder from '../../hooks/usePlaceholder';
import ButtonText from './ButtonText';
import useLeftRight from '../../hooks/useLeftRight';
import ContentLeft from '../Content/ContentLeft';
import ContentRight from '../Content/ContentRight';
import useLoading from '../../hooks/useLoading';
import ContentLoading from '../Content/ContentLoading';
export type ButtonTextCallbackParams = {};
export type ButtonProps = BaseButtonProps & {
  onPress: () => void;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
  loading?: boolean;
};

/**
 * You can customize your button with variants or directly from props
 * example usage
 * <Button>
 *
 *  <Button.Text>
 *    Test
 *  </Button.Text>
 *
 * </Button>
 *
 *
 * @param onPress
 * @param children
 * @param disabled
 * @param rest
 * @constructor
 */
const Button = ({ onPress, children, disabled, ...rest }: ButtonProps) => {
  let text = usePlaceholder(children, ButtonText, {});
  const loading = useLoading(children);
  const { left, right } = useLeftRight(
    children,
    ContentLeft,
    ContentRight,
    undefined,
    loading
  );

  return (
    <BaseButton
      alignItems={'center'}
      flexDirection={'row'}
      {...rest}
      opacity={
        disabled || rest.loading ? (rest.opacity as number) - 0.2 : rest.opacity
      }
      onPress={(disabled || rest.loading ? null : onPress) as any}
      rightIcon={right}
      leftIcon={left}
    >
      {text}
    </BaseButton>
  );
};

Button.defaultProps = ({
  variant: 'primary',
  opacity: 1,
  disabled: false,
  loading: false,
} as unknown) as ButtonProps;

Button.Text = ButtonText;
Button.Right = ContentRight;
Button.Left = ContentLeft;
Button.Loading = ContentLoading;

export default Button;
