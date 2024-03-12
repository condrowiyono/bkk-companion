import React from 'react';
import {Colors, ListItem, Text, View} from 'react-native-ui-lib';

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
      keyExtractor={item => `${item.item_code}-${item.kodeprod}`}
      renderItem={({item, index}) => (
        <ListItem
          paddingH-12
          style={{
            backgroundColor: index % 2 === 0 ? Colors.grey70 : 'transparent',
          }}>
          <ListItem.Part middle>
            <View>
              <View row>
                <Text text90M>{item.QTY}</Text>
                <Text text90M>{' x '}</Text>
                <Text text90M>{formatCurrency(item.price)}</Text>
              </View>
              <Text text80M numberOfLines={2}>
                {`${item.item_code} - ${item.item_name}`}
              </Text>
            </View>
          </ListItem.Part>
          <ListItem.Part right containerStyle={{width: 100}}>
            <Text>{formatCurrency(item.subTotal)}</Text>
          </ListItem.Part>
        </ListItem>
      )}
    />
  );
};

export default ItemTab;
