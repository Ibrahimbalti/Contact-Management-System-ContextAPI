import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducers';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from '../types';
import { v4 as uuid } from 'uuid';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'ibrahim',
        email: 'ibrahim@gmail.com',
        phone: '0093838',
        type: 'personal',
      },
      {
        id: 2,
        name: 'ismail',
        email: 'ismailm@gmail.com',
        phone: '930308',
        type: 'personal',
      },
      {
        id: 3,
        name: 'ishaq',
        email: 'ishqm@gmail.com',
        phone: '037388',
        type: 'professional',
      },
    ],

    current: null,
    filter: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = (contact) => {
    contact.id = uuid;
    dispatch({ type: ADD_CONTACT, payload: contact });
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
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};
export default ContactState;