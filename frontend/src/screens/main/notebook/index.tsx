import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Accounts from './tabs/accounts';
import Categories from './tabs/categories';

const Tab = createMaterialTopTabNavigator();

const Notebook = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accounts" component={Accounts} />
      <Tab.Screen name="Categories" component={Categories} />
    </Tab.Navigator>
  );
};

export default Notebook;
