import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const Counter = ({initialValue, updateCount, name, fixedTable}) => {
  const [val, setVal] = useState(fixedTable?fixedTable.no:(initialValue || 1));
  const textRef = useRef(null);
  const handleDecrement = () =>{
    setVal(prev => prev == 1 ? prev : prev - 1);
  }
  const handleIncrement = () =>{
    setVal(prev => prev == 100 ? prev : prev + 1);
  }
  const handleChange = () => {
    const inputVal = parseInt(textRef.current.value);
    if(inputVal) {
        if(inputVal > 0 && inputVal <= 100) setVal(inputVal);
    }
  }
  useEffect(() => {
        updateCount && updateCount(name,val)
        
  },[val])
  return (
    <>
        <button className={`bg-white text-black hover:bg-gray-300 rounded-sm ${!fixedTable?'block':'hidden'}`} onClick={handleDecrement} type="button"><Minus /></button>
        <input className={`text-center w-15 h-8 text-xl border-black border-3 rounded-md bg-gray-400 select-none focus:outline-none focus:ring-0 ${!fixedTable?'text-red-500':'text-gray-700'}`} ref = {textRef} onChange={handleChange} readOnly={fixedTable} required value={`${val}`} name="counter" type="text" min="1" max="100"/>
        <button className={`bg-white text-black hover:bg-gray-300 rounded-sm ${!fixedTable?'block':'hidden'}`} onClick={handleIncrement} type="button"><Plus /></button>
    </>
  )
}

export default Counter