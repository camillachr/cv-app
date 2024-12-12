import { useNavigate } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useGetAllCVsQuery,
  useCreateCVMutation,
} from "../../redux/apiSlice";
import { CVPost, User } from "../../types/types";
import { ROUTES } from "../../routes/AppRoutes";
import { useState } from "react";

const AddCVPage = () => {
  const navigate = useNavigate();
  const {
    data: users,
    error: usersError,
    isLoading: isLoadingUsers,
  } = useGetAllUsersQuery();
  const {
    data: cvs,
    error: cvsError,
    isLoading: isLoadingCVs,
  } = useGetAllCVsQuery();

  const [createCV, { isError: createCVError }] = useCreateCVMutation();
  const [creatingUserId, setCreatingUserId] = useState<string | null>(null); // Holder styr på hvilken bruker som behandles

  // Finn brukere som ikke allerede har en CV og som har rollen "user"
  const usersWithoutCV = users?.filter(
    (user) =>
      user.role === "user" && !cvs?.some((cv) => cv.userId === user._uuid)
  );
  const handleCreateCV = async (user: User) => {
    setCreatingUserId(user._uuid);
    try {
      const initialCV: CVPost = {
        userId: user._uuid,
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
      navigate(ROUTES.ADMIN.CV(createdCV._uuid));
    } catch (error) {
      console.error("Failed to create CV:", error);
    } finally {
      setCreatingUserId(null);
    }
  };

  if (isLoadingUsers || isLoadingCVs) {
    return <p>Loading...</p>;
  }

  if (usersError || cvsError) {
    return <p>Error loading data. Please try again later.</p>;
  }

  if (!usersWithoutCV) return null;

  return (
    <div>
      <h1>Add CV</h1>
      <h2>Users currently without a CV:</h2>

      {usersWithoutCV?.length > 0 ? (
        <ul>
          {usersWithoutCV.map((user) => (
            <li key={user._uuid}>
              {user.name} ({user.email})
              <button
                onClick={() => handleCreateCV(user)}
                disabled={!!creatingUserId}
              >
                {creatingUserId === user._uuid ? "Creating..." : "Create CV"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>All users already have a CV.</p>
      )}

      {createCVError && (
        <p style={{ color: "red" }}>
          Error creating CV. Please try again later.
        </p>
      )}
    </div>
  );
};

export default AddCVPage;
