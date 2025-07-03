import axios from "axios";
import { useEffect, useState } from "react";
import { fetchMenu } from "../../api/waiter-api/fetchMenu";
import { useAuthContext } from "../../hooks/useAuthContext";
import CalcTotal from "../../utils/waiter-utils/CalcTotal";
import DishCard from "./DishCard";
const OrderCard = ({ order }) => {
  const [status, setStatus] = useState(order.status);
  const [buttonClass, setButtonClass] = useState(null);
  const [buttonText, setButtonText] = useState(null);
  const {user} = useAuthContext();
  useEffect(() => {
    if (status === "prepared") {
      setButtonClass("order-card-btn orange-btn");
      setButtonText("Lock");
    } else if (status === "locked") {
      setButtonClass("order-card-btn violet-btn");
      setButtonText("Done");
    } else {
      setButtonClass("order-card-btn gray-btn");
      setButtonText("Lock");
    }
  }, [status]);

  const handleButtonClick = async () => {
    if (status === "placed" || status === "preparing") return;

    if (status === "prepared") {
      try {
        await axios.patch(`http://localhost:4000/api/${user.RID}/orders/edit/${order.tableNo}`, {
          status: "locked",
        }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
        setStatus("locked");
      } catch {
        alert("could not lock order!");
      }
    } else if (status === "locked") {
      try {
        const checkResponse = await axios.get(
          `http://localhost:4000/api/${user.RID}/tables/${order.tableNo}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
        );
        
      
        
        const orders = order.list.map((item) => ({
          name: item.name,
          quantity: item.quantity,
        }));
        const menu = await fetchMenu(user.RID, user.token);
        
        const total = await CalcTotal(
          orders,
          menu.flatMap((cat) => cat.dishes)
        );
        
        if (checkResponse.data) {          
          await axios.patch(
            `http://localhost:4000/api/${user.RID}/tables/${order.tableNo}/edit`,
            { orders, total }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
          );
        } else {
          await axios.post(`http://localhost:4000/api/${user.RID}/tables`, {
            RID : user.RID,
            tableNo: order.tableNo,
            total,
            orders,
          }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
        }

        await axios.delete(
          `http://localhost:4000/api/${user.RID}/orders/delete/${order.tableNo}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
        );
      } catch(error) {
        console.log(error);
        
        alert("could not finish the process");
      }
    }
  };

  return (
    <div className="order-card-wrapper">
      <div className="order-card-header">
        <h3 className="order-card-table">Table {order.tableNo}</h3>
        <button className={buttonClass} onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>

      <div className="order-card-list">
        {order.list.map((dish, index) => (
          <DishCard
            key={index}
            name={dish.name}
            quantity={dish.quantity}
            description={dish.description}
          />
        ))}
      </div>

      <div className="order-card-footer">
        <h1 className="order-card-status">{order.status}</h1>
      </div>
    </div>
  );
};

export default OrderCard;
