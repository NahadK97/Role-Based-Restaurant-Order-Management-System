import { ListTodo, Sofa, SquareMenu } from "lucide-react";
import WaiterTab from "../submenu/WaiterTab";
import './Waiter.css';
const WaiterLayout = ({ children }) => {
  return (
    <div className="waiter-layout-wrapper">
      <div className="waiter-sidebar">
        <WaiterTab icon={ListTodo} text="Orders" link="/" />
        <WaiterTab icon={Sofa} text="Table" link="/tables" />
        <WaiterTab icon={SquareMenu} text="Menu" link="/menu" />
      </div>
      {children}
    </div>
  );
};

export default WaiterLayout;
