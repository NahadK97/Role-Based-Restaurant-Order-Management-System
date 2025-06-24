import { useContext, useEffect, useState } from "react";
import { fetchTables } from "../../api/fetchTables";
import Table from "../../components/Table";
import { userContext } from "../../contexts/userContext";
const TableView = () => {
  const {RID} = useContext(userContext);
  const [tables, setTables] = useState([]);
  useEffect(() => {
    const getTables = async () => {
      try{
        const res = await fetchTables(RID);
        setTables(res);
      }
      catch(err) {
        alert("could not fetch tables");
      }
    }
    getTables();
  },[])
  return (
      <div className='flex flex-col items-center w-full lg:w-5/6 bg-orange-900 min-h-[87vh] lg:max-h-screen overflow-y-auto'>
         <h1 className="text-4xl my-7 lg:text-7xl">Tables</h1>
         <div className="table-container flex flex-wrap justify-center gap-10">
          {
            tables.map((table,index) => {
              return <Table key={index} no = {table.no} amount = {table.total}/>
            })
          }
         </div>
      </div>
  )
}

export default TableView;


