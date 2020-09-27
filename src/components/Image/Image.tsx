import React, { ReactText } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageProps as NativeImageProps,
  ImageStyle,
  NativeSyntheticEvent,
  ImageErrorEventData,
  ImageLoadEventData,
} from 'react-native';

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

  return (
    <TouchableComponent onPress={onPress}>
      {(placeholder || renderPlaceholder) && loading ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
          }}
        >
          {placeholder ? placeholder : null}
          {renderPlaceholder
            ? renderPlaceholder(width, height, status as RenderImageStatusType)
            : null}
        </View>
      ) : null}
      <Image {...rest} onLoad={onLoadCallback} onError={onErrorCallback} />
    </TouchableComponent>
  );
};

Image.defaultProps = {
  placeholderProps: {},
  placeholderImage: null,
};

export default React.memo(Image);
