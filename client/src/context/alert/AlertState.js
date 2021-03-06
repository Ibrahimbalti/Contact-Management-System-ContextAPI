import React, { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import { v4 as uuid } from 'uuid';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set alert
  // 5000 ms is equal to 5 second
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <alertContext.Provider value={{ alert: state, setAlert }}>
      {props.children}
    </alertContext.Provider>
  );
};
export default AlertState;
