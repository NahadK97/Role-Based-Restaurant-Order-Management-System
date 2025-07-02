import { useState } from "react";

const DishCard = ({ name, quantity, description }) => {
  const [iButton, setIButton] = useState(false);

  function handleInfoClick() {
    setIButton((prev) => !prev);
  }

  return (
    <div className="dish-card">
      <div className="dish-card-header">
        <h2 className="dish-card-quantity">{quantity} X</h2>
        <h2 className="dish-card-name">{name}</h2>
        <button className="dish-card-info-btn" onClick={handleInfoClick}>
          i
        </button>
      </div>
      <div
        className="dish-card-description"
        style={{ maxHeight: iButton ? "100px" : "0" }}
      >
        {description || "no description given for this item!"}
      </div>
    </div>
  );
};

export default DishCard;
