import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {TextInput, Button, Text, ActivityIndicator} from 'react-native-paper';
import {Formik} from 'formik';

import {initSignupValues, signupValidationSchema} from './utils/helper';
import {useAuthDispatch} from '../../../contexts/auth';
import {postRequest} from '../../../utils/http';
import {changeAuth} from '../../../contexts/auth/action';

const SignupScreen = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAuthDispatch();

  const onFormSubmit = async (values: {
    name: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    try {
      const userId = await postRequest({
        url: 'auth',
        body: {name: values.name, password: values.password},
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
        <Text variant="headlineLarge">Namaste 🙏</Text>
      </View>
      <Formik
        initialValues={initSignupValues}
        validationSchema={signupValidationSchema}
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

            <View style={styles.inputContainer}>
              <TextInput
                label="Confirm Password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
                error={!!(touched.confirmPassword && errors.confirmPassword)}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <Button
              onPress={() => handleSubmit()}
              disabled={isLoading}
              style={styles.button}>
              {isLoading ? (
                <ActivityIndicator animating={true} />
              ) : (
                <Text variant="bodyLarge">Signup 📚</Text>
              )}
            </Button>
          </>
        )}
      </Formik>
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

export default SignupScreen;
