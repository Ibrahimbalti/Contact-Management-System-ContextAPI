import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export const Navbar = ({ title, icons }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icons}></i>
        {title}
      </h1>
      <ul>
        <li>
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
        </li>
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
