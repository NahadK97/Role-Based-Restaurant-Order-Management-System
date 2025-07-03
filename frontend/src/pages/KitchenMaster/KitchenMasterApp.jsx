import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import OrdersBoard from './OrdersBoard';
import './KitchenMaster.css'; // Updated import

const KitchenMasterApp = ({ restaurantId }) => {
  const [orders, setOrders] = useState([]);

  const sortOrder = {
    placed: 1,
    preparing: 2,
    ready: 3,
    delivered: 4,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/${restaurantId}/orders`);
        const sorted = response.data.sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);
        setOrders(sorted);
      } catch (err) {
        console.error('Error fetching orders:', err);
        alert('Failed to load orders from server.');
      }
    };

    fetchOrders();
  }, [restaurantId]);

  const updateStatus = async (table, newStatus) => {
    try {
      setOrders(prev =>
        prev
          .map(order => (order.tableNo === table ? { ...order, status: newStatus } : order))
          .filter(order => order.status !== 'delivered')
      );

      await axios.patch(`http://localhost:4000/api/${restaurantId}/orders/edit/${table}`, {
        status: newStatus,
      });
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update status');
    }
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <OrdersBoard orders={orders} updateStatus={updateStatus} />
      </main>
    </>
  );
};

export default KitchenMasterApp;
