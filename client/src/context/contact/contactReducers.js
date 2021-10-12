import {
  GET_CONTACT,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload.id ? action.payload : contact
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case FILTER_CONTACT:
      return {
        ...state,
        filter: state.contacts.filter((contact) => {
          // we make regular expression ..in regular expression first we pass action.payload the action.payload contant the text
          // and g means globally match the text and i means not a case sensative
          const regex = new RegExp(`${action.payload}`, 'gi');
          // we match the contact name to search box text and after we match email to search box text
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filter: null,
      };

    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_CONTACT:
      return {
        ...state,
        contacts: null,
        filter: null,
        error: null,
        current: null,
      };
    default:
      return state;
  }
};

export default contactReducer;
