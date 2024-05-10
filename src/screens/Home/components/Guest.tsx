import React from 'react';
import {Carousel, Image, Text, View} from 'react-native-ui-lib';

const IMAGES = [
  'https://www.bukaka.com/asset/uploads/images/BRB_two_tunnel_glass.JPG',
  'https://www.bukaka.com/asset/uploads/images/BRB_Port.jpg',
  'https://www.bukaka.com/asset/uploads/images/Twr_transmisi.png',
];

const BUSSINESS = [
  'Steel Tower',
  'Passenger Boarding Bridge',
  'Steel Bridge',
  'Oil & Gas Equipment',
  'Road Construction Equipment',
  'Offshore Maintenance And Services',
  'Special Purpose Vehicle',
  'Galvanizing',
  'Subsidiaries',
];

const Guest = () => {
  return (
    <>
      <View flexG>
        <Text text60M marginH-16 marginV-4>
          Tentang Bukaka
        </Text>
        <Carousel containerStyle={{height: 200}}>
          {IMAGES.map((image, i) => {
            return (
              <View flex centerV key={i}>
                <Image style={{flex: 1}} source={{uri: image}} />
              </View>
            );
          })}
        </Carousel>
      </View>
      <View>
        <Text text60M marginH-16 marginV-4>
          Bisnis Bukaka
        </Text>
        <Carousel containerStyle={{height: 80}} autoplay loop>
          {BUSSINESS.map((item, i) => {
            return (
              <View flex centerV key={i} marginH-16>
                <Text textAlign="center" text60>
                  {item}
                </Text>
              </View>
            );
          })}
        </Carousel>
      </View>
    </>
  );
};

export default Guest;
