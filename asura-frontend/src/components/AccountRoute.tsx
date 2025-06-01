import React, { JSX } from 'react'
import { Login } from '../pages/Account/Login';
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
  const account = useSelector((state: AppState)=> state.account);
  return account.token ? (
    <Navigate to="/admin/home" replace />
  ) : (
    <Login/>
  );
};
