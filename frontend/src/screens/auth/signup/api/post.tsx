import axios from 'axios';

export const signupUser = async ({name, password}: any) => {
  try {
    const res = await axios.post('http://10.0.2.2:8080/auth', {name, password});
    return res.data.payload;
  } catch (e: any) {
    throw new Error(e);
  }
};
