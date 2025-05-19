import React, { JSX } from 'react'
import { Login } from '../pages/Account/Login';
import { PathRouteProps } from 'react-router-dom';

interface PrivateRouteProps extends PathRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const PrivateRoute = ({
  children,
  isAuthenticated,
}: PrivateRouteProps): JSX.Element => {
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Login/>
  );
};

