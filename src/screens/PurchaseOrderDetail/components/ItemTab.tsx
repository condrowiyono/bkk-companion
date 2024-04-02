import React from 'react';
import {Colors, ListItem, Text, View} from 'react-native-ui-lib';

import {Item, PurchaseOrder} from '../../../interfaces/purchaseOrder';
import {FlatList} from 'react-native';
import {formatCurrency} from '../../../utils/currency';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

type DetailProps = {
  route: {data?: PurchaseOrder};
};

const ItemTab = (props: DetailProps) => {
  const {data} = props.route;

  const handleLongPress = (item: Item) => {
    const text = `${item.item_code} - ${item.item_name} - ${item.QTY} x ${item.price}`;

    Clipboard.setString(text);
    Toast.show({type: 'success', text1: 'Text berhasil di-salin'});
  };

  if (!data) {
    return null;
  }

  return (
    <FlatList
      data={data.items}
      keyExtractor={item => `${item.item_code}-${item.kodeprod}`}
      renderItem={({item, index}) => (
        <ListItem
          onLongPress={() => handleLongPress(item)}
          paddingH-12
          style={{
            backgroundColor: index % 2 === 0 ? Colors.grey70 : 'transparent',
          }}>
          <ListItem.Part middle>
            <View marginR-8>
              <Text text80M numberOfLines={2} marginB-2>
                {`${item.item_code} - ${item.item_name}`}
              </Text>
              <View row>
                <Text text90M>{item.QTY}</Text>
                <Text text90M>{' x '}</Text>
                <Text text90M>{formatCurrency(item.price)}</Text>
              </View>
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
