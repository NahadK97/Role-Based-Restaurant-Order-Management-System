import { Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../api/fetchOrders";
import OrderCard from "../../components/OrderCard";
import { userContext } from "../../contexts/userContext";
const OrdersPage = () => {
  const {RID} = useContext(userContext);
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();
  const placeOrder = () => {
    navigate('/place-order',{state : {from : 'orders page'}})
  }
  useEffect(()=> {
    const getOrders = async () => {
      try{
        const orders = await fetchOrders(RID);
        console.log(orders);
        
        setOrderList(orders);
      }
      catch(err) {
        alert("could not fetch orders");
      }
    }
    getOrders();
  },[])
  return (
      <div className='flex flex-col items-center w-full lg:w-5/6 bg-orange-900 max-h-[87vh] lg:max-h-screen overflow-y-auto'>
         <h1 className="text-4xl my-5 lg:text-7xl">Orders</h1>
         {orderList.map((order,index) => <OrderCard key={index} order = {order} />)}
         <button onClick={placeOrder} className="add-button fixed bottom-[5%] right-[2%] bg-blue-500 hover:bg-blue-900 text-white min-w-[13vw] min-h-[8vh] rounded-3xl flex items-center justify-evenly gap-2 2xl:text-3xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-[10px] pl-1">New Order <Plus className="aspect-square lg:scale-150 md:scale-120"/></button>
      </div>
  )
}
export default OrdersPage;


