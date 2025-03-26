import React from 'react';
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home.jsx';
import RegistrationForm from './RegistrationForm/RegistrationForm.jsx';
import AuthorizationForm from './RegistrationForm/AuthorizationForm.jsx';
import Basket from './Basket/Basket.jsx';
import DeliveryAndPayment from "./DeliveryAndPayment/DeliveryAndPayment.jsx";
import DefineUser from "./PersonalSpace/DefineUser.jsx";
import CompanyDashboard from './PersonalSpace/CompanyDashboard.jsx';
import PersonalSpace from "./PersonalSpace/PersonalSpace.jsx";
import UpdatePassword from "./RegistrationForm/UpdatePassword.jsx";
import CatalogSection from "./CatalogSection/CatalogSection.jsx";
import ApiDiscription from "./ApiDiscription/ApiDiscription.jsx"
import { jwtDecode } from "jwt-decode"; // Установите эту библиотеку: npm install jwt-decode



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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Загрузка...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/Authorization" replace />;
}


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/ApiDiscription' element={<ApiDiscription />}/>
        <Route path="/Authorization" element={<AuthorizationForm />} />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/CatalogSection" element={<CatalogSection />} />
        <Route path="/Personal" element= {
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
      </Routes>
    </Router>
  );
};

export default App;