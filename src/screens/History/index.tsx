import React, {useState} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import TabBarComponent from './components/TabBarComponent';
import ProjectHistory from '../ProjectHistory';
import PurchaseOrderHistory from '../PurchaseOrderHistory';
import UpcomingFeature from '../../components/UpcomingFeature';

const renderScene = SceneMap({
  first: ProjectHistory,
  second: PurchaseOrderHistory,
  third: UpcomingFeature,
});

const routes = [
  {key: 'first', title: 'Budget Proyek'},
  {key: 'second', title: 'DKM/PO'},
  {key: 'third', title: 'Cuti'},
];

const History = () => {
  const [index, setIndex] = useState(0);

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

export default History;
