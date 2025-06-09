import React, { JSX, useEffect, useState } from 'react'
import { Login } from '../pages/Account/Login';
import { Navigate, PathRouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({
  children,
  }: PrivateRouteProps): JSX.Element => {
    const isAuthenticated = useSelector((state: AppState)=> state) as any;
    
  return isAuthenticated.account.token ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

