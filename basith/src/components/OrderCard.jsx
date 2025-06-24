import { useContext, useEffect, useState } from "react";
import { fetchMenu } from "../api/fetchMenu";
import { userContext } from "../contexts/userContext";
import CalcTotal from "../utils/CalcTotal";
import DishCard from "./DishCard";
const OrderCard = ({order}) => {
  const {RID} = useContext(userContext)
  const [status, setStatus] = useState(order.status);
  const [buttonClass, setButtonClass] = useState(null);
  const [buttonText, setButtonText] = useState(null);
  useEffect(() => {
    if (status === "ready") {
      setButtonClass("bg-orange-500 hover:bg-orange-600");
      setButtonText("Lock");
    } else if (status === "locked") {
      setButtonClass("bg-violet-500 hover:bg-violet-600");
      setButtonText("Done");
    } else {
      setButtonClass("bg-gray-500 hover:bg-gray-600");
      setButtonText("Lock");
    }
  }, [status]);
  const handleButtonClick = async () => {
    if(status === "placed" || status === "preparing") return;
    if(status === "ready") {
      //api call to patch in the db
      try {
        const newOrder = {
          RID : RID,
          tableNo : order.tableNo,
          status : "locked",
          list : order.list
        }
        const response = await axios.patch(`http://localhost:4000/api/${RID}/order/edit/${tableNo}`,newOrder); 
        setStatus("locked");
      }
      catch(err) {
        alert("could not lock order!");
      }
    }
    else if(status === "locked") {
      //delete it from the order collection and add it to table
      try{
        const deleteResponse = await axios.delete(`http://localhost:4000/api/${RID}/order/delete/${order.tableNo}`)
        const checkResponse = await axios.get(`http://localhost:4000/api/${RID}/tables/${order.tableNo}`)
        const orders = order.list.map(item => ({name : item.name, quantity : item.quantity}))
        const total = await CalcTotal(orders, fetchMenu(RID).flatMap(category => category.dishes))
        if(checkResponse) {
          const edits = {
            orders : order,
            total : total
          }
          const patchResponse = await axios.patch(`http://localhost:4000/api/${RID}/tables/${order.tableNo}/edit`)
        }
        else {
          const newTable = {
            RID : RID,
            tableNo : order.tableNo,
            total : total,
            orders : orders
          }
          const addResponse = await axios.post(`http://localhost:4000/api/${RID}/tables`,newTable);
        }
      }
      catch(err) {
        alert("could not finish the process");
      }
    }
  }
  return (
        <div className="bg-red-900 mb-10  min-h-fit lg:min-w-[60vw] min-w-[80vw]">
          <div className="bg-green-900 flex px-[5%] justify-between min-h-15 py-10 rounded-t-xl">
            <h3 className="border-3 rounded-lg min-w-1/3 min-h-[80%] py-2 self-center flex flex-col justify-center items-center text-2xl 2xl:text-6xl">Table {order.tableNo}</h3>
            <button className={`rounded-3xl self-center  min-w-1/4 min-h-[80%] py-2 2xl:text-6xl ${buttonClass}`} onclick={handleButtonClick}>{buttonText}</button>
          </div>
          <div className="flex flex-col">
            {
              order.list.map((dish, index) => {
                return <DishCard key={index} name = {dish.name} quantity={dish.quantity} description={dish.description}/>
              })
            }
          </div>
          <div className="flex items-center justify-center gap-[5vh] bg-indigo-800 min-h-[14vh] rounded-b-xl">
            <h1 className="text-3xl  xl:text-4xl">
              {order.status}
            </h1>
          </div>
        </div>
  )
}

export default OrderCard;