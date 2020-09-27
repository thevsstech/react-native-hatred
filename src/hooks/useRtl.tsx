import { useTheme } from '@shopify/restyle';
import type { Theme } from '../theme';

export default function useRtl<T extends any>(left: T, right: T) {
  let theme = useTheme<Theme>();

  return {
    left: theme.settings.isRtl ? right : left,
    right: theme.settings.isRtl ? left : right,
  };
}
