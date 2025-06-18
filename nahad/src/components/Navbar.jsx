import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Admin Window </h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>
                <b>{user.email}</b>
              </span>
              <Link to="/add">Add Item</Link>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className="links">
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
