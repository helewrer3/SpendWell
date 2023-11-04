import EncryptedStorage from 'react-native-encrypted-storage';

export const storeSession = async ({name, data}) => {
  try {
    await EncryptedStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};

export const retrieveSession = async ({name}) => {
  try {
    const data = await EncryptedStorage.getItem(name);
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeSession = async ({name}) => {
  try {
    await EncryptedStorage.removeItem(name);
  } catch (error) {
    throw error;
  }
};
