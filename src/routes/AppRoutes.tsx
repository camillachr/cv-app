import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginForm from "../components/LoginForm";
import EditCVPage from "../pages/EditCVPage";
import EditUserPage from "../pages/admin/EditUserPage";
import CVsPage from "../pages/admin/CVsPage";
import AddCVPage from "../pages/admin/AddCVPage";
import AddUserPage from "../pages/admin/AddUserForm";
import UsersPage from "../pages/admin/UsersPage";

export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  MY_CV: (id: string) => `/mycv/${id}`,

  ADMIN: {
    CVS: "/admin/cvs",
    CV: (id: string) => `/admin/cvs/${id}`,
    NEW_CV: "/admin/cvs/new",
    USERS: "/admin/users",
    USER: (id: string) => `/admin/users/${id}`,
    NEW_USER: "/admin/users/new",
  },
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginForm />} />

      <Route element={<ProtectedRoute requireOwner />}>
        <Route path={ROUTES.MY_CV(":id")} element={<EditCVPage />} />
      </Route>

      {/* Admin-routes: */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path={ROUTES.ADMIN.CVS} element={<CVsPage />} />
        <Route path={ROUTES.ADMIN.CV(":id")} element={<EditCVPage />} />
        <Route path={ROUTES.ADMIN.NEW_CV} element={<AddCVPage />} />
        <Route path={ROUTES.ADMIN.USERS} element={<UsersPage />} />
        <Route path={ROUTES.ADMIN.USER(":id")} element={<EditUserPage />} />
        <Route path={ROUTES.ADMIN.NEW_USER} element={<AddUserPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
