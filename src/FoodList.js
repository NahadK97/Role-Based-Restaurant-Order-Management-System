const FoodList = ({ menu, title }) => {
  return (
    <div className="food-list">
      <h2>{title}</h2>
      {menu.map((menuItem) => (
        <div className="food-preview" key={menuItem.id}>
          <h2>{menuItem.name}</h2>
          <img src={menuItem.img} alt={menuItem.name} />
          <p>{menuItem.price}</p>
          <button className="delete">Delete From Menu</button>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
