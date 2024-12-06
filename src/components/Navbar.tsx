import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/AppRoutes";
import useUserCV from "../hooks/useUserCV";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const isAdmin = isAuthenticated && user?.role === "admin";

  if (!isAuthenticated) return null;

  return (
    <div>
      <nav>
        <Link to={ROUTES.ROOT}>Home</Link>

        {/* My CV for users */}
        {!isAdmin && <Link to={ROUTES.MY_CV}>My CV</Link>}

        {/* Admin-spesifikke lenker */}
        {isAdmin && <Link to={ROUTES.ADMIN.CVS}>CVs</Link>}
        {isAdmin && <Link to={ROUTES.ADMIN.USERS}>Users</Link>}
      </nav>
    </div>
  );
};

export default Navbar;
