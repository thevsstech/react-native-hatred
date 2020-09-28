import * as React from 'react';
import {
  FlatListProps as NativeFlatListProps,
  FlatList as BaseFlatList,
  View,
} from 'react-native';

const flex = { flex: 1 };

export type FlatListProps<T> = NativeFlatListProps<T> & {
  renderSkeleton?: (index?: number) => JSX.Element;
  fillSkeletonCount?: number;
  SkeletonComponent?: React.ComponentType<any>;
};

function FlatList<T>({
  renderSkeleton,
  SkeletonComponent,
  fillSkeletonCount = 6,
  ...rest
}: FlatListProps<T>) {
  const shouldRenderSkeleton =
    (renderSkeleton || SkeletonComponent) &&
    rest.data &&
    rest.data.length === 0 &&
    rest.refreshing;

  const renderItem = React.useCallback(
    (info) => {
      return info.item && info.item.skeleton ? (
        <View style={flex}>
          {/*
 // @ts-ignore */}
          {renderSkeleton ? renderSkeleton() : <SkeletonComponent />}
        </View>
      ) : rest.renderItem ? (
        rest.renderItem(info)
      ) : null;
    },
    [renderSkeleton, rest]
  );

  const data = React.useMemo<readonly T[]>(() => {
    return shouldRenderSkeleton
      ? ([...Array(fillSkeletonCount).keys()].map(() => ({
          skeleton: true,
        })) as any)
      : rest.data;
  }, [fillSkeletonCount, rest.data, shouldRenderSkeleton]);

  const keyExtractor = React.useCallback((_, index) => {
    return index.toString();
  }, []);

  return (
    <BaseFlatList
      {...rest}
      keyExtractor={shouldRenderSkeleton ? keyExtractor : rest.keyExtractor}
      data={data}
      renderItem={renderItem}
    />
  );
}

export default FlatList;
