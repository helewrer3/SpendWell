import axios from 'axios';

export const loginUser = async ({name, password}: any) => {
  try {
    const response = await axios.get('http://10.0.2.2:8080/auth', {
      params: {name, password},
    });
    return response.data.message;
  } catch (e: any) {
    throw new Error(e);
  }
};
