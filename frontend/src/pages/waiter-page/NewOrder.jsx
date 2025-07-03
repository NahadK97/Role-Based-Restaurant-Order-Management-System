import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMenu } from "../../api/waiter-api/fetchMenu";
import Amount from "../../components/waiter-components/Amount";
import DishCounter from "../../components/waiter-components/DishCounter";
import MinMenuCard from "../../components/waiter-components/MinMenuCard";
import Reset from "../../components/waiter-components/Reset";
import TableSelector from "../../components/waiter-components/TableSelector";
import { useAuthContext } from "../../hooks/useAuthContext";
import CalcTotal from "../../utils/waiter-utils/CalcTotal";
const NewOrder = () => {
  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState(0);
  const [table, setTable] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const fromPage = location.state?.from;

  const updateTable = (number) => setTable(number);
  const handleClosing = () => setShowMenu(false);
  const handleReset = () => setOrderList([]);

  const handleSaving = (currentOrder) => {
    const prevOrder = orderList.map(order => order.name);
    let tempOrder = orderList;

    currentOrder.forEach(dish => {
      if (!prevOrder.includes(dish))
        tempOrder = [...tempOrder, { name: dish, quantity: 1, description: "" }];
    });

    prevOrder.forEach(dish => {
      if (!currentOrder.includes(dish)) {
        tempOrder = tempOrder.filter(order => order.name !== dish);
      }
    });

    setOrderList(tempOrder);
    handleClosing();
  };

  const updateCount = (dish, count) => {
    setOrderList(prev =>
      prev.map(order =>
        order.name === dish ? { ...order, quantity: count } : order
      )
    );
  };

  const updateDescription = (dish, description) => {
    setOrderList(prev =>
      prev.map(order =>
        order.name === dish ? { ...order, description } : order
      )
    );
  };

  const removeItem = (dish) => {
    setOrderList(prev => prev.filter(order => order.name !== dish));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderList.length === 0) return alert("please choose at least one item!");

    const orderJSON = {
      tableNo: table,
      list: orderList,
    };

    try {
      const response = await axios.post(`http://localhost:4000/api/${user.RID}/orders`, orderJSON, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.data.error) alert(response.data.error);
      else exitPage();
    } catch (error) {
      alert("oops! something went wrong:)");
      console.log(error);
    }
  };

  const exitPage = () => {
    if (fromPage === 'tables page') navigate('/waiter/tables');
    else navigate('/waiter');
  };

  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await fetchMenu(user.RID, user.token);
        setMenu(response);
      } catch (err) {
        alert("could not fetch menu");
      }
    };

    getMenu();
    setTotal(CalcTotal(orderList, menu.flatMap(category => category.dishes)));
  }, [orderList]);

  return (
    <div className="new-order-wrapper">
      {!showMenu && (
        <div className="order-card">
          <button onClick={exitPage} className="exit-button">
            <X />
          </button>
          <h1 className="order-title">Place New Order!</h1>
          <form className="order-form" onSubmit={handleSubmit}>
            <div className="order-top-controls">
              <TableSelector updateTable={updateTable} initialValue={table} fixedTable={location.state?.table} />
              <Amount amount={total} />
              <Reset handleClick={handleReset} />
            </div>
            <div className="order-menu-box">
              <h1 className="menu-heading">menu</h1>
              <button type="button" className="add-items-button" onClick={() => setShowMenu(true)}>
                add/remove items!
              </button>
              <ol className="order-scroll-list">
                {orderList.map((order, index) => (
                  <DishCounter
                    key={index}
                    dish={order.name}
                    count={order.quantity}
                    desc={order.description}
                    updateCount={updateCount}
                    updateDescription={updateDescription}
                    removeItem={removeItem}
                  />
                ))}
              </ol>
            </div>
            <button type="submit" className="submit-button">Place</button>
          </form>
        </div>
      )}
      {showMenu && (
        <MinMenuCard
          orderList={orderList}
          handleClosing={handleClosing}
          handleSaving={handleSaving}
        />
      )}
    </div>
  );
};

export default NewOrder;
