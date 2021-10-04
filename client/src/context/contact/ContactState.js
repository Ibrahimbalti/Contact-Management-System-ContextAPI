import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducers';
import { ADD_CONTACT, DELETE_CONTACT } from '../types';
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

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};
export default ContactState;
