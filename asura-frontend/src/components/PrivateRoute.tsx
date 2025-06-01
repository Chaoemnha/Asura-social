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
    const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/api/auth" replace />
  );
};

