import { useTheme } from '@shopify/restyle';
import type { Theme } from '../theme';
import { useMemo, ComponentType } from 'react';
import findChildByComponent from '../utils/children';
import ContentLeft from '../components/Content/Left';
import ContentRight from '../components/Content/Right';

export default function useLeftRight(
  children: JSX.Element | JSX.Element[],
  LeftComponent: ComponentType<any>,
  RightComponent: ComponentType<any>
) {
  let theme = useTheme<Theme>();

  let content = useMemo<{
    left?: JSX.Element;
    right?: JSX.Element;
  }>(() => {
    let isRtl = theme.settings.isRtl;

    const left = findChildByComponent(children, ContentLeft);
    const right = findChildByComponent(children, ContentRight);

    return {
      left: isRtl ? right : left,
      right: isRtl ? left : right,
    };
  }, [children, theme.settings.isRtl, LeftComponent, RightComponent]);

  return content;
}
