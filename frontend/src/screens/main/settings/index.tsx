import React from 'react';
import {useTheme} from 'react-native-paper';
import {SafeAreaView, ScrollView} from 'react-native';
import LogoutCard from './components/logoutCard';
import ToggleThemeCard from './components/toggleThemeCard';

const Settings = (): JSX.Element => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <ScrollView>
        <LogoutCard />
        <ToggleThemeCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
