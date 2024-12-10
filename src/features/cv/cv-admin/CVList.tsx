import { Link, useNavigate } from "react-router-dom";
import { useGetAllCVsQuery } from "../../../redux/apiSlice";
import { ROUTES } from "../../../routes/AppRoutes";

const CVList = () => {
  const navigate = useNavigate();
  const { data: cvs, error, isLoading } = useGetAllCVsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading CVs.</p>;

  const handleButtonClick = () => {
    navigate(ROUTES.ADMIN.NEW_CV);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>+ Create CV</button>
      <ul>
        {cvs?.map((cv) => (
          <li key={cv._uuid}>
            <Link to={`${ROUTES.ADMIN.CV(cv._uuid)}`}>
              {cv.personalInfo?.name} - {cv.personalInfo?.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVList;
