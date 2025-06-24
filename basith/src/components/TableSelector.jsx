import Counter from "./Counter";
const TableSelector = ({updateTable, fixedTable, initialValue}) => {
  const updateTableNumber = (placeholder,number) => {
    updateTable(number);
  }
  return (
    <div className="flex items-center bg-green-900 py-5 px-6 rounded-lg">
        <label className="text-xl text-white font-semibold mr-10" htmlFor="table">Table No : </label>
        <Counter updateCount={updateTableNumber} initialValue={initialValue} fixedTable={fixedTable}/>
    </div>
  )
}

export default TableSelector