import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {useAuthDispatch} from '../../contexts/auth';
import {CHANGE_LOADING} from '../../contexts/auth/type';
import {useThemeDispatch} from '../../contexts/theme';
import {setTheme} from '../../contexts/theme/action';
import {setAuth} from '../../contexts/auth/action';

const SplashScreen = ({navigation}: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const authDispatch = useAuthDispatch();
  const themeDispatch = useThemeDispatch();

  const getUserSettings = async () => {
    try {
      await setAuth(authDispatch);
      await setTheme(themeDispatch);
    } catch (error) {
      throw error;
    }
    setIsLoading(false);
    authDispatch({type: CHANGE_LOADING, isLoading: false});
  };

  useEffect(() => {
    getUserSettings();
  }, [navigation]);

  return (
    <SafeAreaView>
      {isLoading ? <ActivityIndicator animating={true} /> : <></>}
    </SafeAreaView>
  );
};

export default SplashScreen;
