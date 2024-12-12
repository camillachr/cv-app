import { useState, useEffect } from "react";
import { useUpdateCVMutation } from "../../../redux/apiSlice";
import { CV, Education as EducationType } from "../../../types/types";
import SaveCVBtn from "../../../components/SaveCVBtn";
import RemoveItemBtn from "../../../components/RemoveItemBtn";

interface EducationProps {
  cv?: CV;
}

const Education = ({ cv }: EducationProps) => {
  if (!cv) {
    return <p>No CV data available.</p>;
  }

  const [updateCV, { isLoading, isError, isSuccess }] = useUpdateCVMutation();

  const [education, setEducation] = useState<EducationType[]>([]);
  const [newEducation, setNewEducation] = useState<EducationType>({
    institution: "",
    degree: "",
    startYear: "",
    endYear: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fyller ut felter ved render
  useEffect(() => {
    setEducation(cv.education || []);
  }, [cv]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(null);
  };

  const validateFields = () => {
    if (
      !newEducation.institution.trim() ||
      !newEducation.degree.trim() ||
      !newEducation.startYear.trim()
    ) {
      setErrorMessage("Must fill out requried fields.");
      return false;
    }
    return true;
  };

  const handleAddEducation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateFields()) {
      setEducation((prev) => [...prev, newEducation]);
      setNewEducation({
        institution: "",
        degree: "",
        startYear: "",
        endYear: "",
      });
    }
  };

  const handleRemoveEducation = (index: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCV({
        id: cv._uuid!,
        data: {
          userId: cv.userId,
          education,
        },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update CV:", error);
    }
  };

  return (
    <div>
      <h2>Education</h2>
      <form className="cv-section-form" onSubmit={handleSubmit}>
        <div className="cv-form-add">
          <div>
            <label htmlFor="institution">Institution</label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={newEducation.institution}
              onChange={handleInputChange}
              placeholder="Enter institution name"
            />
          </div>
          <div>
            <label htmlFor="degree">Degree</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={newEducation.degree}
              onChange={handleInputChange}
              placeholder="Enter degree"
            />
          </div>
          <div>
            <label htmlFor="startYear">Start Year</label>
            <input
              type="text"
              id="startYear"
              name="startYear"
              value={newEducation.startYear}
              onChange={handleInputChange}
              placeholder="Enter start year (YYYY)"
            />
          </div>
          <div>
            <label htmlFor="endYear">End Year (optional)</label>
            <input
              type="text"
              id="endYear"
              name="endYear"
              value={newEducation.endYear || ""}
              onChange={handleInputChange}
              placeholder="Enter end year (YYYY)"
            />
          </div>
          <div className="btn-container">
            <button type="button" onClick={handleAddEducation}>
              + Add Education
            </button>
            <SaveCVBtn isLoading={isLoading} />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {isSuccess && <p>Changes saved successfully!</p>}
          {isError && <p>Error saving changes. Please try again.</p>}
        </div>

        <ul className="cv-form-ul">
          {education.map((education, index) => (
            <li key={index} style={{ display: "flex" }}>
              <p>
                {education.institution} - {education.degree} (
                {education.startYear}
                {education.endYear ? ` - ${education.endYear}` : " - Present"})
              </p>
              <RemoveItemBtn
                onClick={() => handleRemoveEducation(index)}
                size={20}
                color="red"
                style={{ marginLeft: "10px" }}
              />
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Education;
