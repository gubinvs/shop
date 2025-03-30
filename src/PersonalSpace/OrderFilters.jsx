// OrderFilters.jsx
import React from 'react';

const OrderFilters = ({ filterStatus, setFilterStatus }) => {

  const handleCheckboxChange = (status) => {
      setFilterStatus((prev) => {
          // Если текущий статус уже выбран, сбрасываем все флажки
          if (prev[status]) {
          return { new: false, payment: false, assembling: false, delivery: false, completed: false };
          }

          // В противном случае отмечаем только выбранный флажок
          return { new: false, payment: false, assembling: false, delivery: false, completed: false, [status]: true };
      });
  };

  return (
    <>
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
            <div><strong>Ожидает оплаты</strong></div>
            <input
            type="checkbox"
            className="filter-block__check"
            checked={filterStatus.payment}
            onChange={() => handleCheckboxChange("payment")}
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
    </>
  );
};

export default OrderFilters;
