import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/AppRoutes";
import { useGetAllCVsQuery } from "../redux/apiSlice";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const { data: cvs, isLoading: isLoadingCVs } = useGetAllCVsQuery();
  const existingCV = cvs?.find((cv) => cv.userId === user?.id);

  const isAdmin = isAuthenticated && user?.role === "admin";
  if (!isAuthenticated) return null;

  if (isLoadingCVs) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav>
        {/* Users med CV */}
        {!isAdmin && existingCV && (
          <>
            <Link to={ROUTES.ROOT}>Home</Link>
            <Link to={ROUTES.MY_CV(existingCV._uuid)}>My CV</Link>
          </>
        )}

        {/* Admin */}
        {isAdmin && (
          <>
            <Link to={ROUTES.ROOT}>Home</Link>
            <Link to={ROUTES.ADMIN.CVS}>CVs</Link>
            <Link to={ROUTES.ADMIN.USERS}>Users</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
