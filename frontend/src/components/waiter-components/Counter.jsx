import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Counter = ({ initialValue, updateCount, name, fixedTable }) => {
  const [val, setVal] = useState(fixedTable ? fixedTable.no : initialValue || 1);
  const textRef = useRef(null);

  const handleDecrement = () => {
    setVal(prev => (prev === 1 ? prev : prev - 1));
  };

  const handleIncrement = () => {
    setVal(prev => (prev === 100 ? prev : prev + 1));
  };

  const handleChange = () => {
    const inputVal = parseInt(textRef.current.value);
    if (inputVal > 0 && inputVal <= 100) setVal(inputVal);
  };

  useEffect(() => {
    updateCount && updateCount(name, val);
  }, [val]);

  return (
    <div className="counter-wrapper">
      {!fixedTable && (
        <button className="counter-btn" onClick={handleDecrement} type="button">
          <Minus />
        </button>
      )}
      <input
        className={`counter-input ${fixedTable ? "fixed" : "editable"}`}
        ref={textRef}
        onChange={handleChange}
        readOnly={fixedTable}
        required
        value={`${val}`}
        name="counter"
        type="text"
        min="1"
        max="100"
      />
      {!fixedTable && (
        <button className="counter-btn" onClick={handleIncrement} type="button">
          <Plus />
        </button>
      )}
    </div>
  );
};

export default Counter;
