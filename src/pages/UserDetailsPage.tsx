import { useState } from "react";
import GoBackBtn from "../components/GoBackBtn";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../redux/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../routes/AppRoutes";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users.</p>;

  const user = users?.find((user) => user._uuid === id);
  if (!user) return <p>User not found.</p>;

  // Lokal state for felter som kan redigeres direkte
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateUser({ id: user._uuid, data: formData }).unwrap();
      navigate(ROUTES.ADMIN.USERS);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user._uuid).unwrap();
      navigate(ROUTES.ADMIN.USERS);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </form>

      <div className="btn-container">
        <button onClick={handleSaveChanges} disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            backgroundColor: "red",
            color: "white",
          }}
        >
          {isDeleting ? "Deleting..." : "Delete user"}
        </button>
        <GoBackBtn />
      </div>
    </div>
  );
};
export default UserDetails;
