import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <h3>LOGO</h3>
      <Navbar />
      <button onClick={() => navigate("/login")}>Login</button>
    </header>
  );
};

export default Header;
