import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducers';
import {
  ADD_CONTACT,
  GET_CONTACT,
  CLEAR_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filter: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //set contact
  const getContact = async () => {
    try {
      const res = await axios.get('/api/contact');
      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contact', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data });
    }
  };

  // delete conatact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // set Current
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // update contact

  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter the contact
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  // clear Filter the contact

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filter: state.filter,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};
export default ContactState;
