import React from 'react';
import {Text} from 'react-native-ui-lib';

type ListFooterProps = {
  title?: string;
  show?: boolean;
};

const ListFooter = (props: ListFooterProps) => {
  const {title = 'Berhasil memuat', show = false} = props;

  return (
    <Text center marginV-4>
      {show ? title : ''}
    </Text>
  );
};

export default ListFooter;
