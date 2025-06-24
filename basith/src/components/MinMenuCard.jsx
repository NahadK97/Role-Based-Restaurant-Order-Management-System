import { X } from "lucide-react";
import { useState,useContext,useEffect } from "react";
import { OrderContext } from "../contexts/OrderContext";
import MinCategoryCard from "./MinCategoryCard";
import { userContext } from "../contexts/userContext";
import axios from "axios";
const MinMenuCard = ({orderList, handleClosing, handleSaving}) => {
  const {RID} = useContext(userContext);
  const [menu, setMenu] = useState([]);
  const [_orderList, _setOrderList] = useState(orderList.map(order => order.name));
  const onToggle = (dishName) => {    
    _setOrderList((prev) => 
      prev.includes(dishName) ? prev.filter(dish => dish != dishName) : [...prev, dishName]
    )
  }
  useEffect(() => {
    const fetchMenu = async () => {
      try{
        const response = await axios.get(`http://localhost:4000/api/${RID}/menu`); 
        setMenu(response.data);
      }
      catch(err) {
        alert("oops! could not fetch menu");
      }
    }
    fetchMenu();
  }, [])
  return (

        <OrderContext.Provider value={{onToggle,_orderList}}>
        <div className="bg-gray-500 w-[80%] max-w-[800px] h-9/10 overflow-y-auto opacity-400 flex flex-col items-center rounded-2xl pt-5">
        <button onClick={() => handleClosing()} className="z-1 bg-red-500 hover:bg-red-900 w-10 h-10 rounded-full translate-y-[50%] flex justify-center items-center self-end relative bottom-8 right-2 "><X /></button>
            {
                menu.map((category, index) => <MinCategoryCard key={index} category={category}/>)
            }
        </div>
        <button onClick={() => handleSaving(_orderList)} className="z-1 bg-green-500 hover:bg-green-900 w-30 h-10 rounded-full -translate-y-[50%]">add</button>
        </OrderContext.Provider>
  )
}

export default MinMenuCard