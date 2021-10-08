import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
// The standard way of privateRouting is to pass object instead of props and first Component is key
// and second is value and baki props ko rest ma store krng ga...
// private rout means route in routes
const PrivateRoutes = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthentication, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthentication && !loading ? (
          <Redirect to="login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoutes;
