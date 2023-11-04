/**
 * @format
 */

import React from 'react';
import {Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native';

const Home = (): JSX.Element => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
