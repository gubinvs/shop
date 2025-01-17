import React, { useState, useEffect } from "react";
import Header from "../Header/Header";

const CompanyDashboard = () => {
  // Тестовые данные
  const mockCompanyData = {
    name: "ООО Ромашка",
    email: "contact@romashka.com",
    phone: "+7 (900) 123-45-67",
    address: "Москва, ул. Примерная, д. 1",
    logo: null, // URL логотипа компании (по умолчанию пусто)
  };

  const [companyData, setCompanyData] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Задержка
      setCompanyData(mockCompanyData);
      setFormData(mockCompanyData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, logo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setCompanyData(formData);
    setEditing(false);
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
            <div className="define-user-page__header">
                <div className="container dup-header__container">
                    <h1>Личный кабинет компании</h1>
                    <button>Выйти</button>
                </div>
            </div>

            <div className="company-info">
                {!editing ? (
                <>
                    <div className="company-logo">
                    {companyData.logo ? (
                        <img src={companyData.logo} alt="Логотип компании" />
                    ) : (
                        <div className="placeholder-logo">Логотип отсутствует</div>
                    )}
                    </div>
                    <p><strong>Название:</strong> {companyData.name}</p>
                    <p><strong>Email:</strong> {companyData.email}</p>
                    <p><strong>Телефон:</strong> {companyData.phone}</p>
                    <p><strong>Адрес:</strong> {companyData.address}</p>
                    <button onClick={() => setEditing(true)}>Редактировать</button>
                </>
                ) : (
                <div className="edit-form">
                    <label>
                    Название:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>
                    Телефон:
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>
                    Адрес:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    </label>
                    <label>
                    Логотип:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                    />
                    </label>
                    {formData.logo && (
                    <div className="preview-logo">
                        <img src={formData.logo} alt="Превью логотипа" />
                    </div>
                    )}
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={() => setEditing(false)}>Отмена</button>
                </div>
                )}
            </div>
        </div>
    </>
  );
};

export default CompanyDashboard;
