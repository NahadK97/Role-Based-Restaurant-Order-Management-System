import dummyTableList from "../../assets/Lists/dummyTableList";
import Table from "../../components/Table";
const TableView = () => {
  return (
      <div className='flex flex-col items-center w-full lg:w-5/6 bg-orange-900 min-h-[87vh] lg:max-h-screen overflow-y-auto'>
         <h1 className="text-4xl my-7 lg:text-7xl">Tables</h1>
         <div className="table-container flex flex-wrap justify-center gap-10">
          {
            dummyTableList.map((table,index) => {
              return <Table key={index} no = {table.no} amount = {table.amount}/>
            })
          }
         </div>
      </div>
  )
}

export default TableView;


