import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/sb-admin-2.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Account/Login';
import { Admin } from './pages/Admin/Admin';
import { PrivateRoute } from './components/PrivateRoute';
function App() {
  return (
    <div className="App" id='wrapper'>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute isAuthenticated={true}>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
