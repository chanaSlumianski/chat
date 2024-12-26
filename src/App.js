import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MyFiles from './components/MyFiles';
import Discussion from './components/Discussion';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/navigate" element={<Navigation />} />
          <Route path="/myfiles" element={<MyFiles />} />
          <Route path="/discussion" element={<Discussion />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
