import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../features/users/LoginForm";
import CVsPage from "../pages/CVsPage";
import UserList from "../features/users/UserList";
import UserDetailsPage from "../pages/UserDetailsPage";
import AddUserForm from "../features/users/AddUserForm";
//import ProtectedRoute from "../components/ProtectedRoute";
import CVDetailsPage from "../pages/CVDetailsPage";
import AddCVForm from "../features/cv/AddCVForm";

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
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.MY_CV(":id")} element={<CVDetailsPage />} />

      {/* Admin-routes: */}
      <Route path={ROUTES.ADMIN.CVS} element={<CVsPage />} />
      <Route path={ROUTES.ADMIN.CV(":id")} element={<CVDetailsPage />} />
      <Route path={ROUTES.ADMIN.NEW_CV} element={<AddCVForm />} />

      <Route path={ROUTES.ADMIN.USERS} element={<UserList />} />
      <Route path={ROUTES.ADMIN.USER(":id")} element={<UserDetailsPage />} />
      <Route path={ROUTES.ADMIN.NEW_USER} element={<AddUserForm />} />
    </Routes>
  );
};

export default AppRoutes;
