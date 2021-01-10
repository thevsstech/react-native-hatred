import type { ComponentType } from 'react';

export default function findChildByComponent(
  children: JSX.Element | JSX.Element[],
  Component: ComponentType<any>
) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.find((item) => {
    if (!item) {
      return false;
    }

    if (typeof item.type === 'undefined') {
      return false;
    }

    return item.type === Component;
  });
}

export function findChildByDisplayName(
  children: JSX.Element | JSX.Element[],
  displayName: string
) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.find((item) => {
    if (!item) {
      return false;
    }

    if (typeof item.type === 'undefined') {
      return false;
    }

    return item.type.displayName === displayName;
  });
}
