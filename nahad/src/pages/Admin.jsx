import { useEffect } from "react";
import { useMenuContext } from "../hooks/useMenuContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import FoodList from "../components/FoodList";

const Admin = () => {
  const { menu, dispatch } = useMenuContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch("/api/menu", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    };
    if (user) {
      fetchMenu();
    }
  }, [dispatch, user]);
  return (
    <div className="admin-header">
      <h2>Menu</h2>
      <div className="admin">
        <div className="food-list">
          {menu && menu.map((item) => <FoodList key={item._id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Admin;
