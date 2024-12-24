import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Home from './components/Home';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/navigate" element={<Navigation />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
