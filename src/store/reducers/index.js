import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authToken from './auth-token';
import userReducer from './user';

export default combineReducers({
  authToken,
  form: formReducer,
  user: userReducer,
});
