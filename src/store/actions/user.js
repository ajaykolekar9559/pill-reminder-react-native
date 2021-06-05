import Services from '../services';
import {
  GET_MY_INFO,
} from './actions';

export const userPersonalInfo = () => {
  return async (dispatch) => {
    try {
      let myProfile = await Services.user.getUserInfo();
      if (myProfile) {
        dispatch({
          type: GET_MY_INFO,
          payload: myProfile,
        });
        return myProfile;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getDoctorInfo = () => {
  return async (dispatch) => {
    try {
      let myProfile = await Services.user.getDoctorInfo();
      if (myProfile) {
        dispatch({
          type: GET_MY_INFO,
          payload: myProfile,
        });
        return myProfile;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getPatientInfo = () => {
  return async (dispatch) => {
    try {
      let myProfile = await Services.user.getPatientInfo();
      if (myProfile) {
        dispatch({
          type: GET_MY_INFO,
          payload: myProfile,
        });
        return myProfile;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getPatientCount = () => {
  return async (dispatch) => {
    try {
      let count = await Services.user.getPatientCount();
      if (count) {
        return count;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getPatientList = () => {
  return async (dispatch) => {
    try {
      let all = await Services.user.getPatientList();
      if (all) {
        return all;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getDoctorCount = () => {
  return async (dispatch) => {
    try {
      let count = await Services.user.getDoctorCount();
      if (count) {
        return count;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const addDoctor = (data) => {
  return async (dispatch) => {
    try {
      let dataD = await Services.user.addDoctor(data);
      if (dataD) {
        return dataD;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
