import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducers';
import { v4 as uuid } from 'uuid';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

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
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = (contact) => {
    contact.id = uuid;
    dispatch({ type: 'ADD_CONTACT', payload: contact });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};
export default ContactState;
