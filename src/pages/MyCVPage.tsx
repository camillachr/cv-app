import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCreateCVMutation, useGetAllCVsQuery } from "../redux/apiSlice";
import { CVPost } from "../types/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/AppRoutes";

//! IKKE I BRUK
const MyCVPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: cvs, isLoading: isLoadingCVs } = useGetAllCVsQuery();
  const [createCV, { isLoading, isError }] = useCreateCVMutation();
  const navigate = useNavigate();

  if (!user) {
    return <p>You need to log in to access this page.</p>;
  }

  // const userCV = cvs?.find((cv) => cv.userId === user.id);

  if (isLoadingCVs) {
    return <p>Loading...</p>;
  }

  const initialCV: CVPost = {
    userId: user?.id,
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

  const handleCreate = async () => {
    try {
      const createdCV = await createCV(initialCV).unwrap();
      navigate(ROUTES.MY_CV(createdCV._uuid));
    } catch (error) {
      console.error("Failed to create cv:", error);
    }
  };

  return (
    <div>
      <h2>Ready to get your dream job?</h2>
      <p>
        "Start where you are. Use what you have. Do what you can." – Arthur Ashe
      </p>
      <button onClick={handleCreate} disabled={isLoading}>
        {isLoading ? "Creating CV..." : "Create CV"}
      </button>

      {isError && <p>There was an error, please try again.</p>}
    </div>
  );
};

export default MyCVPage;
