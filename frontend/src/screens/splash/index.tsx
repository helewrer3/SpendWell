import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';

import {useAuthDispatch} from '../../contexts/auth';
import {CHANGE_LOADING} from '../../contexts/auth/type';

const SplashScreen = (): JSX.Element => {
  const dispatch = useAuthDispatch();

  return (
    <SafeAreaView>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => {
          if (dispatch) dispatch({type: CHANGE_LOADING, isLoading: false});
        }}>
        Press me
      </Button>
    </SafeAreaView>
  );
};

export default SplashScreen;
