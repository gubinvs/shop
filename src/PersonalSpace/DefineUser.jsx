import React, { useState, useEffect } from "react";
import ApiUrl from '../js/ApiUrl.js';
import "./PersonalSpace.css";
import Header from "../Header/Header.jsx";

const DefineUser = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [personInfo, setPersonInfo] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleOrder, setVisibleOrder] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Собирается');
  // Номер ордера передаваемый на сервер для изменения состояния заявки
  const [selectOrderValue, setSelectOrderValue] = useState(0);
  var admin = false;
  

  // State for checkbox filters
  const [filterStatus, setFilterStatus] = useState({
    new: false,
    assembling: false,
    delivery: false,
    completed: false,
  });

  const handleCheckboxChange = (status) => {
    setFilterStatus((prev) => {
      // Если текущий статус уже выбран, сбрасываем все флажки
      if (prev[status]) {
        return { new: false, assembling: false, delivery: false, completed: false };
      }

      // В противном случае отмечаем только выбранный флажок
      return { new: false, assembling: false, delivery: false, completed: false, [status]: true };
    });
  };

  // Раскрывает состав заказа
  const toggleFillingBlock = (orderId) => {
    setVisibleOrder((prev) => (prev === orderId ? null : orderId));
  };
  
  /// Преобразование числа в рубли
  function formatCurrency(amount) {
    const rubles = Math.floor(amount); // Целая часть числа (рубли)
    const kopecks = Math.round((amount - rubles) * 100); // Дробная часть числа (копейки)

    return `${rubles.toLocaleString("ru-RU")}.${kopecks
      .toString()
      .padStart(2, "0")} руб`; // Форматирование строки
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${ApiUrl}/api/ListOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(localStorage.getItem("token")),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setOrders(data.orders);
        //console.log(data.orders);

        setUserInfo(data.company);
        //console.log(data.company);
        
        setPersonInfo(data.person);
        //console.log(data.person);

        admin = data.person.isAdmin;

      } catch (err) {
        setError("Не удалось загрузить данные");
        console.error(err);
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

  // Отправка сообщения на сервер с номером ордера и его новым состоянием
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const selectOrderValueChange = (event) => {
      setSelectOrderValue(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tokenUser = localStorage.getItem("token");
    const selectData = { tokenUser, selectedOption, selectOrderValue }; // Объект с выбранным значением
    const selectDataJson = JSON.stringify(selectData);
    
    try {
      const response = await fetch(`${ApiUrl}/api/ChangeOrderStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  (selectDataJson),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных');
      }

      const result = await response.json();
      //console.log('Ответ сервера:', result);

      // Обновляем текущую страницу
      window.location.reload();

    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="define-user-page define-user-page__container">
        <div className="cart-component-container cart-component-container__main-block">
          <img src="../../images/orders-page-images.jpg" className="cart-main-block__images" />
        </div>

        <h1>Заказы компании:</h1>
        <div className="container user-info-container">
        <div className="user-info">
{console.log(userInfo)}


          {Array.isArray(userInfo) ? (
            userInfo.map((com) => (
              com.guidIdCompany == 
              <p key={com.id || com.nameCompany}>
                <strong>Компания:</strong> {com.nameCompany || "Нет данных о компании"}
              </p>
            ))
          ) : (
            <p>
              <strong>Компания:</strong>{" "}
              {userInfo?.nameCompany || "Нет данных о компании"}
            </p>
          )}
          <p>
            <strong>Пользователь:</strong>{" "}
            {personInfo?.nameUser || "Нет данных о пользователе"}
          </p>
        </div>

          <ul className="filter-block__list">
            <li className="filter-block__item">
                <div><strong>Новый заказ</strong></div>
                <input
                type="checkbox"
                className="filter-block__check"
                checked={filterStatus.new}
                onChange={() => handleCheckboxChange("new")}
              />
            </li>
             <li className="filter-block__item">
                <div><strong>Собирается</strong></div>
                <input
                  type="checkbox"
                  className="filter-block__check"
                  checked={filterStatus.assembling}
                  onChange={() => handleCheckboxChange("assembling")}
                />
              </li>
              <li className="filter-block__item">
                <div><strong>Доставляется</strong></div>
                <input
                  type="checkbox"
                  className="filter-block__check"
                  checked={filterStatus.delivery}
                  onChange={() => handleCheckboxChange("delivery")}
                />
              </li>
            <li className="filter-block__item">
              <div><strong>Завершен</strong></div>
              <input
                type="checkbox"
                className="filter-block__check"
                checked={filterStatus.completed}
                onChange={() => handleCheckboxChange("completed")}
              />
            </li>
          </ul>
        </div>
        <div className="container orders-list-container">
          <div className="orders-list">
              {orders.length === 0 ? (
                  <p>Заказы отсутствуют</p>
              ) : (
                  (() => {
                      // Множество для хранения уникальных ID
                      const uniqueOrders = new Set(); 
                      return orders
                          // Отфильтровали по уникальному номкру заказа
                          .filter((order) => {
                              if (uniqueOrders.has(order.numberOrder)) {
                                  return false; // Пропустить, если ID уже добавлен
                              }
                              uniqueOrders.add(order.numberOrder);
                              return true; // Добавить в список для отображения
                          })
                          .map((order) => {
                            // Проверяем, скрывать ли заказ  
                            const shouldHide =
                              (filterStatus.new && order.statusOrder !== "Новый заказ") ||
                              (filterStatus.assembling && order.statusOrder !== "Собирается") ||
                              (filterStatus.delivery && order.statusOrder !== "Доставляется") ||
                              (filterStatus.completed && order.statusOrder !== "Завершен");
                              return (
                                  <>
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
                                                    {orders.map((item) => (order.numberOrder === item.numberOrder ? 
                                                                              <div key={item.id} className="filling-order-table">
                                                                                <div className="filling-order-table__item filling-order-table__item_id">
                                                                                  {item.id}
                                                                                </div>
                                                                                <div className="filling-order-table__item filling-order-table__item_vendor">
                                                                                  {item.vendorCode}
                                                                                </div>
                                                                                <div className="filling-order-table__item filling-order-table__item_name">
                                                                                  {item.nameItem}
                                                                                </div>
                                                                                <div className="filling-order-table__item filling-order-table__item_quantity">
                                                                                  {item.quantityItem}
                                                                                </div>
                                                                                <div className="filling-order-table__item filling-order-table__item_price">
                                                                                  {formatCurrency(item.priceItem * item.quantityItem)}
                                                                                </div>
                                                                              </div>
                                                                              : ""
                                                                            ))}
                                                  </div>
                                                <div className="admin-block" style={admin===true ? {display: "none"} : {display: "flex"} }>
                                                  <form className="admin-block__select-block" onSubmit={handleSubmit}>
                                                      <select className="admin-block__select" id="select" value={selectedOption} onChange={handleChange}>
                                                            <option className="admin-block__option" value="Собирается">Собирается</option>
                                                            <option className="admin-block__option" value="Доставляется">Доставляется</option>
                                                            <option className="admin-block__option" value="Завершен">Завершен</option>
                                                      </select>
                                                      <button className="admin-block__button" type="submit" onClick={() => selectOrderValueChange(order.numberOrder)}>Изменить статус заказа</button>
                                                      
                                                  </form>
                                                </div>
                                        </>
                                          
                                        )}
                                    </div>
                                  </>
                              );
                          });
                  })()
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DefineUser;