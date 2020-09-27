import React, { ComponentType, useMemo } from 'react';
import findChildByComponent from '../utils/children';
import Icon from '../components/Icon/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function useSelectedIcon<T extends JSX.Element | null>(
  children: JSX.Element | JSX.Element[],
  Component: ComponentType<any>,
  useDefaultIcon: boolean = true
) {
  // @ts-ignore
  const selectedIcon = useMemo<T>(() => {
    let found = findChildByComponent(children, Component);

    if (!found && useDefaultIcon) {
      return (
        <Icon
          component={MaterialCommunityIcons}
          name={'check'}
          color={'text'}
          size={20}
        />
      );
    }

    return found as T;
  }, [children, Component, useDefaultIcon]);
  return selectedIcon;
}
