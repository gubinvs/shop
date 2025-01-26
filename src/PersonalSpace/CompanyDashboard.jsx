import React, { useState, useEffect, useMemo } from "react";
import Header from "../Header/Header";
import "./CompanyDashboard.css";
import ApiUrl from "../js/ApiUrl";

const CompanyDashboard = () => {
  const [companyData, setCompanyData] = useState(null);
  const [companyUserData, setCompanyUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [formDataUser, setFormDataUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const param = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/CompanyInformation/${param}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.company && data.user) {
          setCompanyData({
            name: data.company.nameCompany || "",
            inn: data.company.innCompany || "",
            address: data.company.adressCompany || "",
            phone: data.company.phoneCompany || "",
          });

          setCompanyUserData({
            name: data.user.nameUser || "",
            phone: data.user.phoneUser || "",
            email: data.user.email || "",
          });

          setFormData({
            name: data.company.nameCompany || "",
            inn: data.company.innCompany || "",
            address: data.company.adressCompany || "",
            phone: data.company.phoneCompany || "",
          });

          setFormDataUser({
            name: data.user.nameUser || "",
            phone: data.user.phoneUser || "",
            email: data.user.email || "",
          });
        } else {
          throw new Error("Некорректные данные от API");
        }
      } catch (error) {
        console.error(error);
        setError("Ошибка загрузки данных. Попробуйте снова.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param]);

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    setCompanyData(formData);
    setEditing(false);
    // Отправить данные на сервер для изменения данных о компании
    fetch(ApiUrl + "/api/EditCompanyData", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  const handleSaveUser = () => {
    setCompanyUserData(formDataUser);
    setEditingUser(false);
    // Отправить данные на сервер для изменения данных о компании
    fetch(ApiUrl + "/api/EditUserData", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: formDataUser,
    });


  };

  const handleCancel = () => {
    setFormData(companyData);
    setEditing(false);
  };

  const handleCancelUser = () => {
    setFormDataUser(companyUserData);
    setEditingUser(false);
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <Header />
      <div className="company-dashboard">
        <div className="cart-component-container cart-component-container__main-block">
          <img src="../../images/cabiten-page-image.jpg" className="cart-main-block__images" alt="Company Dashboard" />
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
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, setFormData)}
                  />
                  <label>ИНН:</label>
                  <input
                    type="text"
                    name="inn"
                    value={formData.inn}
                    onChange={(e) => handleInputChange(e, setFormData)}
                  />
                  <label>Телефон:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e, setFormData)}
                  />
                  <label>Адрес:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange(e, setFormData)}
                  />
                  <br /><br />
                  <button onClick={handleSave}>Сохранить</button>
                  <button onClick={handleCancel}>Отмена</button>
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
                </>
              ) : (
                <div className="edit-form">
                  <label>Пользователь:</label>
                  <input
                    type="text"
                    name="name"
                    value={formDataUser.name}
                    onChange={(e) => handleInputChange(e, setFormDataUser)}
                  />
                  <label>Телефон:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formDataUser.phone}
                    onChange={(e) => handleInputChange(e, setFormDataUser)}
                  />
                  <p><strong>Email:</strong> {companyUserData.email}</p>
                  <br /><br />
                  <button onClick={handleSaveUser}>Сохранить</button>
                  <button onClick={handleCancelUser}>Отмена</button>
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