import GoBackBtn from "../components/GoBackBtn";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../redux/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams(); // Henter ID fra URL
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  //const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users.</p>;

  const user = users?.find((user) => user._uuid === id);
  if (!user) return <p>User not found.</p>;

  const handleDelete = async () => {
    try {
      await deleteUser(user._uuid).unwrap();
      console.log("User deleted successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

  //  const handleUpdate = async () => {
  //    try {
  //      await updateUser(user._uuid).unwrap();
  //      console.log("User deleted successfully!");
  //      navigate("/users");
  //    } catch (error) {
  //      console.error("Failed to delete user:", error);
  //      alert("Error deleting user. Please try again.");
  //    }
  //  };

  // Lag en komponent/feature som heter userForm

  return (
    <div className="container">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <div className="btn-container">
        <button>Edit</button>
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        <GoBackBtn />
      </div>
    </div>
  );
};

export default UserDetails;
