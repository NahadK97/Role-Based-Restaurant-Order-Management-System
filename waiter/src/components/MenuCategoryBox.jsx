import { ChevronDown } from "lucide-react";
import { useState } from "react";
import MenuDishCard from "./MenuDishCard";
const MenuCategoryBox = ({category}) => {
    const [expanded, setExpanded] = useState(false);
    function handleClick() {
        setTimeout(()=>{

        },1000)
        setExpanded((prev) => (!prev));
    }
  return (
        <div  onClick={handleClick} className="dish-category-box w-[100%] bg-gray-600">
            <div className="flex justify-between items-center min-h-[10vh] w-full">
                <h1 className="ml-10 text-xl">{category.category}</h1>
                <button>
                    {<ChevronDown className={`mr-10 min-w-10 min-h-10 transition-transform duration-500 ${expanded ? "rotate-0" : "rotate-90"}`}/>}
                </button>
            </div>
            <div className="flex flex-wrap gap-20 pt-10 items-center justify-center bg-gray-400 overflow-hidden transition-max-height duration-500" style={{maxHeight : expanded ? "1000vh" : "0"}}>
                {
                    category.dishes.map((dish, index) => {
                        return <MenuDishCard key={index} name = {dish.name} price={dish.price} img={dish.img}/>
                    })
                }
            </div>

        </div>
  )
}

export default MenuCategoryBox;