import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  let history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const path = useLocation();

  useEffect(() => {
    onLoad();
  }, [rest.path]);

  async function onLoad() {
    try {
      var session=await Auth.currentSession();
      console.log('***',session);
      setIsAuthenticated(true);
    }
    catch (e) {
      setIsAuthenticated(false);
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <Route {...rest}
      render={props => {
        if (isAuthenticated) {
          if (rest.path === '/login') {
            return <Redirect to={{ pathname: '/loading', state: { from: props.location } }} />
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