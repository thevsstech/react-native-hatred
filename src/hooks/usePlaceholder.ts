import { useMemo, ComponentType } from 'react';
import findChildByComponent from '../utils/children';

export default function usePlaceholder(
  children: JSX.Element | JSX.Element[],
  Component: ComponentType<any>,
  passObject: any
) {
  const placeholder = useMemo(() => {
    let component = findChildByComponent(children, Component);

    if (!component) {
      return null;
    }

    let isFunction = typeof component.props?.children === 'function';

    return isFunction ? component.props.children(passObject) : component;
  }, [children, passObject]);

  return placeholder;
}
