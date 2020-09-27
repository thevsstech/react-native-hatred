import { useTheme } from '@shopify/restyle';
import type { Theme } from '../theme';
import { useMemo } from 'react';
import findChildByComponent from '../utils/children';
import { LeftIcon, RightIcon } from '../components/Icon/Icon';

export default function useIcons(children: JSX.Element | JSX.Element[]) {
  let theme = useTheme<Theme>();

  let icons = useMemo<{
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
  }>(() => {
    let isRtl = theme.settings.isRtl;

    const leftIcon = findChildByComponent(children, LeftIcon);
    const rightIcon = findChildByComponent(children, RightIcon);

    return {
      leftIcon: isRtl ? rightIcon : leftIcon,
      rightIcon: isRtl ? leftIcon : rightIcon,
    };
  }, [children, theme.settings.isRtl]);

  return icons;
}
