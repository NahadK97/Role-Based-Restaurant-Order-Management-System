import { IndianRupee, Square, SquareCheckBig } from "lucide-react";
import { useContext, useState } from "react";
import { OrderContext } from "../contexts/OrderContext";
const MinDishCard = ({dish}) => {
    const {onToggle,_orderList} = useContext(OrderContext);
    const [checked, setChecked] = useState(_orderList.includes(dish.name));
    const Icon = checked ? SquareCheckBig : Square;
    const handleClick = () => {
        setChecked(prev => (!prev));
        onToggle(dish.name, dish.price);
    }
  return (
            <div className="flex justify-around p-2 w-ful text-lg">
              <h1 className="w-2/3">{dish.name}</h1>
              <strong className="flex w-1/4">{dish.price}<IndianRupee /></strong>
               <button onClick={handleClick} className="w-1/12"><Icon style={{color : checked ? "green" : ""}}/></button>
            </div>
  )
}

export default MinDishCard