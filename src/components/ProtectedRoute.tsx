import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ROUTES } from "../routes/AppRoutes";
import GoBackBtn from "./GoBackBtn";
import { useGetCVQuery } from "../redux/apiSlice";

interface ProtectedRouteProps {
  requiredRole?: string; // brukes for admin-ruter
  requireOwner?: boolean; // brukes for å redigere CV
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  requireOwner,
}) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const { id } = useParams();
  const { data: cv, isLoading, isError } = useGetCVQuery(id!);

  // Sjekker at bruker er logget inn
  if (!isAuthenticated) {
    console.log("User is not authenticated. Log in.");
    return <Navigate to={ROUTES.LOGIN} />;
  }

  //  Sjekker at bruker har admin-rolle, dersom det er påkrevd
  if (requiredRole && user?.role !== requiredRole) {
    console.error("User is not authorized.");
    return (
      <div>
        <h1>403 Forbidden</h1>
        <p>You do not have permission to view this page.</p>
        <GoBackBtn />
      </div>
    );
  }

  // Sjekker om brukeren eier CV
  if (requireOwner) {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (isError || !cv || cv.userId !== user?.id) {
      console.error("User does not own this resource.");
      return (
        <div>
          <h1>403: Forbidden</h1>
          <p>You do not have permission to access this resource.</p>
          <GoBackBtn />
        </div>
      );
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
