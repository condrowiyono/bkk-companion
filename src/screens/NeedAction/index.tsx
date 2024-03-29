import React, {useMemo, useState} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import Projects from '../Projects';
import TabBarComponent from './components/TabBarComponent';
import PurchaseOrderSreen from '../PurchaseOrder';
import UpcomingFeature from '../../components/UpcomingFeature';

const renderScene = SceneMap({
  first: Projects,
  second: PurchaseOrderSreen,
  third: UpcomingFeature,
});

const NeedAction = () => {
  const [index, setIndex] = useState(0);

  const routes = useMemo(
    () => [
      {key: 'first', title: 'Budget Proyek'},
      {key: 'second', title: 'PO'},
      {key: 'third', title: 'Cuti'},
    ],
    [],
  );

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
