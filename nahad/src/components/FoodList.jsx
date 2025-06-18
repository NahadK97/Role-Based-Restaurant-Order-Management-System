import { useAuthContext } from "../hooks/useAuthContext";
import { useMenuContext } from "../hooks/useMenuContext";

const FoodList = ({ item }) => {
  const { user } = useAuthContext();
  const { dispatch } = useMenuContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/menu/" + item._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ITEM", payload: json });
    } else {
      console.error("Error deleting item:", json);
    }
  };
  return (
    <div>
      <div className="food-card" key={item.id}>
        <h2>{item.name}</h2>
        <div className="image-container">
          <img src={item.image} alt={item.name} />
        </div>
        <p>{item.price}</p>
        <button className="material-symbols-outlined" onClick={handleClick}>
          delete
        </button>
      </div>
    </div>
  );
};

export default FoodList;
