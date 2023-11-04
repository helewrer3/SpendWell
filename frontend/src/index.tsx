import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './screens';
import {useTheme} from './contexts/theme';
import {LIGHT_THEME, themeMap} from './contexts/theme/data';

const Main = (): JSX.Element => {
  const theme = useTheme();

  return (
    <PaperProvider theme={themeMap[theme?.theme || LIGHT_THEME]}>
      <NavigationContainer theme={themeMap[theme?.theme || LIGHT_THEME]}>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
