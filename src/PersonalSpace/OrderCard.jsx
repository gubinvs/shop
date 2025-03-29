// OrderCard.jsx
import React from 'react';
import OrderDetails from './OrderDetails';

const OrderCard = ({ order, shouldHide, visibleOrder, toggleFillingBlock }) => {
  return (
    <div style={{ display: shouldHide ? "none" : "block" }}>
      <div className="order-card" onClick={() => toggleFillingBlock(order.numberOrder)} style={{ cursor: "pointer" }}>
        <div className="order-card__name">
          <p><strong>Заказ №:</strong> {order.numberOrder}</p>
          <p><strong>Дата:</strong> {order.dataOrder ? new Date(order.dataOrder).toLocaleDateString("ru-RU") : "Дата неизвестна"}</p>
        </div>
        <span className={`status ${order.statusOrder?.toLowerCase() || "unknown"}`}>{order.statusOrder || "Неизвестный статус"}</span>
      </div>
      {visibleOrder === order.numberOrder && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderCard;
