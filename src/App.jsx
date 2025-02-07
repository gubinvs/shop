import React from 'react';
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm/RegistrationForm.jsx';
import AuthorizationForm from './RegistrationForm/AuthorizationForm.jsx';
import PersonalSpace from "./PersonalSpace/PersonalSpace.jsx";
import UpdatePassword from "./RegistrationForm/UpdatePassword.jsx";
import Basket from './Basket/Basket.jsx';
import DeliveryAndPayment from "./DeliveryAndPayment/DeliveryAndPayment.jsx";
import DefineUser from "./PersonalSpace/DefineUser.jsx";
import CompanyDashboard from './PersonalSpace/CompanyDashboard.jsx';
import { jwtDecode } from "jwt-decode"; // Установите эту библиотеку: npm install jwt-decode
import Home from './Home/Home.jsx';



function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token); // Декодируем токен
    const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
    return decoded.exp > currentTime; // Проверяем, не истек ли токен
  } catch (error) {
    console.error("Ошибка проверки токена:", error);
    return false; // Если токен невалиден или не может быть декодирован
  }
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Проверяем наличие и действительность токена
  if (token && isTokenValid(token)) {
    return children; // Если токен валиден, рендерим защищенный маршрут
  }

  // Если токен недействителен или отсутствует, перенаправляем на авторизацию
  return <Navigate to="/Autorization" />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Autorization" element={<AuthorizationForm />} />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/Production" element= {
          <ProtectedRoute>
            <PersonalSpace />
          </ProtectedRoute>} />
        <Route path="/Basket" element= {
          <ProtectedRoute>
            <Basket />
          </ProtectedRoute>} />
        <Route path="/DefineUser" element= {
          <ProtectedRoute>
            <DefineUser />
          </ProtectedRoute>} />
          <Route path="/CompanyDashboard" element= {
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>} />
        <Route path="/DeliveryAndPayment" element={<DeliveryAndPayment />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
};

export default App;
