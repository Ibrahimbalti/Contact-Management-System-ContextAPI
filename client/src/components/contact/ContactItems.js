import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
const ContactItems = ({ contact }) => {
  const { id, name, email, phone, type } = contact;
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        {''}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        <li>
          {email && <i className="fas fa-envelope-open" />}
          <span> {email}</span>
        </li>
        <li>
          {phone && <i className="fas fa-phone" />}
          <span> {phone}</span>
        </li>
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          delete
        </button>
      </p>
    </div>
  );
};

ContactItems.prototype = {
  contact: PropTypes.object.isRequired,
};

export default ContactItems;
