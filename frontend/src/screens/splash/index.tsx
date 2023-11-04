import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {useAuthDispatch} from '../../contexts/auth';
import {CHANGE_AUTH, CHANGE_LOADING} from '../../contexts/auth/type';
import {retrieveSession} from '../../utils/localStorage';

const SplashScreen = ({navigation}: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAuthDispatch();

  const getUserToken = async () => {
    try {
      const token = await retrieveSession({name: 'auth_token'});
      if (token) dispatch({type: CHANGE_AUTH, isSignedIn: true, token: token});
    } catch (error) {
      throw error;
    }
    setIsLoading(false);
    dispatch({type: CHANGE_LOADING, isLoading: false});
  };

  useEffect(() => {
    getUserToken();
  }, [navigation]);

  return (
    <SafeAreaView>
      {isLoading ? <ActivityIndicator animating={true} /> : <></>}
    </SafeAreaView>
  );
};

export default SplashScreen;
