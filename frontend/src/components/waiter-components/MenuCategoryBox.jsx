import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import MenuDishCard from "./MenuDishCard";

const MinCategoryCard = ({ category }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = expanded ? Minus : Plus;

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="min-category-card">
      <h1 className="min-category-header" onClick={handleClick}>
        {category.category}
        <Icon className="min-category-toggle" />
      </h1>
      <div
        className="min-category-dishes"
        style={{ maxHeight: expanded ? "1000px" : "0px" }}
      >
        {category.dishes.map((dish, index) => (
          <MenuDishCard key={index} dish={dish} />
        ))}
      </div>
    </div>
  );
};

export default MinCategoryCard;
