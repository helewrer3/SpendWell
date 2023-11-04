import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import Home from './home';
import Settings from './settings';

const Tab = createMaterialBottomTabNavigator();

const MainScreenNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Records"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="notebook-multiple"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Budget"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="google-spreadsheet"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="application-settings"
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreenNavigator;
