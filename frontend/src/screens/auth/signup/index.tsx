import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {TextInput, Button, Text, ActivityIndicator} from 'react-native-paper';
import {Formik} from 'formik';

import {initSignupValues, signupValidationSchema} from './utils/helper';
import {useAuthDispatch} from '../../../contexts/auth';
import {CHANGE_AUTH} from '../../../contexts/auth/type';
import {postRequest} from '../../../utils/http';
import {storeSession} from '../../../utils/localStorage';

const SignupScreen = ({navigation}: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAuthDispatch();

  const onFormSubmit = async (values: {
    name: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    const userId = await postRequest({
      url: 'auth',
      body: {name: values.name, password: values.password},
    });
    await storeSession({name: 'auth_token', data: {value: userId}});
    dispatch({type: CHANGE_AUTH, isSignedIn: true, token: userId});
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.subSection}>
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

              <View style={styles.subSection}>
                <Button onPress={() => handleSubmit()} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator animating={true} />
                  ) : (
                    <Text variant="bodyLarge">Signup 📚</Text>
                  )}
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
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

export default SignupScreen;
