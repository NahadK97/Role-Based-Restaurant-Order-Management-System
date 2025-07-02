import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderContext } from "../../contexts/waiter-contexts/OrderContext";
import { useAuthContext } from "../../hooks/useAuthContext/";
import MinCategoryCard from "./MinCategoryCard";
const MinMenuCard = ({ orderList, handleClosing, handleSaving }) => {
  const {user} = useAuthContext();
  const [menu, setMenu] = useState([]);
  const [_orderList, _setOrderList] = useState(orderList.map((order) => order.name));
  const onToggle = (dishName) => {
    _setOrderList((prev) =>
      prev.includes(dishName)
        ? prev.filter((dish) => dish !== dishName)
        : [...prev, dishName]
    );
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/${user.RID}/menu`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
        setMenu(response.data);
      } catch (err) {
        alert("oops! could not fetch menu");
      }
    };
    fetchMenu();
  }, []);

  return (
    <OrderContext.Provider value={{ onToggle, _orderList }}>
      <div className="min-menu-wrapper">
        <button onClick={handleClosing} className="close-btn">
          <X />
        </button>
        {menu.map((category, index) => (
          <MinCategoryCard key={index} category={category} />
        ))}
      </div>
      <button onClick={() => handleSaving(_orderList)} className="add-btn">
        add
      </button>
    </OrderContext.Provider>
  );
};

export default MinMenuCard;
