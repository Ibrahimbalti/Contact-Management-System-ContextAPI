import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';
export const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItems key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};
