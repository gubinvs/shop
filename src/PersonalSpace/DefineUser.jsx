import React, { useState, useEffect } from "react";
import "./defineUser.css";
import ApiUrl from '../js/ApiUrl.js';
import "./PersonalSpace.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import FullOrderInformation from "./FullOrderInformation.jsx";

const DefineUser = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [personInfo, setPersonInfo] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleOrder, setVisibleOrder] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Собирается');
  const [selectOrderValue, setSelectOrderValue] = useState(0);
  const [admin, setAdmin] = useState(false);

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

  // Настройка фильтрации заказов
  const [filterStatus, setFilterStatus] = useState({
    new: true,
    payment: false,
    assembling: false,
    delivery: false,
    completed: false,
  });

  const handleCheckboxChange = (status) => {
    setFilterStatus((prev) => {
      if (prev[status]) {
        return { new: false, payment: false, assembling: false, delivery: false, completed: false };
      }
      return { new: false, payment: false, assembling: false, delivery: false, completed: false, [status]: true };
    });
    setCurrentPage(1); // сбрасываем на первую страницу при смене фильтра
  };

  const toggleFillingBlock = (orderId) => {
    setVisibleOrder((prev) => (prev === orderId ? null : orderId));
  };

  function formatCurrency(amount) {
    const rubles = Math.floor(amount);
    const kopecks = Math.round((amount - rubles) * 100);
    return `${rubles.toLocaleString("ru-RU")}.${kopecks.toString().padStart(2, "0")} руб`;
  }

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
        setAdmin(data.person.isAdmin);

      } catch (err) {
        setError("Не удалось загрузить данные");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => setSelectedOption(event.target.value);
  const selectOrderValueChange = (event) => setSelectOrderValue(event);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tokenUser = localStorage.getItem("token");
    const selectData = { tokenUser, selectedOption, selectOrderValue };
    try {
      const response = await fetch(`${ApiUrl}/api/ChangeOrderStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectData),
      });
      if (!response.ok) throw new Error('Ошибка при отправке данных');
      const result = await response.json();
      window.location.reload();
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };

  if (loading) return (
    <div className="loading-wrapper">
      <div className="spinner"></div>
      <p>Загрузка данных...</p>
    </div>
  );

  if (error) return  <div className="container define-user-page__container">Необходима верификация! {window.location.href = "/Authorization"}</div>;

  // Фильтруем уникальные заказы
  const filteredOrders = orders.slice().reverse()
    .filter((order, index, self) =>
      index === self.findIndex((o) => o.numberOrder === order.numberOrder)
    )
    .filter((order) => {
      return (
        (filterStatus.new && order.statusOrder !== "Новый заказ") ||
        (filterStatus.payment && order.statusOrder !== "Ожидает оплаты") ||
        (filterStatus.assembling && order.statusOrder !== "Собирается") ||
        (filterStatus.delivery && order.statusOrder !== "Доставляется") ||
        (filterStatus.completed && order.statusOrder !== "Завершен")
      ) ? false : true;
    });

  // Пагинация
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  return (
    <>
      <Header />
      <div className="define-user-page define-user-page__container">
        <div className="cart-component-container cart-component-container__main-block">
          <img src="../../images/orders-page-images.jpg" className="cart-main-block__images" />
        </div>

        <div className="container">
          <h1>Заказы компании:</h1>
        </div>

        <div className="container user-info-container">
          <div className="user-info">
            {Array.isArray(userInfo) ? (
              userInfo.map((com) => (
                <p key={com.id || com.nameCompany}>
                  <strong>Компания:</strong> {com.nameCompany || "Нет данных о компании"}
                </p>
              ))
            ) : (
              <p>
                <strong>Компания:</strong> {userInfo?.nameCompany || "Нет данных о компании"}
              </p>
            )}
            <p><strong>Пользователь:</strong> {personInfo?.nameUser || "Нет данных о пользователе"}</p>
          </div>

          <ul className="filter-block__list">
            {["new", "payment", "assembling", "delivery", "completed"].map((status) => (
              <li key={status} className="filter-block__item">
                <div><strong>{
                  status === "new" ? "Новый заказ" :
                  status === "payment" ? "Ожидает оплаты" :
                  status === "assembling" ? "Собирается" :
                  status === "delivery" ? "Доставляется" :
                  "Завершен"
                }</strong></div>
                <input
                  type="checkbox"
                  className="filter-block__check"
                  checked={filterStatus[status]}
                  onChange={() => handleCheckboxChange(status)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="container orders-list-container">
          <div className="orders-list">
            {currentOrders.length === 0 ? (
              <p>Заказы отсутствуют</p>
            ) : currentOrders.map((order) => {
              const shouldHide =
                (filterStatus.new && order.statusOrder !== "Новый заказ") ||
                (filterStatus.payment && order.statusOrder !== "Ожидает оплаты") ||
                (filterStatus.assembling && order.statusOrder !== "Собирается") ||
                (filterStatus.delivery && order.statusOrder !== "Доставляется") ||
                (filterStatus.completed && order.statusOrder !== "Завершен");
              return (
                <div key={order.numberOrder} style={{ display: shouldHide ? "none" : "block" }}>
                  <div className="order-card" onClick={() => toggleFillingBlock(order.numberOrder)} style={{ cursor: "pointer" }}>
                    <div className="order-card__name">
                      <p><strong>Заказ №:</strong> {order.numberOrder}</p>
                      <p><strong>Дата:</strong> {order.dataOrder ? new Date(order.dataOrder).toLocaleDateString("ru-RU") : "Дата неизвестна"}</p>
                    </div>
                    <span className={`status ${order.statusOrder?.toLowerCase() || "unknown"}`}>{order.statusOrder || "Неизвестный статус"}</span>
                  </div>

                  {visibleOrder === order.numberOrder && (
                    <>
                      <div className="filling-block">
                        <div className="filling-order-table__title"><strong>Наполнение заказа:</strong></div>
                        <div className="filling-order-table">
                          <div className="filling-order-table__item filling-order-table__item_id"><strong>ID</strong></div>
                          <div className="filling-order-table__item filling-order-table__item_vendor"><strong>Артикул</strong></div>
                          <div className="filling-order-table__item filling-order-table__item_name"><strong>Наименование</strong></div>
                          <div className="filling-order-table__item filling-order-table__item_quantity"><strong>Кол-во</strong></div>
                          <div className="filling-order-table__item filling-order-table__item_price"><strong>Цена</strong></div>
                        </div>

                        {orders.map((item) => order.numberOrder === item.numberOrder ? (
                          <div key={item.id} className="filling-order-table">
                            <div className="filling-order-table__item filling-order-table__item_id">{item.id}</div>
                            <div className="filling-order-table__item filling-order-table__item_vendor">{item.vendorCode}</div>
                            <div className="filling-order-table__item filling-order-table__item_name">{item.nameItem}</div>
                            <div className="filling-order-table__item filling-order-table__item_quantity">{item.quantityItem}</div>
                            <div className="filling-order-table__item filling-order-table__item_price">{formatCurrency(item.priceItem * item.quantityItem)}</div>
                          </div>
                        ) : null)}
                      </div>

                      <div className="admin-block" style={admin ? {display: "flex"} : {display: "none"}}>
                        <button className="admin-block__button" onClick={() => FullOrderInformation(order.numberOrder)}>Полная информация о заказе</button>
                        <form className="admin-block__select-block" onSubmit={handleSubmit}>
                          <select className="admin-block__select" value={selectedOption} onChange={handleChange}>
                            <option value="Ожидает оплаты">Ожидает оплаты</option>
                            <option value="Собирается">Собирается</option>
                            <option value="Доставляется">Доставляется</option>
                            <option value="Завершен">Завершен</option>
                          </select>
                          <button className="admin-block__button" type="submit" onClick={() => selectOrderValueChange(order.numberOrder)}>Изменить статус заказа</button>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="pagination__button" onClick={handlePrevPage} disabled={currentPage === 1}>Предыдущая</button>
              <span className="pagination__info"> Страница {currentPage} из {totalPages} </span>
              <button className="pagination__button" onClick={handleNextPage} disabled={currentPage === totalPages}>Следующая</button>
              <select className="pagination__select" value={ordersPerPage} onChange={(e) => { setOrdersPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5 на странице</option>
                <option value={10}>10 на странице</option>
                <option value={20}>20 на странице</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DefineUser;
