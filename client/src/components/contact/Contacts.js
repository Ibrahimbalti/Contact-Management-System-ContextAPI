import React, { useContext, Fragment, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';
import Spinner from '../layout/Spinner';
export const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filter, getContact, loading } = contactContext;

  useEffect(() => {
    getContact();
    // eslint-disable-next-line
  }, []);
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h3>Add the form of contact </h3>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <Fragment>
          {filter !== null
            ? filter.map((contact) => (
                <ContactItems key={contact._id} contact={contact} />
              ))
            : contacts.map((contact) => (
                <ContactItems key={contact._id} contact={contact} />
              ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
