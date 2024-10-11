import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  const { t } = useTranslation(); // Esto sigue siendo parte de la configuración de traducción

  return (
    <Suspense fallback="Cargando traducciones">
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
