import * as React from 'react';
import { useCallback, useState } from 'react';
import ThemeProvider from '../../src/components/ThemeProvider';
import Box from '../../src/components/Box';
import {  Select } from 'react-native-hatred';
import { TouchableOpacity, Text } from 'react-native';

export default function App() {
  let [value, setValue] = useState('');
  const onChange = useCallback((value) => {
    console.log(value);

    setValue(value);
  }, []);

  console.log(value);

  // @ts-ignore
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
          multiple
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
          {/* @ts-ignore */}
          <Select.Placeholder>
            sss
          </Select.Placeholder>

          {/* @ts-ignore */}
          <Select.Header>
            {({ onDismiss }) => (
              <TouchableOpacity onPress={onDismiss}>
                <Text>Close</Text>
              </TouchableOpacity>
            )}
          </Select.Header>
        </Select>
      </Box>
    </ThemeProvider>
  );
}
