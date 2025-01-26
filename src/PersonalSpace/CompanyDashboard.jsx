import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./CompanyDashboard.css";

const CompanyDashboard = () => {

  // Запрос на сервер для получения информации о пользователе и компании



  // Тестовые данные
  const mockCompanyData = {
    name: "ООО Ромашка",
    inn: "5903115410",
    phone: "+7 (900) 123-45-67",
    address: "Москва, ул. Примерная, д. 1",
  };

  // Тестовые данные
  const mockUserData = {
    name: "Губин Владимир Сергеевич",
    phone: "+7 (900) 123-45-67",
    email: "gubinva@gmail.com",
  };

  const [companyData, setCompanyData] = useState(null);
  const [companyUserData, setCompanyUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [formDataUser, setFormDataUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const fetchData = async () => {
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 1500)); // Задержка
      setCompanyData(mockCompanyData);
      setFormData(mockCompanyData);
      setCompanyUserData(mockUserData);
      setFormDataUser(mockUserData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setCompanyData(formData);
    setEditing(false);
    // Отправить данные на сервер

  };

  const handleInputChangeUser = (e) => {
    const { name, value } = e.target;
    setFormDataUser({ ...formDataUser, [name]: value });
  };

  const handleSaveUser = () => {
    setCompanyUserData(formDataUser);
    setEditingUser(false);
    // Отправить данные на сервер

  };


  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  return (
    <>
        <Header />
        <div className="company-dashboard">
            {/* Шапка */}
            <div className="cart-component-container cart-component-container__main-block">
              <img src="../../images/cabiten-page-image.jpg" className="cart-main-block__images" />
            </div>
            <div className="container company-dashboard-section__container">
              <div className="company-dashboard-section__left-block">
                  <h1 className="company-dashboard-section__title">Информация о компании:</h1>
                  <div className="company-info">
                      {!editing ? (
                      <>
                          <p><strong>Название компании:</strong> {companyData.name}</p>
                          <p><strong>ИНН:</strong> {companyData.inn}</p>
                          <p><strong>Телефон:</strong> {companyData.phone}</p>
                          <p><strong>Адрес доставки:</strong> {companyData.address}</p>
                          <br /><br />
                          <button onClick={() => setEditing(true)}>Редактировать</button>
                      </>
                      ) : (
                      <div className="edit-form">
                          <label>Название компании:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
                          <label>ИНН:</label>
                            <input type="text" name="inn" value={formData.inn} onChange={handleInputChange}/>
                          <label>Телефон:</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange}/>
                          <label>Адрес:</label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange}/>
                          <br /><br />
                          <button onClick={handleSave}>Сохранить</button>
                          <button onClick={() => setEditing(false)}>Отмена</button>
                      </div>
                      )}
                  </div>
              </div>
              <div className="company-dashboard-section__right-block">
                <h2 className="company-dashboard-section__title">Информация о пользователях:</h2>
                  <div className="company-info">
                    {!editingUser ? (
                      <>
                        <p><strong>Пользователь:</strong> {companyUserData.name}</p>
                        <p><strong>Телефон:</strong> {companyUserData.phone}</p>
                        <p><strong>Email:</strong> {companyUserData.email}</p>
                        <br /><br />
                        <button onClick={() => setEditingUser(true)}>Редактировать</button>
                    </>):
                      (
                        <div className="edit-form">
                          <label>Пользователь:</label>
                            <input type="text" name="name" value={formDataUser.name} onChange={handleInputChangeUser}/>
                          <label>Телефон:</label>
                            <input type="phone" name="phone" value={formDataUser.phone} onChange={handleInputChangeUser}/>
                          <p><strong>Email:</strong> {companyUserData.email}</p>
                          <br /><br />
                          <button onClick={handleSaveUser}>Сохранить</button>
                          <button onClick={() => setEditingUser(false)}>Отмена</button>
                      </div>
                      )}
                  </div>
              </div>
            </div>
        </div>
    </>
  );
};

export default CompanyDashboard;
