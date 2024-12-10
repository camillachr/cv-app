import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCreateCVMutation } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/AppRoutes";
import useUserCV from "../hooks/useUserCV";
import { CVPost } from "../types/types";
import AdminDashboard from "./admin/AdminDashboard";

const HomePage = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { cv: userCV, isLoading: isLoadingCVs } = useUserCV();
  const [createCV, { isLoading, isError }] = useCreateCVMutation();
  const navigate = useNavigate();

  if (isLoadingCVs) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Create, Customize, Conquer</h2>
        <h1>Your Dynamic CV Awaits!</h1>
      </div>
    );
  }

  const isAdmin = isAuthenticated && user?.role === "admin";

  if (isAdmin) {
    return <AdminDashboard />;
  }

  const handleCreate = async () => {
    try {
      const initialCV: CVPost = {
        userId: user?.id!,
        personalInfo: {
          name: user?.name || "",
          email: "",
          phone: "",
        },
        skills: [],
        education: [],
        certificates: [],
        experience: [],
        references: [],
      };

      const createdCV = await createCV(initialCV).unwrap();
      navigate(ROUTES.MY_CV(createdCV._uuid));
    } catch (error) {
      console.error("Failed to create CV:", error);
    }
  };

  if (!userCV) {
    return (
      <div>
        <h1>Welcome, {user?.name}!</h1>
        <h2>Ready to get your dream job?</h2>
        <p>
          "Start where you are. Use what you have. Do what you can." – Arthur
          Ashe
        </p>
        <button onClick={handleCreate} disabled={isLoading}>
          {isLoading ? "Creating CV..." : "Create CV"}
        </button>
        {isError && <p>There was an error, please try again.</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome back, {user?.name}!</h1>
    </div>
  );
};

export default HomePage;
