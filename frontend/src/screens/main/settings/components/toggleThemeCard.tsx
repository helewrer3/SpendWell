import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Switch} from 'react-native-paper';
import {StyleSheet} from 'react-native';

import {useTheme, useThemeDispatch} from '../../../../contexts/theme';
import {DARK_THEME, LIGHT_THEME} from '../../../../contexts/theme/data';
import {changeTheme} from '../../../../contexts/theme/action';

const ToggleThemeCard = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useThemeDispatch();
  const [toggleValue, setToggleValue] = useState(
    theme.theme == DARK_THEME ? true : false,
  );

  useEffect(() => {
    (async () => {
      await changeTheme(dispatch, toggleValue ? DARK_THEME : LIGHT_THEME);
    })();
  }, [toggleValue]);

  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Title
        style={styles.cardSection}
        title="Toggle Theme"
        subtitle={theme.theme}
        left={props => (
          <MaterialCommunityIcons name="theme-light-dark" {...props} />
        )}
        right={props => (
          <Switch
            {...props}
            value={toggleValue}
            onValueChange={() => setToggleValue(!toggleValue)}
          />
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  cardSection: {
    padding: 16,
  },
});

export default ToggleThemeCard;
