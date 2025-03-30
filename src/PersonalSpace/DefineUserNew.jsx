import React, { useState, useEffect } from "react";
import ApiUrl from "../js/ApiUrl.js";
import "./PersonalSpace.css";
import Header from "../Header/Header.jsx";
import UserInfo from "./UserInfo.jsx";
import OrderFilters from "./OrderFilters.jsx";
import OrderList from "./OrderList.jsx";

const DefineUser = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [personInfo, setPersonInfo] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleOrder, setVisibleOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState({
    new: false,
    assembling: false,
    delivery: false,
    completed: false,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${ApiUrl}/api/ListOrder`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(localStorage.getItem("token")),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setOrders(data.orders);
        setUserInfo(data.company);
        setPersonInfo(data.person);
      } catch (err) {
        setError("Не удалось загрузить данные");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading-wrapper"><div className="spinner"></div><p>Загрузка данных...</p></div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <Header />
      <div className="container define-user-page define-user-page__container">
        <div className="cart-component-container cart-component-container__main-block">
          <img src="../../images/orders-page-images.jpg" className="cart-main-block__images" />
        </div>
        <div className="container user-info-container">
          <UserInfo userInfo={userInfo} personInfo={personInfo} />
          <OrderFilters filterStatus={filterStatus} setFilterStatus={setFilterStatus} /> 
        </div>
        <OrderList orders={orders} visibleOrder={visibleOrder} setVisibleOrder={setVisibleOrder} filterStatus={filterStatus} />
      </div>
    </>
  );
};

export default DefineUser;
