import { useNavigate } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useGetAllCVsQuery,
  useCreateCVMutation,
} from "../../redux/apiSlice";
import { CVPost, User } from "../../types/types";
import { ROUTES } from "../../routes/AppRoutes";

const AddCVForm = () => {
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

  const [createCV, { isLoading: isCreatingCV, isError: createCVError }] =
    useCreateCVMutation();

  // Finn brukere som ikke allerede har en CV
  const usersWithoutCV = users?.filter(
    (user) => !cvs?.some((cv) => cv.userId === user._uuid)
  );

  //! Denne brukes også på HomePage, legg den i utils?
  const handleCreateCV = async (user: User) => {
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
      navigate(ROUTES.MY_CV(createdCV._uuid));
    } catch (error) {
      console.error("Failed to create CV:", error);
    }
  };

  if (isLoadingUsers || isLoadingCVs) {
    return <p>Loading...</p>;
  }

  if (usersError || cvsError) {
    return <p>Error loading data. Please try again later.</p>;
  }

  if (!usersWithoutCV) return;
  return (
    <div>
      <h1>Add CV</h1>
      <h2>Select a user to create a CV for:</h2>
      {usersWithoutCV?.length > 0 ? (
        <ul>
          {usersWithoutCV.map((user) => (
            <li key={user._uuid}>
              {user.name} ({user.email})
              <button onClick={() => handleCreateCV(user)}>Create CV</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>All users already have a CV.</p>
      )}
    </div>
  );
};

export default AddCVForm;
