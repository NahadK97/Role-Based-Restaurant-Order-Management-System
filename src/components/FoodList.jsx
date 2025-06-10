const FoodList = ({ menu, title, onDelete }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="food-list">
        {menu.map((menuItem) => (
          <div className="food-card" key={menuItem.id}>
            <h2>{menuItem.name}</h2>
            <img src={menuItem.img} alt={menuItem.name} />
            <p>{menuItem.price}</p>
            <button className="delete" onClick={() => onDelete(menuItem.id)}>
              Delete From Menu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
