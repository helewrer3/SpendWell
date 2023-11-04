import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Axe from './dummy';

const Stack = createStackNavigator();

const AuthScreenNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Splash" component={Axe} />
    </Stack.Navigator>
  );
};

export default AuthScreenNavigator;
