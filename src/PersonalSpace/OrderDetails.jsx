// OrderDetails.jsx
import React from 'react';
import { formatCurrency } from './formatCurrency'; // Функция для форматирования валюты

const OrderDetails = ({ order }) => {
  console.log(order);
  return (
    <div className="filling-block">
      <div className="filling-order-table__title"><strong>Наполнение заказа:</strong></div>
      <div className="filling-order-table">
        <div className="filling-order-table__item filling-order-table__item_id"><strong>ID</strong></div>
        <div className="filling-order-table__item filling-order-table__item_vendor"><strong>Артикул</strong></div>
        <div className="filling-order-table__item filling-order-table__item_name"><strong>Наименование</strong></div>
        <div className="filling-order-table__item filling-order-table__item_quantity"><strong>Кол-во</strong></div>
        <div className="filling-order-table__item filling-order-table__item_price"><strong>Цена</strong></div>
      </div>
      {order.map((item) => (
        <div key={item.id} className="filling-order-table">
          <div className="filling-order-table__item filling-order-table__item_id">{item.id}</div>
          <div className="filling-order-table__item filling-order-table__item_vendor">{item.vendorCode}</div>
          <div className="filling-order-table__item filling-order-table__item_name">{item.nameItem}</div>
          <div className="filling-order-table__item filling-order-table__item_quantity">{item.quantityItem}</div>
          <div className="filling-order-table__item filling-order-table__item_price">{formatCurrency(item.priceItem * item.quantityItem)}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
