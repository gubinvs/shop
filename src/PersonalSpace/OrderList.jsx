// OrderList.jsx
import React from 'react';
import OrderCard from './OrderCard';

const OrderList = ({ orders, filterStatus, toggleFillingBlock, visibleOrder }) => {
  const uniqueOrders = new Set();

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
