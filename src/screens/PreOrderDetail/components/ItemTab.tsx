import React from 'react';
import {ListItem, Text, View} from 'react-native-ui-lib';

import {PreOrder} from '../../../interfaces/preOrder';
import {FlatList} from 'react-native';
import {formatCurrency} from '../../../utils/currency';

type DetailProps = {
  route: {data?: PreOrder};
};

const ItemTab = (props: DetailProps) => {
  const {data} = props.route;

  if (!data) {
    return null;
  }

  return (
    <FlatList
      data={data.items}
      keyExtractor={item => item.item_code}
      renderItem={({item}) => (
        <ListItem paddingH-12>
          <ListItem.Part middle>
            <View>
              <View row>
                <Text text90H>{item.QTY}</Text>
                <Text text90H>{' x '}</Text>
                <Text text90H>{formatCurrency(item.price)}</Text>
              </View>
              <Text text80M>{`${item.item_code} - ${item.item_name}`}</Text>
            </View>
          </ListItem.Part>
          <ListItem.Part right>
            <Text>{formatCurrency(item.subTotal)}</Text>
          </ListItem.Part>
        </ListItem>
      )}
    />
  );
};

export default ItemTab;
