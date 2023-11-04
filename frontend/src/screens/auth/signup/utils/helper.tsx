import {object, string} from 'yup';

export const initSignupValues = {
  name: '',
  password: '',
  confirmPassword: '',
};

export const signupValidationSchema = object().shape({
  name: string()
    .min(8, 'Name must be at least 8 characters')
    .required('Name is required'),
  password: string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    })
    .required('Confirm Password is required'),
});
