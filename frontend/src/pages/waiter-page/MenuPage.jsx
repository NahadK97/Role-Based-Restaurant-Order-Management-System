import { useEffect, useState } from "react";
import { fetchMenu } from "../../api/waiter-api/fetchMenu";
import MenuCategoryBox from "../../components/waiter-components/MenuCategoryBox";
import { useAuthContext } from "../../hooks/useAuthContext";
const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const { user } = useAuthContext();
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
  }, []);

  return (
    <div className="menu-page-wrapper">
      <h1 className="menu-page-title">Menu</h1>
      {menu.map((category, index) => (
        <MenuCategoryBox key={index} category={category} />
      ))}
    </div>
  );
};

export default MenuPage;
