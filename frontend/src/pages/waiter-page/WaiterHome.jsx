import { Outlet } from "react-router-dom";
import WaiterLayout from "../../components/waiter-components/layouts/WaiterLayout";
const WaiterHome = () => {
  return (
    <WaiterLayout>
      <Outlet />
    </WaiterLayout>
  )
}

export default WaiterHome;