import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import {Formik} from 'formik';

import {initLoginValues, loginValidationSchema} from './utils/helper';
import {useAuthDispatch} from '../../../contexts/auth';
import {CHANGE_AUTH} from '../../../contexts/auth/type';
import {getRequest} from '../../../utils/http';
import {storeSession} from '../../../utils/localStorage';

const LoginScreen = ({navigation}: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAuthDispatch();

  const onFormSubmit = async (values: {name: string; password: string}) => {
    setIsLoading(true);
    const userId = await getRequest({
      url: 'auth',
      params: {name: values.name, password: values.password},
    });
    await storeSession({name: 'auth_token', data: {value: userId}});
    dispatch({type: CHANGE_AUTH, isSignedIn: true, token: userId});
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.subSection}>
          <Text variant="headlineLarge">Welcome back 📒</Text>
        </View>
        <Formik
          initialValues={initLoginValues}
          validationSchema={loginValidationSchema}
          onSubmit={onFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.subSection}>
                <TextInput
                  label="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={!!(touched.name && errors.name)}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.subSection}>
                <TextInput
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  error={!!(touched.password && errors.password)}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <View style={styles.subSection}>
                <Button onPress={() => handleSubmit()} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator animating={true} />
                  ) : (
                    <Text variant="bodyLarge">Login 📖</Text>
                  )}
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
      <Divider />
      <View style={styles.section}>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate('Signup Screen')}>
          <Text variant="bodyLarge">Create Account? ✍️</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    marginBottom: 16,
  },
  subSection: {
    marginTop: 4,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
  },
});

export default LoginScreen;
