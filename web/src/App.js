import React, { Suspense } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Suspense fallback={<div>Cargando traducciones...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
