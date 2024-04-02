import React, {useEffect, useState} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import Projects from '../Projects';
import TabBarComponent from './components/TabBarComponent';
import PurchaseOrderSreen from '../PurchaseOrder';
import UpcomingFeature from '../../components/UpcomingFeature';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackList} from '../../navigations/types';

const renderScene = SceneMap({
  first: Projects,
  second: PurchaseOrderSreen,
  third: UpcomingFeature,
});

const routes = [
  {key: 'first', title: 'Proyek'},
  {key: 'second', title: 'PO'},
  {key: 'third', title: 'Cuti'},
];

const NeedAction = () => {
  const {params} = useRoute<RouteProp<StackList, 'TabNavigator'>>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(params?.tabId || 0);
  }, [params?.tabId]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => (
        <TabBarComponent {...props} onChageIndex={setIndex} />
      )}
    />
  );
};

export default NeedAction;
