import { ComponentType, useMemo } from 'react';
import findChildByComponent from '../utils/children';

export default function useHeaderFooter(
  children: JSX.Element | JSX.Element[],
  HeaderComponent: ComponentType<any>,
  FooterComponent: ComponentType<any>,
  EmptyComponent?: ComponentType<any>
) {
  const response = useMemo(
    () => ({
      Header: findChildByComponent(children, HeaderComponent),
      Footer: findChildByComponent(children, FooterComponent),
      Empty: EmptyComponent
        ? findChildByComponent(children, EmptyComponent)
        : undefined,
    }),
    [children, HeaderComponent, FooterComponent]
  );

  return response;
}
