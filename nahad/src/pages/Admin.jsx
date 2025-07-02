import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMenuContext } from "../hooks/useMenuContext";
import { useAuthContext } from "../hooks/useAuthContext";
import FoodList from "../components/FoodList";

const Admin = () => {
  const { restaurantId } = useParams();
  const { menu, dispatch } = useMenuContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        if (!restaurantId) throw new Error("Restaurant ID is required");

        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/${restaurantId}/menu`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }

        const json = await response.json();
        console.log("Dispatching menu:", json);
        dispatch({ type: "SET_MENU", payload: json });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && restaurantId) {
      fetchMenu();
    }
  }, [dispatch]);

  if (!restaurantId) {
    return <div className="error">Error: Missing restaurant ID</div>;
  }

  if (isLoading) {
    return <div className="loading">Loading menu...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-header">
      <h2>Menu</h2>
      <div className="admin">
        {menu?.length > 0 ? (
          menu.map((category) => (
            <div key={category._id || category.category}>
              <h3>{category.category}</h3>
              <div className="food-list">
                {category.dishes?.map((dish) => (
                  <FoodList
                    key={dish._id}
                    dish={dish}
                    category={category.category}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
