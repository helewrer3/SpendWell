import {object, string} from 'yup';

export const initLoginValues = {
  name: '',
  password: '',
};

export const loginValidationSchema = object().shape({
  name: string()
    .min(8, 'Name must be at least 8 characters')
    .required('Name is required'),
  password: string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
