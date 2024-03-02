import React from 'react';
import {Text} from 'react-native-ui-lib';

type ListHeaderProps = {
  title?: string;
  show?: boolean;
};

const ListHeader = (props: ListHeaderProps) => {
  const {title = 'Memuat data ...', show = false} = props;

  return (
    <Text center marginV-4>
      {show ? title : ''}
    </Text>
  );
};

export default ListHeader;
