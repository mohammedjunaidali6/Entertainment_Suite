import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  let history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const path = useLocation();

  useEffect(() => {
    // alert('isAuthenticating: ' + isAuthenticating + ', isAuthenticated: ' + isAuthenticated)
    Auth.currentSession()
      .then((userData) => {
        setIsAuthenticated(true);
        setIsAuthenticating(false);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setIsAuthenticating(false);
      });
  }, [path.pathname]);

  return (
    !isAuthenticating &&
    <Route {...rest}
      render={props => {
        if (isAuthenticated) {
          if (rest.path === '/login') {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          } else {
            return <Component {...props} />;
          }
        } else {
          if (rest.path === '/login') {
            return <Component {...props} />;
          } else {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          }
        }
      }}
    />
  );
}