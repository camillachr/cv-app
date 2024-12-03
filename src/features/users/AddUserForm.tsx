import { useState } from "react";
import { UserPost } from "../../types/types";
import { useCreateUserMutation } from "../../redux/apiSlice";
import GoBackBtn from "../../components/GoBackBtn";

const AddUserForm = () => {
  const [formData, setFormData] = useState<UserPost>({
    name: "",
    email: "",
    password: "",
    role: "user", // standard
  });

  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData).unwrap();
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Add New User</h2>

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
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="btn-container">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding User..." : "Add User"}
          </button>
          <GoBackBtn />
        </div>
        {isSuccess && <p>User added!</p>}
        {isError && <p>There was an error, please try again.</p>}
      </form>
    </div>
  );
};

export default AddUserForm;
