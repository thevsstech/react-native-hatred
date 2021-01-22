import React, { ReactText } from 'react';
import {
  TouchableOpacity,
  View,
  ImageProps as NativeImageProps,
  ImageStyle,
  Image as NativeImage,
  NativeSyntheticEvent,
  ImageErrorEventData,
  ImageLoadEventData,
  StyleSheet,
  ViewStyle,
} from 'react-native';

const styles = {
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },
};

type RenderImageStatusType = 'loading' | 'error' | null;
export type ImageProps = NativeImageProps & {
  renderPlaceholder?: (
    width: ReactText,
    height: ReactText,
    status: RenderImageStatusType
  ) => JSX.Element;
  placeholder?: JSX.Element;
  onPress?: () => void;
};

const Image = ({
  renderPlaceholder,
  placeholder,
  onPress,
  style,
  onLoad,
  onError,
  ...rest
}: ImageProps) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const onLoadCallback = React.useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>) => {
      setLoading(false);

      if (onLoad) {
        onLoad(event);
      }
    },
    [onLoad]
  );
  const onErrorCallback = React.useCallback(
    (event: NativeSyntheticEvent<ImageErrorEventData>) => {
      setError(true);

      if (onError) {
        onError(event);
      }
    },
    [onError]
  );

  const TouchableComponent = (onPress
    ? TouchableOpacity
    : View) as React.ComponentType<
    | React.ComponentProps<typeof View>
    | React.ComponentProps<typeof TouchableOpacity>
  >;

  let width = (style as ImageStyle)?.width || 0;
  let height = (style as ImageStyle)?.height || 0;

  let status = loading ? 'loading' : error ? 'error' : null;

  const shouldHavePlaceholder = placeholder || renderPlaceholder;
  return (
    <TouchableComponent onPress={onPress}>
      {shouldHavePlaceholder && loading ? (
        <View style={styles.placeholderContainer as ViewStyle}>
          {placeholder ? placeholder : null}
          {renderPlaceholder
            ? renderPlaceholder(width, height, status as RenderImageStatusType)
            : null}
        </View>
      ) : null}
      <NativeImage
        {...rest}
        onLoad={shouldHavePlaceholder ? onLoadCallback : undefined}
        onError={shouldHavePlaceholder ? onErrorCallback : undefined}
      />
    </TouchableComponent>
  );
};

Image.defaultProps = {
  placeholderProps: {},
  placeholderImage: null,
};

export default React.memo(Image);
