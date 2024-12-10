import { useNavigate, useParams } from "react-router-dom";
import { useDeleteCVMutation } from "../../../redux/apiSlice";
import { CV } from "../../../types/types";
import PersonalInfoSection from "../cv-overview-sections/PersonalInfoSection";
import SkillsSection from "../cv-overview-sections/SkillsSection";
import EducationSection from "../cv-overview-sections/EducationSection";
import ExperienceSection from "../cv-overview-sections/ExperienceSection";
import CertificatesSection from "../cv-overview-sections/CertificatesSection";
import ReferencesSection from "../cv-overview-sections/ReferencesSection";
import DeleteButton from "../../../components/DeleteButton";

interface OverviewProps {
  cv?: CV;
}

const Overview = ({ cv }: OverviewProps) => {
  const { id } = useParams();
  const [deleteCV, { isLoading: isDeleting }] = useDeleteCVMutation();
  const navigate = useNavigate();

  if (!cv || !id) return <p>No CV data available.</p>;

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
      <PersonalInfoSection personalInfo={cv.personalInfo} />
      <SkillsSection skills={cv.skills} />
      <EducationSection education={cv.education} />
      <ExperienceSection experience={cv.experience} />
      <CertificatesSection certificates={cv.certificates} />
      <ReferencesSection references={cv.references} />

      <DeleteButton
        onDelete={handleDeleteCV}
        isDeleting={isDeleting}
        text="Delete CV"
      />
    </div>
  );
};

export default Overview;
