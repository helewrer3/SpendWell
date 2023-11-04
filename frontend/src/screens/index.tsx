import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth/context';

import AuthScreenNavigator from '../screens/auth';
import MainScreenNavigator from '../screens/main';
import SplashScreen from '../screens/splash';

const Navigation = (): JSX.Element => {
  const authStatus = useContext(AuthContext);

  if (authStatus?.isLoading) return <SplashScreen />;

  return authStatus?.isSignedIn ? (
    <MainScreenNavigator />
  ) : (
    <AuthScreenNavigator />
  );
};

export default Navigation;
