import {PostAPIAxios} from './service';
import Config from 'react-native-config';

const {HOST} = Config;

export const signup = async (data) => {
  let url = `${HOST}/admin/signup`;
  try {
    const response = await PostAPIAxios(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const signin = async (data) => {
  let url = `${HOST}/admin/signin`;
  try {
    const response = await PostAPIAxios(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const doctorSignin = async (data) => {
  let url = `${HOST}/doctor/signin`;
  try {
    const response = await PostAPIAxios(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const patientSignup = async (data) => {
  let url = `${HOST}/patient/signup`;
  try {
    const response = await PostAPIAxios(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const patientLogin = async (data) => {
  let url = `${HOST}/patient/signin`;
  try {
    const response = await PostAPIAxios(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

