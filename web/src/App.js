import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback="Cargando traducciones">
      <Home />
    </Suspense>
  );
}

export default App;
