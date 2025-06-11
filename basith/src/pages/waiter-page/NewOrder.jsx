import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dummyMenu from "../../assets/Lists/dummyMenu";
import Amount from "../../components/Amount";
import DishCounter from "../../components/DishCounter";
import MinMenuCard from "../../components/MinMenuCard";
import Reset from "../../components/Reset";
import TableSelector from "../../components/TableSelector";
import CalcTotal from "../../utils/CalcTotal";
const NewOrder = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState(0);
  let table;
  const menuList = dummyMenu.flatMap(category => category.list)
  const location = useLocation();
  const navigate = useNavigate();
  const fromPage = location.state?.from;
  const updateTable = (number) => {
    table = number;
  }
  const handleSaving = (currentOrder) => {
    // setOrderList(list);    
    // setTotal(amount);
    const prevOrder = orderList.map(order => order.name);
    let tempOrder = orderList;
    currentOrder.map(dish => {
      if(!prevOrder.includes(dish)) tempOrder = [...tempOrder, {name : dish, quantity: 1, description: ""}]
    })
    prevOrder.map(dish => {
      if(!currentOrder.includes(dish)){
        tempOrder = tempOrder.filter(order => order.name != dish);
      }
    })
    setOrderList(tempOrder);
    handleClosing();
  }
  const handleClosing = () => {
    setShowMenu(false);
  }
  const handleReset = () => {
    setOrderList([]);
  }
  const updateCount = (dish,count) => {
    setOrderList(prev => prev.map( order => 
      order.name == dish ? {...order, quantity : count} : order
    )
    )
  }
  const updateDescription = (dish,description) => {
    setOrderList(prev => prev.map( order => 
      order.name == dish ? {...order, description : description} : order
    )
    ) 
  }
  const removeItem = (dish) => {
    setOrderList(prev => prev.filter(order => order.name !== dish)) 
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(orderList.length == 0) alert("please choose atleast one item!")
    else {
      const orderJSON = {
        tableNo : table,
        status : 'yet-to-cook',
        dishList : orderList
      }
      const tableJSON = {
        tableNo : table,
        amount : total
      }
      console.log(orderJSON);
      console.log(tableJSON);
      exitPage();      
    }
  }
  const exitPage = () => {
    if(fromPage === 'tables page') navigate('/waiter/tables');
    else navigate('/waiter')
  }
  useEffect(()=>{
    setTotal(CalcTotal(orderList, menuList))
  },[orderList])
  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col justify-center items-center">
        {!showMenu && <div className="order-page bg-gray-500 w-4/5 max-w-[800px] h-9/10 flex flex-col overflow-hidden items-center rounded-2xl">
            <button onClick={() => exitPage()} className="z-1 bg-red-500 hover:bg-red-900 w-10 h-10 rounded-full translate-y-[100%] flex justify-center items-center self-end relative bottom-8 right-2 "><X /></button>
            <h1 className="text-black text-xl my-2 font-bold">Place New Order!</h1>   
            <form className="flex flex-col h-9/10" action="/submit" method="POST" name="orderlist">
                <div className="flex flex-wrap justify-center gap-5">
                    <TableSelector updateTable={updateTable} fixedTable={location.state?.table}/>
                    <Amount amount = {total}/>
                    <Reset handleClick={handleReset}/>
                </div>
                <div className="bg-green-900 flex flex-col flex-1 min-h-0 mt-5">
                  <h1 className="bg-green-600 text-center text-2xl">menu</h1>
                  <button onClick={() => setShowMenu(true)} className="bg-violet-400 hover:bg-violet-700  w-fit mx-auto p-3 text-lg rounded-full mt-2" type="button">add/remove items!</button>
                  <ol className="scroll-target-div pt-5 bg-gray-900 flex-1 overflow-y-auto list-decimal list-inside">
                    {
                      
                      orderList.map((order,index) => {
                        return <DishCounter key={index} dish = {order.name} count = {order.quantity} desc = {order.description} updateCount={updateCount} updateDescription={updateDescription} removeItem={removeItem}/>
                      })
                    }
                  </ol>
                </div>
                <button className="bg-orange-500 hover:bg-orange-800 text-xl px-5 py-1 w-1/4 mx-auto -translate-y-1/2 rounded-lg" onClick={handleSubmit}>Place</button>
            </form>         
        </div>
        }
        {showMenu && <MinMenuCard orderList={orderList} total={total} handleClosing={handleClosing} handleSaving={handleSaving} />}
        {!showMenu }
    </div>
  )
}

export default NewOrder;