import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/cvs"}>CV</Link>
        <Link to={"/users"}>Users</Link>
      </nav>
    </div>
  );
};

export default Navbar;
