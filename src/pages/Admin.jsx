// import FoodList from "./FoodList";
import FoodList from "../components/FoodList";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

const Admin = () => {
  const {
    data: food,
    isPending,
    error,
  } = useFetch("http://localhost:8000/menus");

  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    if (food) {
      setMenuData(food);
    }
  }, [food]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/menus/${id}`, {
      method: "DELETE",
    }).then(() => {
      setMenuData(menuData.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {menuData && (
        <FoodList
          menu={menuData}
          title="The Daily Menu!"
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Admin;
