import { useEffect, useState } from "react";
import { fetchTables } from "../../api/waiter-api/fetchTables";
import Table from "../../components/waiter-components/Table";
import { useAuthContext } from "../../hooks/useAuthContext";
const TableView = () => {
  const [tables, setTables] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    const getTables = async () => {
      try {
        const res = await fetchTables(user.RID, user.token);
        setTables(res);
      } catch (err) {
        alert("could not fetch tables");
      }
    };
    getTables();
  }, []);

  return (
    <div className="table-view-wrapper">
      <h1 className="table-view-title">Tables</h1>
      <div className="table-container">
        {tables.map((table, index) => (
          <Table key={index} no={table.tableNo} amount={table.total} />
        ))}
      </div>
    </div>
  );
};

export default TableView;
