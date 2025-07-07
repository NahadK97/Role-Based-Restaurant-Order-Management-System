import { Plus } from "lucide-react";
import { socket } from "../../socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../api/waiter-api/fetchOrders";
import OrderCard from "../../components/waiter-components/OrderCard";
import { useAuthContext } from "../../hooks/useAuthContext";
const OrdersPage = () => {
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const placeOrder = () => {
    navigate('/waiter/place-order', { state: { from: 'orders page' } });
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await fetchOrders(user.RID, user.token);
        setOrderList(orders);
      } catch (err) {
        alert("could not fetch orders");
      }
    };
    getOrders();

    const handleStatusChange = ({ tableNo, newStatus }) => {
    setOrderList((prev) =>
      prev.map((order) =>
        order.tableNo === parseInt(tableNo) ? { ...order, status: newStatus } : order
      )
    );
  };

  socket.on("order-status-changed", handleStatusChange);

  return () => {
    socket.off("order-status-changed", handleStatusChange);
  };
  }, []);

  return (
    <div className="orders-page-wrapper">
      <h1 className="orders-page-title">Orders</h1>
      {orderList.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
      <button onClick={placeOrder} className="new-order-button">
        New Order <Plus className="new-order-icon" />
      </button>
    </div>
  );
};

export default OrdersPage;
