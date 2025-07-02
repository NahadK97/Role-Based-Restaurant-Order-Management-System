import { ListTodo, Sofa, SquareMenu } from "lucide-react";
import WaiterTab from "../submenu/WaiterTab";
const WaiterLayout = ({children}) => {
  return (
    <div className='flex flex-col lg:flex-row  min-w-fit'>
        <div className='flex  justify-center lg:flex-col lg:items-start items-center gap-15 bg-gray-800 pl-30 lg:pl-[2%] min-h-[20vh] lg:h-screen min-w-fit lg:w-1/6'>
          <WaiterTab icon = {ListTodo} text ="Orders" link = ""/>
          <WaiterTab icon = {Sofa} text ="Table" link = "/tables"/>
          <WaiterTab icon = {SquareMenu} text ="Menu" link = "/menu"/>          
        </div>
        {children}
    </div>    
  )
}

export default WaiterLayout;