import dummyMenu from "../../assets/Lists/dummyMenu";
import MenuCategoryBox from "../../components/MenuCategoryBox";
const MenuPage = () => {
  return (
      <div className='flex flex-col items-center w-full lg:w-5/6 bg-orange-900 min-h-[87vh] lg:max-h-screen overflow-y-auto'>
         <h1 className="text-4xl my-7 lg:text-7xl">Menu</h1>
        {
          dummyMenu.map((category, index) => {
            return <MenuCategoryBox key={index} category={category}/>
          })
        }
      </div>
  )
}

export default MenuPage;

