import { useState } from "react";

const DishCard = ({name, quantity, description}) => {
  const [iButton, setIButton] = useState(false);
  function handleInfoClick() {
    setIButton((prev) => (!prev));
  }
  return (<div className="bg-violet-900 border-b-5 border-black">
            <div className="flex justify-between items-center min-w-full min-h-[10vh] px-[5%] text-xl  2xl:text-6xl">
              <h2 className="bg-gray-900 min-h-1/2 min-w-1/8 text-center rounded-full">{quantity} X </h2>
              <h2 className="text-green-100"> {name} </h2>
              <button className="bg-blue-500 aspect-square hover:bg-blue-800 rounded-full w-[10%] sm:w-[7%] md:w-[6%] lg:w-[5%] xl:w-[4%] text-center text-gray-600" onClick={handleInfoClick}>i</button>
            </div>
            <div className="bg-gray-900 text-center overflow-y-hidden transition-max-height duration-500 ease" style={{maxHeight : iButton ? "100px":"0"}}>{description || "no description given for this item!"}</div>
        </div>
)
}

export default DishCard;