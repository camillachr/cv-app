import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const isAdmin = isAuthenticated && user?.role === "admin";

  return (
    <div>
      {isAuthenticated && (
        <nav>
          <Link to={"/"}>Home</Link>

          {user?.role === "user" && <Link to={"/cvs/:id"}>My CV</Link>}
          {isAdmin && <Link to={"/cvs"}>CVs</Link>}
          {isAdmin && <Link to={"/users"}>Users</Link>}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
