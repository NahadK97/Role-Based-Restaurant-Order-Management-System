import { Minus } from "lucide-react";
import { useEffect, useState } from "react";
import Counter from "./Counter";

const DishCounter = ({ dish, count, desc, updateCount, updateDescription, removeItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState(desc);

  const handleInfo = () => {
    setExpanded(prev => !prev);
  };

  const handleTextChange = (text) => {
    setDescription(text);
  };

  const handleRemove = () => {
    removeItem(dish);
  };

  useEffect(() => {
    updateDescription(dish, description);
  }, [description]);

  return (
    <div className="dish-counter-container">
      <div className="dish-counter-header">
        <li className="dish-counter-list-dot"></li>
        <h1 className="dish-counter-name">{dish}</h1>
      </div>
      <div className="dish-counter-actions">
        <Counter initialValue={count} updateCount={updateCount} name={dish} />
        <button onClick={handleInfo} type="button" className="dish-counter-info-btn">i</button>
        <button onClick={handleRemove} type="button" className="dish-counter-remove-btn">
          <Minus />
        </button>
      </div>
      <input
        className={`dish-counter-input ${expanded ? "visible" : "hidden"}`}
        type="text"
        name="description"
        value={description}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="any specifications here"
      />
    </div>
  );
};

export default DishCounter;
