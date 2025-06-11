import { useLocation, useNavigate } from "react-router-dom";
const WaiterTab = ({icon:Icon, text, link}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  function handleClick(){
    if(currentPath === "/waiter" + link) return;
    navigate("/waiter" + link);
  }
  return (
          <div onClick = {handleClick} className="flex flex-row gap-2 text-xl lg:text-3xl 2xl:text-6xl items-center" style={{color : currentPath === "/waiter" + link ? "purple" : ""}}>
            <Icon className="lg:scale-150"></Icon>
            <p className="lg:pl-5">{text}</p>
          </div>
  )
}

export default WaiterTab;