import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMenuContext } from "../hooks/useMenuContext";

const FoodList = ({ dish, category }) => {
  const { user } = useAuthContext();
  const { dispatch } = useMenuContext();
  const { restaurantId } = useParams(); // Add this line if you need restaurantId

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(
        `/api/${restaurantId}/menu/${category}/delete-dish/${dish._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "DELETE_DISH",
          payload: {
            category: category,
            dishId: dish._id,
          },
        });
      } else {
        console.error("Error deleting item:", json);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="food-card" key={dish._id}>
      <h2>{dish.name}</h2>
      <div className="image-container">
        <img src={dish.img} alt={dish.name} />
      </div>
      <p>₹{dish.price.toFixed(2)}</p>
      {user && (
        <button
          className="material-symbols-outlined"
          onClick={handleClick}
          aria-label={`Delete ${dish.name}`}
        >
          delete
        </button>
      )}
    </div>
  );
};

export default FoodList;