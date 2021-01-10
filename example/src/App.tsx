import * as React from 'react';
import { useCallback, useState } from 'react';
import ThemeProvider from '../../src/components/ThemeProvider';
import Box from '../../src/components/Box';
import Dropdown from '../../src/components/Dropdown/Dropdown';

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
      <Box flex={1} margin={'xxxl'} justifyContent={'flex-end'}>
        <Dropdown
          items={[
            {
              label: 'asdasd',
              value: 1,
            },
          ]}
          onSelect={onChange}
          value={value}
        >
          <Dropdown.Placeholder>asdasd</Dropdown.Placeholder>
        </Dropdown>
      </Box>
    </ThemeProvider>
  );
}
