import React, { useState } from 'react';
import OrderCard from './OrderCard';

const OrderList = ({ orders, filterStatus }) => {
  const [visibleOrder, setVisibleOrder] = useState(null);
  const uniqueOrders = new Set();

  const toggleFillingBlock = (orderId) => {
    setVisibleOrder((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="orders-list">
      {orders.length === 0 ? (
        <p>Заказы отсутствуют</p>
      ) : (
        orders.slice().reverse()
          .filter((order) => {
            if (uniqueOrders.has(order.numberOrder)) {
              return false;
            }
            uniqueOrders.add(order.numberOrder);
            return true;
          })
          .map((order) => {
            const shouldHide =
              (filterStatus.new && order.statusOrder !== "Новый заказ") ||
              (filterStatus.payment && order.statusOrder !== "Ожидает оплаты") ||
              (filterStatus.assembling && order.statusOrder !== "Собирается") ||
              (filterStatus.delivery && order.statusOrder !== "Доставляется") ||
              (filterStatus.completed && order.statusOrder !== "Завершен");

            return (
              <OrderCard
                key={order.numberOrder}
                order={order}
                shouldHide={shouldHide}
                visibleOrder={visibleOrder}
                toggleFillingBlock={toggleFillingBlock}
              />
            );
          })
      )}
    </div>
  );
};

export default OrderList;
