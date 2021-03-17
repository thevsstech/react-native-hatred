import type { ComponentType } from 'react';
import type React from 'react';

export type FindChildResponse = React.ReactElement | undefined;

export default function findChildByComponent(
  children: React.ReactElement | React.ReactElement[],
  Component: ComponentType<any>
): FindChildResponse {
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
