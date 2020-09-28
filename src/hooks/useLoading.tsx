import ContentLoading from '../components/Content/ContentLoading';
import React, { useMemo } from 'react';
import findChildByComponent from '../utils/children';
import { ActivityIndicator } from 'react-native';

export default function useLoading(
  children: JSX.Element | JSX.Element[],
  Component = ContentLoading
) {
  let loading = useMemo(() => {
    let ld = findChildByComponent(children, Component);

    if (!ld) {
      return <ActivityIndicator />;
    }

    return ld;
  }, [children, Component]);

  return loading;
}
