import { useNavigate, useParams } from "react-router-dom";
import { useDeleteCVMutation } from "../../../redux/apiSlice";

const Overview = () => {
  const { id } = useParams();
  const [deleteCV, { isLoading: isDeleting }] = useDeleteCVMutation();
  const navigate = useNavigate();

  if (!id) return;

  const handleDeleteCV = async () => {
    if (window.confirm("Are you sure you want to delete this CV?")) {
      try {
        await deleteCV(id).unwrap();
        navigate(-1);
      } catch (error) {
        console.error("Failed to delete CV:", error);
        alert("Error deleting CV. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Overview</h2>

      <p>Hele CVn skal inn her</p>

      <button
        onClick={handleDeleteCV}
        disabled={isDeleting}
        style={{ backgroundColor: "red", color: "white", marginBottom: "10px" }}
      >
        {isDeleting ? "Deleting..." : "Delete CV"}
      </button>
    </div>
  );
};

export default Overview;
