import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, Modal } from 'react-native';
import BaseButton, { BaseButtonProps } from '../Button/BaseButton';
import moment from 'moment';
import DateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import Box from '../Box';
import Button from '../Button/Button';
import usePlaceholder from '../../hooks/usePlaceholder';
import DatePickerPlaceholder from './DatePickerPlaceholder';
import useHeaderFooter from '../../hooks/useHeaderFooter';
import ContentHeader from '../Content/ContentHeader';
import ContentFooter from '../Content/ContentFooter';
import ContentRight from '../Content/ContentRight';
import ContentLeft from '../Content/ContentLeft';
import useLeftRight from '../../hooks/useLeftRight';

type Props = BaseButtonProps & {
  value: Date;
  dateFormat?: string;
  confirmText?: string;
  cancelText?: string;
  pickerProps?: Omit<IOSNativeProps & AndroidNativeProps, 'value'>;
  onChange: (date: Date | null, formattedDate: string) => void;
  children: JSX.Element | JSX.Element[];
};

type ModalProps = {
  value?: Date;
  confirmText?: string;
  cancelText?: string;
  pickerProps?: Omit<IOSNativeProps & AndroidNativeProps, 'value'>;
  visible: boolean;
  toggleVisible: () => void;
  Header?: JSX.Element;
  Footer?: JSX.Element;
  onChangeCallback: (event: Record<string, any>, selectedData: Date) => void;
};

const DatePickerModal = ({
  visible,
  confirmText,
  cancelText,
  toggleVisible,
  pickerProps,
  value,
  Header,
  Footer,
  onChangeCallback,
}: ModalProps) => {
  const oldValue = new Date();

  return (
    <Modal
      visible={visible}
      onDismiss={toggleVisible}
      onRequestClose={toggleVisible}
      transparent
      animationType={'fade'}
    >
      <Box
        flex={1}
        backgroundColor={'backdrop'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box minWidth={'80%'} backgroundColor={'surface'} padding={'l'}>
          {Header}
          <DateTimePicker
            testID="dateTimePicker"
            display="default"
            is24Hour
            {...pickerProps}
            value={value}
            onChange={onChangeCallback}
          />
          {Footer}
          <Box
            alignItems={'center'}
            justifyContent={'flex-end'}
            flexDirection={'row'}
          >
            <Button
              onPress={() => {
                onChangeCallback({}, oldValue);
                toggleVisible();
              }}
              variant={'text'}
            >
              <Button.Text>{cancelText || 'Cancel'}</Button.Text>
            </Button>

            <Button onPress={toggleVisible} variant={'text'}>
              <Button.Text>{confirmText || 'Confirm'}</Button.Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const DatePicker = ({
  variant,
  value,
  dateFormat,
  onChange,
  cancelText,
  confirmText,
  children,
  ...rest
}: Props) => {
  const [date, setDate] = useState(value || new Date());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (value !== date) {
      setDate(value);
    }
  }, [value, date, setDate]);

  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, [setVisible]);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const onChangeCallback = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || value;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        setVisible(false);
      }

      setTimeout(() => {
        if (event.type === 'neutralButtonPressed') {
          onChange(null, '');
        } else {
          onChange(currentDate, moment(currentDate).format(dateFormat));
        }
      }, 100);
    },
    [value, onChange, dateFormat]
  );

  const pickerProps = {};
  let passObject = useMemo(() => {
    return { value, formatted: moment(value).format(dateFormat) };
  }, [value, dateFormat]);
  const placeholder = usePlaceholder(
    children,
    DatePickerPlaceholder,
    passObject
  );

  const { left, right } = useLeftRight(children);

  const { Header, Footer } = useHeaderFooter(
    children,
    ContentHeader as any,
    ContentFooter as any
  );
  return (
    <>
      <BaseButton
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        {...rest}
        onPress={toggleVisible}
        leftIcon={left}
        rightIcon={right}
        variant={variant}
      >
        {placeholder}
      </BaseButton>

      {visible && Platform.OS === 'android' ? (
        <DateTimePicker
          testID="dateTimePicker"
          display="default"
          is24Hour
          {...pickerProps}
          value={date}
          onChange={onChangeCallback}
        />
      ) : null}

      {visible && Platform.OS === 'ios' ? (
        <DatePickerModal
          visible={visible}
          value={value}
          cancelText={cancelText}
          Header={Header}
          Footer={Footer}
          confirmText={confirmText}
          toggleVisible={closeModal}
          onChangeCallback={onChangeCallback}
          pickerProps={pickerProps}
        />
      ) : null}
    </>
  );
};

DatePicker.Placeholder = DatePickerPlaceholder;
DatePicker.Right = ContentRight;
DatePicker.Left = ContentLeft;

DatePicker.defaultProps = {
  dateFormat: 'DD/MM/YYYY',
  variant: 'datepicker',
  cancelText: 'İptal',
  confirmText: 'Kaydet',
  pickerProps: {
    mode: 'date',
    is24Hour: true,
  },
};

export default DatePicker;
