import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dummyOrderList from "../../assets/Lists/dummyOrderList";
import OrderCard from "../../components/OrderCard";
const OrdersPage = () => {
  const navigate = useNavigate();
  const placeOrder = () => {
    navigate('/place-order',{state : {from : 'orders page'}})
  }
  return (
      <div className='flex flex-col items-center w-full lg:w-5/6 bg-orange-900 max-h-[87vh] lg:max-h-screen overflow-y-auto'>
         <h1 className="text-4xl my-5 lg:text-7xl">Orders</h1>
         {dummyOrderList.map((order,index) => <OrderCard key={index} order = {order} />)}
         <button onClick={placeOrder} className="add-button fixed bottom-[5%] right-[2%] bg-blue-500 hover:bg-blue-900 text-white min-w-[13vw] min-h-[8vh] rounded-3xl flex items-center justify-evenly gap-2 2xl:text-3xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-[10px] pl-1">New Order <Plus className="aspect-square lg:scale-150 md:scale-120"/></button>
      </div>
  )
}
export default OrdersPage;


