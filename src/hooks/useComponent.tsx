import { ComponentType, useMemo } from 'react';
import findChildByComponent from '../utils/children';

export default function useComponent(
  children: JSX.Element | JSX.Element[],
  Component: ComponentType<any>
) {
  return useMemo(() => findChildByComponent(children, Component), [
    children,
    Component,
  ]);
}
