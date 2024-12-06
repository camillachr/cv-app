import { Link, useNavigate } from "react-router-dom";
import { useGetAllCVsQuery } from "../../redux/apiSlice";
import { ROUTES } from "../../routes/AppRoutes";

const CVList = () => {
  //const navigate = useNavigate();
  const { data: cvs, error, isLoading } = useGetAllCVsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading CVs.</p>;

  console.log(cvs);

  //  const handleButtonClick = () => {
  //    navigate(ROUTES.ADMIN.NEW_CV);
  //  };

  return (
    <div>
      <h1>CVs</h1>
      {/* <button onClick={handleButtonClick}>+ Add user</button> */}
      <ul>
        {cvs?.map((cv) => (
          <li key={cv._uuid}>
            <Link to={`${ROUTES.ADMIN.CVS.replace(":id", cv._uuid)}`}>
              {cv.personalInfo?.name} - {cv.personalInfo?.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVList;
