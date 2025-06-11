import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import MenuPage from "./pages/waiter-page/MenuPage";
import NewOrder from "./pages/waiter-page/NewOrder";
import OrdersPage from "./pages/waiter-page/OrdersPage";
import TableView from "./pages/waiter-page/TableView";
import WaiterHome from "./pages/waiter-page/WaiterHome";
function App(){
  return <div>
          <BrowserRouter >
            <Routes>
              <Route path="/" element = {<Navigate to = "/waiter" />}></Route>
              <Route path="/waiter" element = {<WaiterHome />}>
                <Route index element = {<OrdersPage />}></Route>
                <Route path="menu" element = {<MenuPage />}></Route>
                <Route path="tables" element = {<TableView />}></Route>
              </Route>
              <Route path="/place-order" element = {<NewOrder />}/>
            </Routes>
          </BrowserRouter >
  </div>
}

export default App;
