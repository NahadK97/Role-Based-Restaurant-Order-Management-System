import FoodList from "./FoodList";
import useFetch from "./useFetch";
const Admin = () => {
  const {
    data: food,
    isPending,
    error,
  } = useFetch("http://localhost:8000/menus");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {food && <FoodList menu={food} title="The Daily Menu!" />}
    </div>
  );
};

export default Admin;
