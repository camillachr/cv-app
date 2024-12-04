import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/login")}>Login</button>;
};

export default LoginBtn;
