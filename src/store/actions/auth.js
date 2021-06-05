import AsyncStorage from '@react-native-community/async-storage';
import Services from '../services';
import {AUTHENTICATE, LOGOUT} from './actions';

export const authenticate = (token) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, token: token});
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    try {
      let user = await Services.auth.signup(data);
      if (user) {
        await AsyncStorage.setItem('userAuthToken', user.token);
        const userProfileData = await Services.user.getUserInfo();
        if (userProfileData) {
          dispatch(authenticate(user.token));
          return user;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      let user = await Services.auth.signin(data);
      if (user) {
        await AsyncStorage.setItem('userAuthToken', user.token);
        const userProfileData = await Services.user.getUserInfo();
        if (userProfileData) {
          dispatch(authenticate(user.token));
          return user;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const doctorLogin = (data) => {
  return async (dispatch) => {
    try {
      let user = await Services.auth.doctorSignin(data);
      if (user) {
        await AsyncStorage.setItem('userAuthToken', user.token);
        const userProfileData = await Services.user.getDoctorInfo();
        if (userProfileData) {
          dispatch(authenticate(user.token));
          return user;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const patientSignup = (data) => {
  return async (dispatch) => {
    try {
      let user = await Services.auth.patientSignup(data);
      if (user) {
        await AsyncStorage.setItem('userAuthToken', user.token);
        const userProfileData = await Services.user.getPatientInfo();
        if (userProfileData) {
          dispatch(authenticate(user.token));
          return user;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const patientLogin = (data) => {
  return async (dispatch) => {
    try {
      let user = await Services.auth.patientLogin(data);
      if (user) {
        await AsyncStorage.setItem('userAuthToken', user.token);
        const userProfileData = await Services.user.getPatientInfo();
        if (userProfileData) {
          dispatch(authenticate(user.token));
          return user;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    AsyncStorage.removeItem('userAuthToken');
    return {type: LOGOUT};
  };
};
