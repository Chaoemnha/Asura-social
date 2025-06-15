import React from 'react';
import './App.css';
import './styles/sb-admin-2.min.css';
import './styles/css/all.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Account/Login';
import { Admin } from './pages/Admin/Admin';
import { PrivateRoute } from './components/PrivateRoute';
import { AccountRoute } from './components/AccountRoute';
import { Home } from './pages/Home/Home';
import { Users } from './pages/Users/Users';
import {urlConstants} from './url-constants/url-constants';
import { AddUser } from './pages/Users/AddUser';
function App() {
  console.log(urlConstants.USER_LIST);
  return (
    <div className="App" id='wrapper'>
      <BrowserRouter>
        <Routes>
  <Route
    path="/"
    element={
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    }
  >
    <Route path={urlConstants.USER_LIST} element={<Users />} />
    <Route path={urlConstants.HOME} element={<Home />} />
    <Route path={urlConstants.USER_ADD} element={<AddUser/>}/>
  </Route>
  <Route
    path="/login"
    element={
      <AccountRoute>
        <Login />
      </AccountRoute>}
  />
</Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
