import React, { useMemo, ComponentType } from 'react';
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

    if (isFunction) {
      let response = component.props.children(passObject);

      if (typeof response === 'string') {
        return React.cloneElement(component, { children: response });
      } else {
        component = response;
      }
    }

    return component;
  }, [Component, children, passObject]);

  return placeholder;
}
