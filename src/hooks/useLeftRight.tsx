import { useTheme } from '@shopify/restyle';
import type { Theme } from '../theme';
import { useMemo, ComponentType } from 'react';
import findChildByComponent from '../utils/children';
import ContentLeft from '../components/Content/ContentLeft';
import ContentRight from '../components/Content/ContentRight';

export default function useLeftRight(
  children: JSX.Element | JSX.Element[],
  LeftComponent: ComponentType<any> = ContentLeft,
  RightComponent: ComponentType<any> = ContentRight,
  leftDefault?: JSX.Element,
  rightDefault?: JSX.Element
) {
  let theme = useTheme<Theme>();

  let content = useMemo<{
    left?: JSX.Element;
    right?: JSX.Element;
  }>(() => {
    let isRtl = theme.settings.isRtl;

    const left = findChildByComponent(children, LeftComponent) || leftDefault;
    const right =
      findChildByComponent(children, RightComponent) || rightDefault;

    return {
      left: isRtl ? right : left,
      right: isRtl ? left : right,
    };
  }, [
    children,
    theme.settings.isRtl,
    LeftComponent,
    RightComponent,
    leftDefault,
    rightDefault,
  ]);

  return content;
}
