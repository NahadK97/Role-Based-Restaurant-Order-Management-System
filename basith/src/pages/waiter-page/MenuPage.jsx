import { useContext, useEffect, useState } from "react";
import { fetchMenu } from "../../api/fetchMenu";
import MenuCategoryBox from "../../components/MenuCategoryBox";
import { userContext } from "../../contexts/userContext";
const MenuPage = () => {
  const {RID} = useContext(userContext);
  const [menu, setMenu] = useState([])
  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await fetchMenu(RID);
        setMenu(response);
      }
      catch(err) {
        alert("could not fetch menu");
      }
    }
    getMenu();
  }, [])
  return (
      <div className='flex flex-col items-center w-full lg:w-5/6 bg-orange-900 min-h-[87vh] lg:max-h-screen overflow-y-auto'>
         <h1 className="text-4xl my-7 lg:text-7xl">Menu</h1>
        {
          menu.map((category, index) => {
            return <MenuCategoryBox key={index} category={category}/>
          })
        }
      </div>
  )
}

export default MenuPage;

