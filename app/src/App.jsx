import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/form/register';
import Login from './components/form/login';
import Vacation from './components/travel/vacation';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Grapth from './components/grapth/grapth';
import CardForm from './components/form/cardForm';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Vacation />
              </ProtectedRoute>
            }/>
            <Route path="/grapth" element={
              <ProtectedRoute>
                <Grapth />
              </ProtectedRoute>
            }/>
            <Route path="/cardForm/" element={
              <ProtectedRoute>
                <CardForm />
              </ProtectedRoute>
            }/>
          </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
