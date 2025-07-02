import { IndianRupee, Square, SquareCheckBig } from "lucide-react";
import { useContext, useState } from "react";
import { OrderContext } from "../../contexts/waiter-contexts/OrderContext";

const MinDishCard = ({ dish }) => {
  const { onToggle, _orderList } = useContext(OrderContext);
  const [checked, setChecked] = useState(_orderList.includes(dish.name));
  const Icon = checked ? SquareCheckBig : Square;

  const handleClick = () => {
    setChecked((prev) => !prev);
    onToggle(dish.name);
  };

  return (
    <div className="min-dish-card">
      <h1 className="min-dish-name">{dish.name}</h1>
      <strong className="min-dish-price">
        {dish.price}
        <IndianRupee />
      </strong>
      <button onClick={handleClick} className="min-dish-btn">
        <Icon style={{ color: checked ? "green" : "" }} />
      </button>
    </div>
  );
};

export default MinDishCard;
