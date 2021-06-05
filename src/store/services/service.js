import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

// To check internet status
export const checkInternetConnection = async () => {
  const status = NetInfo.fetch().then((state) => {
    return state.isConnected;
  });
  return status;
};

// Headers
export const axiosConfig = async () => {
  let authToken = await AsyncStorage.getItem('userAuthToken');
  if (authToken) {
    return {
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
  } else {
    return {
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
      },
    };
  }
};

// Post Call
export const PostAPIAxios = async (url, body) => {
  const config = await axiosConfig();
  let status = await checkInternetConnection();
  if (status == true) {
    try {
      return axios.post(url, body, config);
    } catch (err) {
      return err;
    }
  } else {
    Alert.alert('', 'You are not connected to internet.', [
      {
        text: 'Okay',
      },
    ]);
    return false;
  }
};

// Put Call
export const PutAPIAxios = async (url, body) => {
  const config = await axiosConfig();
  let status = await checkInternetConnection();
  if (status == true) {
    try {
      return axios.put(url, body, config);
    } catch (err) {
      return err;
    }
  } else {
    Alert.alert('', 'You are not connected to internet.', [
      {
        text: 'Okay',
      },
    ]);
    return false;
  }
};

// // Get call
export const GetAPIAxios = async (url, paramsBody) => {
  let authToken = await AsyncStorage.getItem('userAuthToken');
  const config = await axiosConfig();
  try {
    if (paramsBody) {
      const date = {
        date: paramsBody,
      };
      return axios.get(url, {
        params: date,
        headers: {
          Accept: 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
    } else {
      return axios.get(url, config);
    }
  } catch (err) {
    return err;
  }
};

// Delete Call
export const DeleteAPIAxios = async (url) => {
  const config = await axiosConfig();
  try {
    return axios.delete(url, config);
  } catch (err) {
    return err;
  }
};
