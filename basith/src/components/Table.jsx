import { IndianRupee, Plus, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Table = ({no, amount}) => {
  const navigate = useNavigate();
  const extendOrder = () => {
    navigate('/place-order',{state : {from : 'tables page', table:{no:no}}})
  }
  return (
          <div className="bg-gray-400 text-black font-bold flex flex-col items-center justify-between min-w-[30vw] max-w-200 h-[20vw] rounded-3xl overflow-hidden">
            <h1 className="text-3xl flex-1 lg:text-5xl md:pt-4 lg:pt-10">Table {no}</h1>
            <h1 className="flex text-2xl lg:text-3xl lg:mb-5 md:mb-3 items-center justify-center">{amount} <IndianRupee /></h1>
            <div className="bill flex flex-1 self-end items-center w-full max-h-10">
              <button onClick={extendOrder} className="bg-green-700 hover:bg-green-900 flex-1 h-full flex justify-center items-center sm:gap-3 md:gap-5">Extend <Plus /></button>
              <button className="bg-red-700 hover:bg-red-900 flex-1 h-full flex justify-center items-center sm:gap-3 md:gap-5">Bill <UserCheck /></button>
            </div>
          </div>
  )
}

export default Table