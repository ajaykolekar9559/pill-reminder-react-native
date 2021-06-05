import {
  GET_MY_INFO,
} from '../actions/actions';

const initialState = {
  myProfile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_INFO:
      return {
        myProfile: action.payload,
      };
    default:
      return state;
  }
};
