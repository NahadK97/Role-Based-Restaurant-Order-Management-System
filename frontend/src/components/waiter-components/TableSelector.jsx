import Counter from "./Counter";
import './Waiter.css';
const TableSelector = ({ updateTable, fixedTable, initialValue }) => {
  const updateTableNumber = (placeholder, number) => {
    updateTable(number);
  };

  return (
    <div className="table-selector-wrapper">
      <label className="table-selector-label" htmlFor="table">
        Table No :
      </label>
      <Counter
        updateCount={updateTableNumber}
        initialValue={initialValue}
        fixedTable={fixedTable}
      />
    </div>
  );
};

export default TableSelector;
