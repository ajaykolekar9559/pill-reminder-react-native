import {signup, signin, doctorSignin, patientLogin, patientSignup} from './auth';
import {
  getUserInfo,
  getPatientCount,
  getDoctorCount,
  addDoctor,
  getDoctorInfo,
  getPatientInfo,
  getPatientList,
} from './user';

export default {
  auth: {
    signup,
    signin,
    doctorSignin,
    patientLogin,
    patientSignup
  },
  user: {
    getUserInfo,
    getPatientCount,
    getDoctorCount,
    addDoctor,
    getDoctorInfo,
    getPatientInfo,
    getPatientList,
  },
};
