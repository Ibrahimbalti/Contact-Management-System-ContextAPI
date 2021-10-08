import './App.css';
import React, { Fragment } from 'react';
import { Navbar } from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoutes';
const App = () => {
  // jab be user ko page refresh kr ga...tu user load hga is localstorage ko app.js ma use kiya ha
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <div className="App">
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alert />
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </ContactState>
      </AuthState>
    </div>
  );
};

export default App;
