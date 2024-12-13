import { useState } from "react";
import { useGetAllUsersQuery } from "../redux/apiSlice";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/AppRoutes";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: users, isLoading: isUsersLoading } = useGetAllUsersQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returnerer false ved error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Stopper innloggin dersom users ikke er hentet enda
    if (isUsersLoading) {
      setErrors({ username: "Loading, please wait..." });
      setIsLoading(false);
      return;
    }

    // Hvis validering feiler, stopper innlogging
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const user = users?.find((user) => user.username === formData.username);

      if (!user || user.password !== formData.password) {
        throw new Error("Invalid username or password");
      }

      // Logger inn brukeren
      dispatch(
        login({
          id: user._uuid,
          name: user.name,
          username: user.username,
          role: user.role || "user",
        })
      );

      navigate(ROUTES.ROOT);
    } catch (err: any) {
      setErrors({ password: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Login</h2>

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

      <button
        type="submit"
        disabled={isLoading || isUsersLoading}
        style={{ marginTop: "10px" }}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {/* Feilmeldinger */}
      {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
    </form>
  );
};

export default LoginForm;
