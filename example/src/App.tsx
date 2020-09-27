import * as React from 'react';
import ThemeProvider from '../../src/components/ThemeProvider';
import { useCallback } from 'react';
import Box from '../../src/components/Box';
import Select from '../../src/components/Select';
import type { SelectItemType } from '../../src/components';
import Icon from '../../src/components/Icon/Icon';

export default function App() {
  let items = [
    {
      label: 'test',
      value: 'Test',
      leftIcon: <Icon size={20} name={'check'} color={'text'} />,
    },
    {
      label: 'ss',
      value: 'aa',
      leftIcon: <Icon size={20} name={'account'} color={'text'} />,
    },
    { label: 'aa', value: 'dd' },
  ] as SelectItemType[];
  let value = 'Test';
  const onSelect = useCallback((value) => {
    console.log(value);
  }, []);
  return (
    <ThemeProvider isRtl={false}>
      <Box margin={'xxxl'}>
        <Select items={items} value={value} onSelect={onSelect}>
          <Select.Placeholder>Teest</Select.Placeholder>

          <Select.Right>
            <Icon size={24} name={'person'} color={'text'} />
          </Select.Right>
        </Select>
      </Box>
    </ThemeProvider>
  );
}
