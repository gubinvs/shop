import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ApiUrl from "./js/ApiUrl.js";
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
import ApiDiscription from "./ApiDiscription/ApiDiscription.jsx";
import AdminPanel from "./AdminPanel/AdminPanel.jsx";
import { jwtDecode } from "jwt-decode";
import SearchResults from "./Header/SearchResults.jsx";
import { loadNomenclature} from "./js/nomenclatureStore";


// ===== Проверка токена =====
function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Ошибка проверки токена:", error);
    return false;
  }
}

// ===== Базовый защищённый маршрут (только авторизованные пользователи) =====
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

  if (loading) return <div>Загрузка...</div>;

  return isAuthenticated ? children : <Navigate to="/Authorization" replace />;
}

// ===== Защищённый маршрут только для администратора =====
function AdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !isTokenValid(token)) {
      setLoading(false);
      return;
    }

    fetch(ApiUrl + "/api/DefineUserGuidId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
      },
      body: JSON.stringify({ token }), // передаём токен в теле
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }
        return await res.json();
      })
      .then((data) => {
        const userGuid = data.message;
        const adminGuid = "401694e4-1b16-4b8c-b817-f8a37a4f49dc";
        if (userGuid === adminGuid) {
          setIsAdmin(true);
        }
      })
      .catch((err) => console.error("Ошибка получения GUID:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Проверка прав доступа...</div>;

  return isAdmin ? children : <Navigate to="/" replace />;
}



// Загружаем всю номенклатуру в фоне
useEffect(() => {
  loadNomenclature().then(() => {
    setReady(true);
  });
}, []);


// ===== Основное приложение =====
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Только для администратора */}
        <Route
          path="/AdminPanel"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route path="/SearchResults" element={<SearchResults />} />
        <Route path='/ApiDiscription' element={<ApiDiscription />} />
        <Route path="/Authorization" element={<AuthorizationForm />} />
        <Route path="/Registration" element={<RegistrationForm />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/CatalogSection" element={<CatalogSection />} />
        <Route path="/DeliveryAndPayment" element={<DeliveryAndPayment />} />

        {/* Только для авторизованных */}
        <Route
          path="/Personal"
          element={
            <ProtectedRoute>
              <PersonalSpace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Basket"
          element={
            <ProtectedRoute>
              <Basket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DefineUser"
          element={
            <ProtectedRoute>
              <DefineUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CompanyDashboard"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;