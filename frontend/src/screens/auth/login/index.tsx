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
import {getRequest} from '../../../utils/http';
import {changeAuth} from '../../../contexts/auth/action';

const LoginScreen = ({navigation}: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAuthDispatch();

  const onFormSubmit = async (values: {name: string; password: string}) => {
    setIsLoading(true);
    try {
      const userId = await getRequest({
        url: 'auth',
        params: {name: values.name, password: values.password},
      });
      await changeAuth(dispatch, userId);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
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
            <View style={styles.inputContainer}>
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

            <View style={styles.inputContainer}>
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

            <Button
              onPress={() => handleSubmit()}
              disabled={isLoading}
              style={styles.button}>
              {isLoading ? (
                <ActivityIndicator animating={true} />
              ) : (
                <Text variant="bodyLarge">Login 📖</Text>
              )}
            </Button>
          </>
        )}
      </Formik>
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
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  button: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
});

export default LoginScreen;
