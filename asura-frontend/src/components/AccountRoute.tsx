import React, { JSX } from 'react'
import { Navigate, PathRouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

interface PrivateRouteProps extends PathRouteProps {
  children: React.ReactNode;
}
//Thg này ktra xem có account token ko thì chuyển đến sang home
export const AccountRoute = ({
  children,
  }: PrivateRouteProps): JSX.Element => {
  const data = useSelector((state: AppState)=> state) as any;
  console.log(data.account.token);
  return (!(data.account.error)&&!!(data.account.token)) ? (
    <Navigate to="/" replace />
  ) : (
    <>{children}</>
  );
};
