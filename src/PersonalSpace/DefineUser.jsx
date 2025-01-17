import React, { useState, useEffect } from "react";
import ApiUrl from '../js/ApiUrl.js';
import "./PersonalSpace.css";
import Header from "../Header/Header.jsx";


const DefineUser =() => {
// Тестовые данные
  const mockUser = {
        name: "Иван Иванов",
        email: "ivan.ivanov@example.com",
    };

    const mockOrders = [
        {
        id: 11223333,
        date: "2025-01-01",
        status: "Доставлен",
        },
        {
        id: 21313313,
        date: "2025-01-05",
        status: "Ожидает отправки",
        },
        {
        id: 31313334,
        date: "2025-01-10",
        status: "Отменён",
        },
    ];

  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Имитация загрузки данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Задержка для имитации запроса
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUserInfo(mockUser);
        setOrders(mockOrders);
      } catch (err) {
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  if (error) return <div>Ошибка: {error}</div>;

    
    return (
        <>
            <Header/>
            <div className="define-user-page define-user-page__container">
                {/* Шапка */}
                <div className="cart-component-container cart-component-container__main-block">
                  <img src="../../images/orders-page-images.jpg" className="cart-main-block__images" />
                </div>
                <h1>Заказы компании:</h1>
                {/* Информация о пользователе */}
                <div className="container user-info-container">
                    <div className="user-info">
                        <p><strong>Имя:</strong> Иван Иванов</p>
                        <p><strong>Email:</strong> ivan.ivanov@example.com</p>
                    </div>
                    <div className="user-info user-dashboard">
                        <div className="dashboard-info">
                                <p><strong>Доставлено:</strong></p>
                                <div className="dashboard-info__result">4</div>
                        </div>
                        <div className="dashboard-info">
                                <p><strong>В работе:</strong></p>
                                <div className="dashboard-info__result dashboard-info__result_2">4</div>
                        </div>
                        <div className="dashboard-info">
                                <p><strong>Отменено:</strong></p>
                                <div className="dashboard-info__result dashboard-info__result_3">4</div>
                        </div>
                    </div>
                </div>

                {/* Список заказов */}
                <div className="container orders-list-container">
                    <div className="orders-list">
                        {orders.length === 0 ? (
                            <p>Заказы отсутствуют</p>
                        ) : (
                        orders.map((order) => (
                            <div key={order.id} className="order-card">
                                <div className="order-card__name">
                                    <p><strong>Заказ №:</strong> {order.id}</p>
                                    <p><strong>Дата:</strong> {order.date}</p> 
                                </div>
                                <span className={`status ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div>
                        ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DefineUser;