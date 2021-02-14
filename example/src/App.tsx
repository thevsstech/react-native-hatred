import * as React from 'react';
import { useCallback, useState } from 'react';
import ThemeProvider from '../../src/components/ThemeProvider';
import Box from '../../src/components/Box';
import { Select } from 'react-native-hatred';

export default function App() {
  let [value, setValue] = useState('');
  const onChange = useCallback((value) => {
    console.log(value);

    setValue(value);
  }, []);

  console.log(value);

  return (
    <ThemeProvider
      theme={{
        textInputVariants: {
          primary: {
            height: 44,
            backgroundColor: 'white',
            borderRadius: 's',
          },
        },
      }}
      isRtl={false}
    >
      <Box flex={1} margin={'xxxl'}>
        <Select
          items={[
            {
              label: 'asdasd',
              value: 1,
            },
            {
              label: 'dddd',
              value: 2,
            },
          ]}
          renderItem={({ selected, item, index, onSelect, selectedIcon }) => (
            <Select.Item
              {...{ selectedIcon, selected, item, index, onSelect }}
              textProps={{
                color: 'error',
              }}
            />
          )}
          onSelect={onChange}
          value={value}
        >
          <Select.Placeholder>sdfsdf</Select.Placeholder>
        </Select>
      </Box>
    </ThemeProvider>
  );
}
