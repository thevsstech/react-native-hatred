import React from 'react';

const SelectEmpty = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <>{children}</>;
};

SelectEmpty.displayName = 'Select.Empty';

export default SelectEmpty;
