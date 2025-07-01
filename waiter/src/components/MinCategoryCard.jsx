import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import MinDishCard from "./MinDishCard";

const MinCategoryCard = ({category}) => {
    const [expanded, setExpanded] = useState(false);
    const Icon = expanded ? Minus : Plus;
    const handleClick = () => {
        setExpanded(prev => (!prev))
    }
  return (
          <div className="bg-blue-600 min-w-fit min-h-fit w-9/10">
            <h1 className="bg-blue-900 flex p-2 justify-between items-center min-h-fit h-[10%] text-xl">{category.category} <Icon onClick={handleClick} className="border-3"/></h1>
            <div className="overflow-y-hidden transition-max-height duration-500 ease" style={{maxHeight : expanded ? "1000px" : "0"}}>
            {
                category.dishes.map((dish,index) => 
                    <MinDishCard key={index} dish = {dish}/>
                )
            }
            </div>
          </div>
  )
}

export default MinCategoryCard