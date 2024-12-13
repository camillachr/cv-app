import { useState } from "react";
import { UserPost } from "../../types/types";
import { useCreateUserMutation } from "../../redux/apiSlice";
import GoBackBtn from "../../components/GoBackBtn";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); //chat-GTP hjalp meg her
const isValidPassword = (password: string) => password.length >= 6;

const AddUserPage = () => {
  const [formData, setFormData] = useState<UserPost>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user", // standard
  });

  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      return setErrorMessage("Please enter a valid email address.");
    }
    if (!isValidPassword(formData.password)) {
      return setErrorMessage("Password must be at least 6 characters long.");
    }
    try {
      await createUser(formData).unwrap();
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error: any) {
      console.error("Failed to add user:", error);
      setErrorMessage(error.data?.message || "Something went wrong.");
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
        {isSuccess && <p>User added! Go back to view user.</p>}
        {isError && <p>There was an error, please try again.</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddUserPage;
