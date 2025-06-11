import { Minus } from "lucide-react";
import { useEffect, useState } from "react";
import Counter from "./Counter";
const DishCounter = ({dish, count, desc, updateCount, updateDescription, removeItem}) => {
  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState(desc);
  const handleInfo = () => {
    setExpanded(prev => (!prev));
  }
  const handleTextChange = (text) => {
    setDescription(text); 
  }
  const handleRemove = () => {
    removeItem(dish)
  }
  useEffect(()=> {
    updateDescription(dish,description)
  },[description])
  return (
    <div className="flex-col md:flex-row items-center py-2 pl-10">
        <div className="flex md:float-left">
        <li className="text-xl font-semibold mr-2"></li>
        <h1 className="text-xl pr-10 w-auto">{dish}</h1>
        </div>
        <div className="flex items-center">
          <Counter initialValue={count}  updateCount={updateCount} name={dish}/>
        <button onClick={handleInfo} type="button" className="aspect-square w-7 rounded-full bg-blue-600 hover:bg-blue-900 ml-10">i</button>
        <button onClick={handleRemove} type="button" className="aspect-square w-7 text-center flex justify-center items-center rounded-full bg-red-600 hover:bg-red-900 ml-10"><Minus /></button>
        </div>
        <input className={`rounded-lg p-2 w-2/3 bg-gray-500 mr-10 mt-3 text-lg ${expanded ? 'block':'hidden'}`} type="text" name="description" value={`${description}`} onChange={(e) => handleTextChange(e.target.value)} placeholder="any specifications here"></input>
    </div>
  )
}

export default DishCounter