import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegistrationForm.jsx'

const Home = () => <h1>Главная страница</h1>;
const Autorization = () => <h1>Авторизация</h1>;


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Autorization" element={<Autorization />} />
        <Route path="/Registration" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
