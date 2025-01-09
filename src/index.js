import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RegistrationForm from './RegistrationForm/RegistrationForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RegistrationForm />
  </React.StrictMode>
);

reportWebVitals();
