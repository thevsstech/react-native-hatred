import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  LayoutRectangle,
  Modal,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import type { Theme } from '../../theme';
import Card from '../Card/Card';
import BaseButton, { BaseButtonProps } from '../Button/BaseButton';
import usePlaceholder from '../../hooks/usePlaceholder';
import DropdownPlaceholder from './DropdownPlaceholder';
import DropdownItem from './DropdownItem';
import DropdownSelectedIcon from './DropdownSelectedIcon';
import useSelectedIcon from '../../hooks/useSelectedIcon';
import type { IconType } from '../Icon/ContentIcon';
import useLeftRight from '../../hooks/useLeftRight';
import ContentHeader from '../Content/ContentHeader';
import ContentFooter from '../Content/ContentFooter';
import ContentRight from '../Content/ContentRight';
import ContentLeft from '../Content/ContentLeft';
import useHeaderFooter from '../../hooks/useHeaderFooter';
import ContentEmpty from '../Content/ContentEmpty';

export type DropdownItemType = {
  label: string;
  value: number | string;
  leftIcon: IconType;
  rightIcon: IconType;
};

const styles = {
  modalBackgroundTouchableStyle: {
    flex: 1,
  },
};
// placeholder relevant types
export type DropdownPlaceholderCallbackParams = {
  selected: DropdownItemType;
};
export type DropDownPositionType = 'top' | 'bottom';
export type OnDropdownSelect = (item: DropdownItemType) => void;

export interface DropdownProps extends Omit<BaseButtonProps, 'onPress'> {
  items: DropdownItemType[];
  onSelect: OnDropdownSelect;
  value: string | number;
  backdropColor: keyof Theme['colors'];
  position?: DropDownPositionType;
  children: JSX.Element | JSX.Element[];
}

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  items: DropdownItemType[];
  backdropColor: keyof Theme['colors'];
  onSelect: OnDropdownSelect;
  anchorPosition: LayoutRectangle;
  position?: DropDownPositionType;
  Header?: JSX.Element;
  Footer?: JSX.Element;
  Empty?: JSX.Element;
  selectedIcon: JSX.Element | null;
  height: number;
};

const DropDownModal = ({
  visible,
  position,
  onDismiss,
  items,
  anchorPosition,
  selectedIcon,
  backdropColor,
  Header,
  Footer,
  Empty,
  onSelect,
  height = 200,
}: ModalProps) => {
  const keyExtractor = useCallback((item: DropdownItemType) => {
    return typeof item.value === 'number' ? item.value.toString() : item.value;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: DropdownItemType }) => {
      return (
        <DropdownItem
          item={item}
          onSelect={onSelect}
          selectedIcon={selectedIcon}
          width={anchorPosition.width}
        />
      );
    },
    [onSelect, anchorPosition.width, selectedIcon]
  );

  const viewStyle = useMemo<ViewStyle>(() => {
    let top = anchorPosition.y + anchorPosition.height;

    if (position === 'top' && anchorPosition.y > height) {
      top = top - height;
    }

    return {
      position: 'absolute',
      left: anchorPosition.x,
      top: top,
      zIndex: 9999,
      height,
    };
  }, [anchorPosition, position, height]);
  return (
    <Modal
      visible={visible}
      transparent
      onDismiss={onDismiss}
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback
        onPress={onDismiss}
        style={styles.modalBackgroundTouchableStyle}
      >
        <Card flex={1} backgroundColor={backdropColor}>
          <View style={viewStyle}>
            <FlatList<DropdownItemType>
              data={items}
              ListEmptyComponent={Empty}
              ListHeaderComponent={Header}
              ListFooterComponent={Footer}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </View>
        </Card>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Dropdown = ({
  items,
  backdropColor,
  onSelect,
  position,
  children,
  value,
  ...rest
}: DropdownProps) => {
  const ref = useRef(null);
  const [opened, setOpened] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onSelectCallback = useCallback<OnDropdownSelect>(
    (item) => {
      setOpened(false);
      onSelect(item);
    },
    [onSelect, setOpened]
  );

  useEffect(() => {
    if (ref.current !== null) {
      // @ts-ignore
      ref.current.measureInWindow((x, y, width, height) =>
        setAnchorPosition({ x, y, width, height })
      );
    }
  }, []);

  const hideModal = useCallback(() => setOpened(false), [setOpened]);
  const onPress = useCallback(() => {
    setOpened((prevState) => !prevState);
  }, []);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    let {
      nativeEvent: { layout },
    } = event;

    setAnchorPosition(layout);
  }, []);

  const { left, right } = useLeftRight(children, ContentLeft, ContentRight);
  const placeholder = usePlaceholder(children, DropdownPlaceholder, value);
  const { Header, Footer, Empty } = useHeaderFooter(
    children,
    ContentHeader,
    ContentFooter,
    ContentEmpty
  );
  const selectedIcon = useSelectedIcon<JSX.Element | null>(
    children,
    DropdownSelectedIcon
  );

  return (
    <>
      <BaseButton
        ref={ref}
        onLayout={onLayout}
        {...rest}
        leftIcon={left}
        rightIcon={right}
        onPress={onPress}
      >
        {placeholder}
      </BaseButton>

      <DropDownModal
        onSelect={onSelectCallback}
        visible={opened}
        anchorPosition={anchorPosition}
        position={position}
        Header={Header}
        Footer={Footer}
        Empty={Empty}
        backdropColor={backdropColor}
        selectedIcon={selectedIcon}
        items={items}
        height={200}
        onDismiss={hideModal}
      />
    </>
  );
};

Dropdown.defaultProps = {
  backdropColor: 'transparent',
  variant: 'dropdown',
};

Dropdown.Placeholder = DropdownPlaceholder;
Dropdown.Header = ContentHeader;
Dropdown.Footer = ContentFooter;
Dropdown.Right = ContentRight;
Dropdown.Left = ContentLeft;

export default Dropdown;
