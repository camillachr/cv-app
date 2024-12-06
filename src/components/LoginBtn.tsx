import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/AppRoutes";

const LoginBtn = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(ROUTES.LOGIN)}>Login</button>;
};

export default LoginBtn;
