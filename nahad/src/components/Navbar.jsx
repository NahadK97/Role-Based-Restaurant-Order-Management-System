import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Admin Window </Link>
      </h1>
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/add">Add Item</Link>
      </div>
    </nav>
  );
};

export default Navbar;
