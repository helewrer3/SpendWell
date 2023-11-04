import axios from 'axios';

const REACT_APP_SERVER_URL = 'http://10.0.2.2:8080';

const getRequest = async ({url, params = {}}) => {
  try {
    const {message, payload = {}} = (
      await axios.get(`${REACT_APP_SERVER_URL}/${url}`, {
        params,
      })
    ).data;
    return payload;
  } catch (error) {
    throw (
      error.response.data.message || 'Error sending request, try again later'
    );
  }
};

const postRequest = async ({url, body = {}, config = {}}) => {
  try {
    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/${url}`,
      body,
      config,
    );
    if (response.data === 'object') {
      const {message, payload = {}} = response.data;
      return payload;
    } else {
      return response.data;
    }
  } catch (error) {
    throw (
      error.response.data.message || 'Error sending request, try again later'
    );
  }
};

const putRequest = async ({url, body = {}}) => {
  try {
    const {message, payload = {}} = (
      await axios.put(`${REACT_APP_SERVER_URL}/${url}`, body)
    ).data;
    return payload;
  } catch (error) {
    throw (
      error.response.data.message || 'Error sending request, try again later'
    );
  }
};

const delRequest = async ({url, params = {}}) => {
  try {
    const {message, payload = {}} = (
      await axios.delete(`${REACT_APP_SERVER_URL}/${url}`, {
        params,
      })
    ).data;
    return payload;
  } catch (error) {
    throw (
      error.response.data.message || 'Error sending request, try again later'
    );
  }
};

export {getRequest, postRequest, putRequest, delRequest};
