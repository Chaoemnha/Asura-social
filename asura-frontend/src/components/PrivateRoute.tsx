import React, { JSX } from 'react'
import { Navigate, PathRouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
interface PrivateRouteProps extends PathRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({
  children,
  }: PrivateRouteProps): JSX.Element => {
    const data = useSelector((state: AppState)=> state) as any;
    console.log(data.account.error);
  return (!(data.account.error)&&!!(data.account.token)) ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

