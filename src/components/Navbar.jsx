import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Admin Window</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Item</Link>
      </div>
    </nav>
  );
};

export default Navbar;
