import { ListTodo, Sofa, SquareMenu } from "lucide-react";
import { Outlet } from "react-router-dom";
import WaiterTab from "../../components/waiter-components/submenu/WaiterTab";
import './Waiter.css';
const WaiterLayout = ({ children }) => {
  return (
    <div className="waiter-layout-wrapper">
      <div className="waiter-sidebar">
        <WaiterTab icon={ListTodo} text="Orders" link="/waiter" />
        <WaiterTab icon={Sofa} text="Table" link="/waiter/tables" />
        <WaiterTab icon={SquareMenu} text="Menu" link="/waiter/menu" />
      </div>
      <Outlet />
    </div>
  );
};

export default WaiterLayout;
