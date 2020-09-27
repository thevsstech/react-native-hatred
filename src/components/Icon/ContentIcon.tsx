import type { ThemeIconProps } from './Icon';
import React from 'react';
import Icon from './Icon';

type FunctionIcon = () => JSX.Element;
export type IconType = JSX.Element | FunctionIcon | ThemeIconProps;
type ContentIconProps = {
  children: IconType;
};

export default function ContentIcon({ children }: ContentIconProps) {
  if (React.isValidElement(children)) {
    return children;
  }

  if (
    typeof children === 'object' &&
    (children as ThemeIconProps).name !== 'undefined'
  ) {
    return <Icon {...(children as ThemeIconProps)} />;
  }

  if (typeof children === 'function') {
    return children();
  }

  return null;
}
