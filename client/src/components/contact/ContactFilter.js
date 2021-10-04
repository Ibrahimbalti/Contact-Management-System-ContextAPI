import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filter } = contactContext;
  // useRef is a hook that allow the referrence of DoM elements...
  // In this case we useRef to give a referrence of DoM elelment like input field
  // According to this ref we update the state value
  const text = useRef('');
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  useEffect(() => {
    if (filter === null) {
      text.current.value = '';
    }
  });
  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Search Contact"
        onChange={onChange}
      />
    </form>
  );
};
export default ContactFilter;
