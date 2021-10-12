import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import ContactContext from '../../context/contact/contactContext';
export const Navbar = ({ title, icons }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { Logout, isAuthentication, user } = authContext;
  const { clearContact } = contactContext;

  const onLogout = () => {
    Logout();
    clearContact();
  };
  const authLink = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const gustLink = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icons}></i>
        {title}
      </h1>
      <ul>
        {/* <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li> */}

        {isAuthentication ? authLink : gustLink}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Contact Management',
  icons: 'fas fa-id-card-alt',
};
