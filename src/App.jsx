import React from 'react';
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegistrationForm.jsx';
import AuthorizationForm from './RegistrationForm/AuthorizationForm.jsx';
import PersonalSpace from "./PersonalSpace/PersonalSpace.jsx";
import UpdatePassword from "./RegistrationForm/UpdatePassword.jsx";

const Home = () => <h1>Главная страница</h1>;


// Функция проверки токена, проверяет аутентификацию перед загрузкой страницы
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/Autorization" />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Autorization" element={<AuthorizationForm />} />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/Personal" element= {
          <ProtectedRoute>
            <PersonalSpace />
          </ProtectedRoute>} />
        <Route path="/Basket" element= {
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
};

export default App;
