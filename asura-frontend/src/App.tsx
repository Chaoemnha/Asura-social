import React, { useEffect } from 'react';
import './App.css';
import './styles/sb-admin-2.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Account/Login';
import { Admin } from './pages/Admin/Admin';
import { PrivateRoute } from './components/PrivateRoute';
import { AccountRoute } from './components/AccountRoute';
import { Home } from './pages/Home/Home';
import { Users } from './pages/Users/Users';
function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
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
  >
    <Route path="users" element={<Users />} />
    <Route index element={<Home />} />
  </Route>
  <Route
    path="/login"
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
