import React, { useCallback, useRef, useState } from 'react';
import type { Theme } from '../../theme';
import BaseButton, { BaseButtonProps } from '../Button/BaseButton';
import usePlaceholder from '../../hooks/usePlaceholder';
import DropdownPlaceholder from './DropdownPlaceholder';
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
import DropDownModal from './DropdownModal';
import { InteractionManager } from 'react-native';

export type DropdownItemType = {
  label: string;
  value: number | string;
  leftIcon?: IconType;
  rightIcon?: IconType;
};

export type DropDownPositionType = 'top' | 'bottom';
export type OnDropdownSelect = (item: DropdownItemType) => void;
const initialState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
export interface DropdownProps extends BaseButtonProps {
  items: DropdownItemType[];
  onSelect: OnDropdownSelect;
  value: string | number;
  backdropColor: keyof Theme['colors'];
  position?: DropDownPositionType;
  children: JSX.Element | JSX.Element[];
}

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
  const [anchorPosition, setAnchorPosition] = useState(initialState);

  const onSelectCallback = useCallback<OnDropdownSelect>(
    (item) => {
      setOpened(false);
      onSelect(item);
    },
    [onSelect, setOpened]
  );

  const hideModal = useCallback(() => setOpened(false), [setOpened]);
  const onPress = useCallback(() => {
    if (!opened) {
      InteractionManager.runAfterInteractions(() => {
        if (ref.current !== null && ref.current) {
          // @ts-ignore
          ref.current.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              setAnchorPosition({ x, y, width, height });
            }
          );
        }
      });
    }

    setOpened((prevState) => !prevState);
  }, [opened]);

  const { left, right } = useLeftRight(children, ContentLeft, ContentRight);
  const placeholder = usePlaceholder(children, DropdownPlaceholder, value);
  const { Header, Footer, Empty } = useHeaderFooter(
    children,
    ContentHeader as any,
    ContentFooter as any,
    ContentEmpty as any
  );
  const selectedIcon = useSelectedIcon<JSX.Element | null>(
    children,
    DropdownSelectedIcon
  );

  return (
    <>
      <BaseButton
        ref={ref}
        width={'100%'}
        {...rest}
        leftIcon={left}
        rightIcon={right}
        onPress={onPress}
      >
        {placeholder}
      </BaseButton>

      {anchorPosition === initialState ? null : (
        <DropDownModal
          onSelect={onSelectCallback}
          visible={opened}
          anchorPosition={anchorPosition}
          position={position}
          Header={Header}
          Footer={Footer}
          Empty={Empty}
          value={value}
          backdropColor={backdropColor}
          selectedIcon={selectedIcon}
          items={items}
          height={200}
          onDismiss={hideModal}
        />
      )}
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
