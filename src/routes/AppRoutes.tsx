import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../features/users/LoginForm";
import CVsPage from "../pages/CVsPage";
import UserList from "../features/users/UserList";
import UserDetailsPage from "../pages/UserDetailsPage";
import AddUserForm from "../features/users/AddUserForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/cvs" element={<CVsPage />} />

      <Route path="/users" element={<UserList />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
      <Route path="users/new" element={<AddUserForm />} />
    </Routes>
  );
};

export default AppRoutes;
