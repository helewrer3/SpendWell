import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './login';
import SignupScreen from './signup';

const Stack = createStackNavigator();

const AuthScreenNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Login Screen" component={LoginScreen} />
      <Stack.Screen name="Signup Screen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthScreenNavigator;
