import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, FAB, Portal, Modal, Card} from 'react-native-paper';

import {useAuth} from '../../../../../contexts/auth';
import {getRequest} from '../../../../../utils/http';

const Accounts = ({navigation}: any): JSX.Element => {
  const auth = useAuth();
  const [accountsList, setAccountsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  useEffect(() => {
    (async () => {
      const l = await getRequest({url: `accounts/user/${auth.token}`});
    })();
  }, [navigation]);

  return (
    <>
      <ScrollView>
        {accountsList.map((account, index) => (
          <Text key={index}>{account}</Text>
        ))}
      </ScrollView>
      <FAB
        variant="surface"
        mode="flat"
        icon="plus"
        label="Add Account"
        style={styles.fab}
        onPress={showModal}
      />
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          <Card>
            <Card.Title title="Hello" />
          </Card>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modal: {
    padding: 32,
  },
});

export default Accounts;
