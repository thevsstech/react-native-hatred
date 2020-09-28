import * as React from 'react';
import ThemeProvider from '../../src/components/ThemeProvider';
import { useCallback, useState } from 'react';
import Box from '../../src/components/Box';

import Input from '../../src/components/Input/Input';

export default function App() {
  let [value, setValue] = useState('');
  const onChange = useCallback((value) => {
    setValue(value);
  }, []);
  return (
    <ThemeProvider isRtl={false}>
      <Box margin={'xxxl'}>
        <Input error={'Test'} onChangeText={onChange} value={value}>
          <Input.Label>Test</Input.Label>
          <Input.HelperText>{({ error }) => error || 'Test'}</Input.HelperText>
        </Input>
      </Box>
    </ThemeProvider>
  );
}
