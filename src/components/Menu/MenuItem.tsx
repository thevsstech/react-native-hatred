import { TouchableOpacity, ViewStyle } from 'react-native';
import type { MenuOption } from './Menu';
import React from 'react';
import Text from '../Typography/Text';
const styles = {
  itemContainer: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 8,
    minWidth: 150,
  },

  itemLabel: {
    color: '#000',
    fontSize: 14,
  },
};

const MenuItem = ({ label, onPress, style = {} }: MenuOption) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer as ViewStyle, style.container]}
    >
      {typeof label === 'string' ? (
        <Text style={[styles.itemLabel, style.label]}>{label}</Text>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
};

export default MenuItem;
