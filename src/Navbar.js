// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Admin Window</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/create">Add Item</a>
      </div>
    </nav>
  );
};

export default Navbar;
