import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    //check the user login or not
    isAuthentication: null,
    // jb page loading hoga tu loading true our jab load ho jaya ga tu ladding false ho jay ga
    loading: true,
    // jis ko user ko hmna authenticate krna ha
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  // Register Users
  const register = async (formData) => {
    //  we send a formData  in json format so we tell a axios we snd a json data so
    // we define a config that contain the headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadedUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };
  //loaded user
  const loadedUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  //login user
  const Login = async (formData) => {
    //  we send a formData  in json format so we tell a axios we snd a json data so
    // we define a config that contain the headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadedUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };
  //logout user

  const Logout = () => dispatch({ type: LOGINOUT });
  // clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,

        isAuthentication: state.isAuthentication,

        loading: state.loading,

        user: state.user,
        error: state.error,
        register,
        loadedUser,
        clearErrors,
        loadedUser,
        Login,
        Logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;
