import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ROUTES } from "../routes/AppRoutes";
import GoBackBtn from "./GoBackBtn";

interface ProtectedRouteProps {
  requiredRole?: string; // brukes for admin-ruter
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Sjekker at bruker er logget inn
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  //  Sjekker at bruker har admin-rolle, dersom det er påkrevd
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <GoBackBtn />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
