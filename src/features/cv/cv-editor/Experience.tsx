import { useState, useEffect } from "react";
import { useUpdateCVMutation } from "../../../redux/apiSlice";
import { CV, Experience as ExperienceType } from "../../../types/types";
import SaveCVBtn from "../../../components/SaveCVBtn";

interface ExperienceProps {
  cv?: CV;
}

const Experience = ({ cv }: ExperienceProps) => {
  if (!cv) {
    return <p>No CV data available.</p>;
  }

  const [updateCV, { isLoading, isError, isSuccess }] = useUpdateCVMutation();

  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [newExperience, setNewExperience] = useState<ExperienceType>({
    company: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setExperiences(cv.experience || []);
  }, [cv]);

  const handleExperienceInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(null);
  };

  const validateFields = () => {
    if (
      !newExperience.company.trim() ||
      !newExperience.jobTitle.trim() ||
      !newExperience.startDate.trim()
    ) {
      setErrorMessage("Must fill out Company, Job title and Start Date.");
      return false;
    }
    return true;
  };

  const handleAddExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateFields()) {
      setExperiences((prev) => [...prev, newExperience]);
      setNewExperience({
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCV({
        id: cv._uuid!,
        data: { userId: cv.userId, experience: experiences },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update experience:", error);
    }
  };

  return (
    <div>
      <h2>Experience</h2>
      <form className="cv-section-form" onSubmit={handleSubmit}>
        <div className="cv-form-add">
          <div>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={newExperience.company}
              onChange={handleExperienceInputChange}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={newExperience.jobTitle}
              onChange={handleExperienceInputChange}
              placeholder="Enter job title"
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={newExperience.startDate}
              onChange={handleExperienceInputChange}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={newExperience.endDate || ""}
              onChange={handleExperienceInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newExperience.description || ""}
              onChange={handleExperienceInputChange}
              placeholder="Enter description (optional)"
            />
          </div>
          <div className="btn-container">
            <button type="button" onClick={handleAddExperience}>
              + Add Experience
            </button>
            <SaveCVBtn isLoading={isLoading} />
          </div>
          {isSuccess && <p>Experience updated successfully!</p>}
          {isError && <p>Error updating experience. Please try again.</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        <ul className="cv-form-ul">
          {experiences.map((exp, index) => (
            <li key={index}>
              <p>
                {exp.jobTitle} at {exp.company} ({exp.startDate}
                {exp.endDate ? ` to ${exp.endDate}` : " to Present"})
                {exp.description ? `: ${exp.description}` : ""}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Experience;
