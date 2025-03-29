// OrderFilters.jsx
import React from 'react';

const OrderFilters = ({ filterStatus, handleCheckboxChange }) => {
  return (
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
  );
};

export default OrderFilters;
