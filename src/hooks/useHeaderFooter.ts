import { ComponentType, useMemo } from 'react';
import findChildByComponent, { FindChildResponse } from '../utils/children';
import type { ContentHeaderCallbackParams } from '../components/Content/ContentHeader';

type Child = {
  Header: FindChildResponse;
  Footer: FindChildResponse;
  Empty: FindChildResponse;
};

export default function useHeaderFooter(
  children: JSX.Element | JSX.Element[],
  HeaderComponent: ComponentType<any>,
  FooterComponent: ComponentType<any>,
  EmptyComponent?: ComponentType<any>,
  params?: ContentHeaderCallbackParams
) {
  let response = useMemo<Child>(
    () => ({
      Header: findChildByComponent(children, HeaderComponent),
      Footer: findChildByComponent(children, FooterComponent),
      Empty: EmptyComponent
        ? findChildByComponent(children, EmptyComponent)
        : undefined,
    }),
    [children, HeaderComponent, FooterComponent, EmptyComponent]
  );

  Object.keys(response).forEach((key) => {
    // @ts-ignore
    const component = response[key as any];

    if (component) {
      let isFunction = typeof component.props?.children === 'function';

      if (isFunction) {
        // @ts-ignore
        response[key as any] = component.props?.children(params);
      }
    }
  });

  return response;
}
