import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/sb-admin-2.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Account/Login';
import { Admin } from './pages/Admin/Admin';
import { PrivateRoute } from './components/PrivateRoute';
import { AccountRoute } from './components/AccountRoute';
function App() {
  return (
    <div className="App" id='wrapper'>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/api/auth"
            element={
              <AccountRoute>
                <Login />
              </AccountRoute>}
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
