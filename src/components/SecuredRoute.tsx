import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import auth0Client from '../Auth';

export default (props: RouteProps | any) => {
  const { component: Component, path, checkingSession } = props;
  return (
    <Route path={path} render={() => {
      if (checkingSession) return <h3 className="text-center">Validating session...</h3>;

      if (!auth0Client.isAuthenticated()) {
        auth0Client.signIn({ appState: {redirectUrl: location }} as any);
        return <div></div>;
      }
      
      return <Component />
    }} />
  );
}
