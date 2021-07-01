import {GetAPIAxios, PostAPIAxios, PutAPIAxios} from './service';
import Config from 'react-native-config';

// const {HOST} = Config;
const HOST = 'https://blooming-beach-14948.herokuapp.com/api/v1'


export const getUserInfo = async () => {
  let url = `${HOST}/admin/profile`;
  try {
    const response = await GetAPIAxios(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getDoctorInfo = async () => {
  let url = `${HOST}/doctor/profile`;
  try {
    const response = await GetAPIAxios(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getPatientInfo = async () => {
  let url = `${HOST}/patient/profile`;
  try {
    const response = await GetAPIAxios(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const getPatientCount = async () => {
  let url = `${HOST}/patient/count`;
  try {
    const response = await GetAPIAxios(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getPatientList = async () => {
  let url = `${HOST}/patient/all`;
  try {
    const response = await GetAPIAxios(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


export const getDoctorCount = async () => {
  let url = `${HOST}/doctor/count`;
  try {
    const response = await GetAPIAxios(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addDoctor = async (data) => {
  let url = `${HOST}/doctor/signup`;
  try {
    const response = await PostAPIAxios(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addPillReminder = async (data) => {
  let url = `${HOST}/doctor/pill/add-pill`;
  try {
    const response = await PostAPIAxios(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getNotificationHistory = async () => {
  let url = `${HOST}/patient/notification`;
  try {
    const response = await GetAPIAxios(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};