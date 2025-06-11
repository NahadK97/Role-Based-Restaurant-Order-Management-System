import { Dot, IndianRupee } from "lucide-react";
const MenuDishCard = ({img, name, price}) => {
  return (
    <div className="dish-card relative min-w-[19vw] min-h-[60vh] mb-5">
        <img className="object-cover rounded-t-lg w-full h-[60vw] sm:w-60 sm:h-70 lg:w-80 lg:h-90" src={img}/>
        <div className="description-box bg-gray-300 rounded-b-lg py-3">
            <h1 className="text-center text-lg text-gray-700 font-semibold">{name}</h1>
            <h1 className="absolute top-[60vw] sm:top-70 lg:top-80 lg:top-90 left-[55vw] sm:left-55 lg:left-65 lg:left-75  rotate-17 flex items-center justify-center bg-orange-600 text-xl w-20 h-10 lg:min-w-20 lg:min-h-10 rounded-tl-[40%] rounded-bl-[40%]"><Dot className="scale-150"/>{price} <IndianRupee className="scale-80"/></h1>
        </div>
    </div>
  )
}

export default MenuDishCard