import React, { useContext, useEffect } from 'react';
import { Contacts } from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';
import AuthContext from '../../context/auth/authContext';
export const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadedUser();
  }, []);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};
