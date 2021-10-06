import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGINOUT,
  AUTH_ERROR,
  CLEAR_ERRORS,
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthentication: true,
        loading: false,
      };

    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthentication: false,
        token: null,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
