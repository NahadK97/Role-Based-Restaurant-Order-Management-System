import React from 'react';
import DishCard from './DishCard';

const OrdersBoard = ({ orders, updateStatus }) => {
  const createButton = (label, className, onClick) => (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div id="orders">
      {orders.map(order => (
        <div key={order.tableNo} className="order-card" data-status={order.status}>
          <div className="order-header">
            <strong>Table {order.tableNo}</strong>
            <em className={`status-label ${order.status}`}>{order.status}</em>
          </div>

          <div className="order-items">
            {order.list.map((item, idx) => (
              <DishCard
                key={idx}
                name={item.name}
                quantity={item.quantity}
                description={item.description}
              />
            ))}
          </div>

          <div className="buttons">
            {order.status === 'placed' &&
              createButton('Accept', 'accept', () =>
                updateStatus(order.tableNo, 'preparing')
              )}
            {order.status === 'preparing' &&
              createButton('Prepared', 'ready', () =>
                updateStatus(order.tableNo, 'prepared')
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersBoard;
