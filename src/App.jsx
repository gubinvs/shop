import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegistrationForm.jsx';
import AuthorizationForm from './RegistrationForm/AuthorizationForm.jsx';
import PersonalSpace from "./PersonalSpace/PersonalSpace.jsx";
import UpdatePassword from "./RegistrationForm/UpdatePassword.jsx";

const Home = () => <h1>Главная страница</h1>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Autorization" element={<AuthorizationForm />} />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/Personal" element={<PersonalSpace />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
};

export default App;
