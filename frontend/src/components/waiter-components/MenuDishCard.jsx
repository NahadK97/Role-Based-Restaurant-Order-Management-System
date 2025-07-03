import { IndianRupee } from "lucide-react";

const MinDishCard = ({ dish }) => {
  return (
    <div className="min-dish-card">
      <h1 className="min-dish-name">{dish.name}</h1>
      <strong className="min-dish-price">
        {dish.price}
        <IndianRupee />
      </strong>
    </div>
  );
};

export default MinDishCard;
