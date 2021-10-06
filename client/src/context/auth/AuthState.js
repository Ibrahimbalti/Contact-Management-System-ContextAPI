import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
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
import { v4 as uuid } from 'uuid';

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

  // load user
  // Register user
  // const Register = async (formData) => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   try {
  //     const res = await axios.post('/api/users', formData, config);
  //     dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  //   } catch (error) {
  //     dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
  //   }
  // };

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  //login user
  //logout user
  // clear errors

  return (
    <authContext.Provider
      value={{
        token: state.token,

        isAuthentication: state.isAuthentication,

        loading: state.loading,

        user: state.user,
        error: state.error,
        register,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthState;
