import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import LoginBtn from "./LoginBtn";
import { ROUTES } from "../routes/AppRoutes";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.ROOT);
  };

  return (
    <header>
      <Link to={ROUTES.ROOT}>
        <h2>CV-APP</h2>
      </Link>
      <Navbar />
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <LoginBtn />
      )}
    </header>
  );
};

export default Header;
