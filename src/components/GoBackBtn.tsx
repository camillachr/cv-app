import { useNavigate } from "react-router-dom";

const GoBackBtn = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>Go Back</button>;
};

export default GoBackBtn;
