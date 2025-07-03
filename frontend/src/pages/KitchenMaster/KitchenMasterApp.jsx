import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import OrdersBoard from './OrdersBoard';
import { useAuthContext } from '../../hooks/useAuthContext';
import './KitchenMaster.css';

const KitchenMaster = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);

  const sortOrder = {
    placed: 1,
    preparing: 2,
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/${user.RID}/orders`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const filtered = response.data.filter(order =>
        order.status === 'placed' || order.status === 'preparing'
      );

      const sorted = filtered.sort(
        (a, b) => sortOrder[a.status] - sortOrder[b.status]
      );

      setOrders(sorted);
    } catch (err) {
      console.error('Error fetching orders:', err);
      alert('Failed to load orders from server.');
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (tableNo, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/${user.RID}/orders/edit/${tableNo}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setOrders(prev =>
        prev
          .map(order =>
            order.tableNo === tableNo ? { ...order, status: newStatus } : order
          )
          .filter(order => newStatus !== 'prepared')
      );
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
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

export default KitchenMaster;
