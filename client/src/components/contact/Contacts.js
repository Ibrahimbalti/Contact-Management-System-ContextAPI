import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';
export const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filter } = contactContext;
  if (contacts.length === 0) {
    return <h3>Add the form of contact </h3>;
  }

  return (
    <Fragment>
      {filter !== null
        ? filter.map((contact) => (
            <ContactItems key={contact._id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <ContactItems key={contact._id} contact={contact} />
          ))}
    </Fragment>
  );
};
