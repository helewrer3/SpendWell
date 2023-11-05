import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card, Switch, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

import {useAuth, useAuthDispatch} from '../../../../contexts/auth';
import {getRequest} from '../../../../utils/http';
import {removeAuth} from '../../../../contexts/auth/action';

const LogoutCard = ({navigation}: any): JSX.Element => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const userData = await getRequest({url: `auth/${auth.token}`});
        setName(userData.Name);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [navigation]);

  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Title
        style={styles.cardSection}
        title="Hello 👋"
        subtitle={name}
        left={props => <MaterialCommunityIcons name="account" {...props} />}
        right={props => (
          <Button
            mode="contained-tonal"
            {...props}
            onPress={() => removeAuth(dispatch)}>
            <Text>Logout</Text>
          </Button>
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

export default LogoutCard;
