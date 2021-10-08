import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthentication } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onchange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      // setAlert('Please fill all the field', 'danger');
      setAlert('Please fill all the field', 'danger');
    } else if (password !== password2) {
      setAlert('Password does not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  useEffect(() => {
    if (isAuthentication) {
      // redirect the page
      props.history.push('/');
    }

    if (error === 'User email already exist') {
      setAlert(error, 'danger');
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthentication, props.history]);
  return (
    <div className="form-container">
      <h2>User Registraction</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="name"
            value={name}
            name="name"
            onChange={onchange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={onchange}
            name="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={onchange}
            minLength="6"
            name="password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            placeholder="password2"
            value={password2}
            onChange={onchange}
            minLength="6"
            name="password2"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
