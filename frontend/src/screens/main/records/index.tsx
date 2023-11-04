/**
 * @format
 */

import React from 'react';
import {Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native';

const Records = (): JSX.Element => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <Text>Records</Text>
    </SafeAreaView>
  );
};

export default Records;
