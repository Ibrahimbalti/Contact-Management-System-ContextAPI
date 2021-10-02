import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  // the name email and other data get from database
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    contactContext.addContact(contact);

    setContact({
      name: '',
      email: '',
      phone: '',
      type: '',
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Contact</h2>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Add Contact"
        />
      </div>
    </form>
  );
};

export default ContactForm;
