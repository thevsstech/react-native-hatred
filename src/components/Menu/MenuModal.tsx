import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import MenuItem from './MenuItem';
import type { MenuOption } from './Menu';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type Props = {
  items: MenuOption[];
  visible: boolean;
  onDismiss: () => void;
  anchorPosition: { x: number; y: number; width: number };
};

const MenuModal = ({ visible, onDismiss, items, anchorPosition }: Props) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      duration: 150,
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [visible, animation]);
  const keyExtractor = useCallback((_, index) => {
    return index.toString();
  }, []);

  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });
  const { width, height } = layout;
  const renderItem = useCallback(({ item }: { item: MenuOption }) => {
    return <MenuItem {...item} />;
  }, []);
  const options = useMemo(() => {
    return items.map((item: MenuOption) => ({
      ...item,
      onPress: () => {
        onDismiss();
        if (item.onPress) {
          item.onPress();
        }
      },
    }));
  }, [onDismiss, items]);

  const viewStyle = useMemo<ViewStyle | any>(() => {
    let top = anchorPosition.y;

    let left = anchorPosition.x - (width - anchorPosition.width);
    if (left + width > screenWidth) {
      left = anchorPosition.x - (width - anchorPosition.width);
    }
    if (top + height > screenHeight) {
      top = anchorPosition.y - height;
    }

    return {
      position: 'absolute',
      left,
      top: top,
      opacity: width && width > anchorPosition.width ? animation : 0,
      zIndex: 9999,
      height: items.length * 50,
      overflow: 'hidden',
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: '#fff',
      elevation: 5,
      transform: [
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [left, 0],
          }),
        },
        {
          scaleX: animation,
        },
        {
          scaleY: animation,
        },
      ],
    };
  }, [
    anchorPosition.y,
    anchorPosition.x,
    anchorPosition.width,
    width,
    height,
    animation,
    items.length,
  ]);
  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width, height },
      },
    }) => {
      setLayout({ width, height });
    },
    []
  );

  return (
    <Modal
      visible={visible}
      transparent
      onDismiss={onDismiss}
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>
      <Animated.View
        onLayout={onLayout}
        pointerEvents={'box-none'}
        style={viewStyle}
      >
        <FlatList<MenuOption>
          data={options}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Animated.View>
    </Modal>
  );
};

export default MenuModal;
