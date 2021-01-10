import React, { useCallback, useRef, useState } from 'react';
import {
  InteractionManager,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import MenuModal from './MenuModal';
import ContentHeader from '../Content/ContentHeader';
import ContentFooter from '../Content/ContentFooter';
import MenuAnchor from './MenuAnchor';

const styles = {
  modalBackgroundTouchableStyle: {
    flex: 1,
  },

  button: {
    zIndex: 99999,
  },
};

export type MenuOption = {
  label: string | JSX.Element;
  onPress: () => void;
  style?: {
    container?: ViewStyle;
    label?: TextStyle;
  };
};

type Props = {
  options: MenuOption[];
  children: JSX.Element;
};

const hitSlop = {
  left: 10,
  right: 10,
  bottom: 10,
  top: 10,
};

const Menu = ({ children, options }: Props) => {
  const [opened, setOpened] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const ref = useRef<TouchableOpacity>(null);
  const hideModal = useCallback(() => setOpened(false), [setOpened]);
  const openModal = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      if (ref.current) {
        ref.current.measureInWindow((x, y, width, height) => {
          setAnchorPosition({ x, y, width, height });
          setOpened(true);
        });
      }
    });
  }, [setOpened, ref]);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        hitSlop={hitSlop}
        onPress={openModal}
        ref={ref}
      >
        {children}
      </TouchableOpacity>

      {opened ? (
        <MenuModal
          onDismiss={hideModal}
          anchorPosition={anchorPosition}
          items={options}
          visible={opened}
        />
      ) : null}
    </>
  );
};

Menu.Header = ContentHeader;
Menu.Footer = ContentFooter;
Menu.Anchor = MenuAnchor;

export default React.memo(Menu);
