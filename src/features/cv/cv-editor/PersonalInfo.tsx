import { useEffect, useState } from "react";
import { useUpdateCVMutation } from "../../../redux/apiSlice";
import { CV, CVPost } from "../../../types/types";
import SaveCVBtn from "../../../components/SaveCVBtn";

type SkillsType = CVPost["skills"];

interface PersonalInfoProps {
  cv?: CV;
}

const PersonalInfo = ({ cv }: PersonalInfoProps) => {
  if (!cv) {
    return <p>No CV data available.</p>;
  }

  const [updateCV, { isLoading, isError, isSuccess }] = useUpdateCVMutation();

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [] as SkillsType,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [newSkill, setNewSkill] = useState("");

  // Fyller ut felter ved render
  useEffect(() => {
    setPersonalInfo({
      name: cv.personalInfo?.name || "",
      email: cv.personalInfo?.email || "",
      phone: cv.personalInfo?.phone || "",
      skills: cv.skills || [],
    });
  }, [cv]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "name" && value.trim()) {
      setErrorMessage(null); // Fjern feilmelding når name er utfylt
    }
  };

  const validateFields = () => {
    if (!personalInfo.name.trim()) {
      setErrorMessage("Name is requried.");
      return false;
    }
    return true;
  };

  // Skills
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
  };

  const handleSkillAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!newSkill.trim()) return;

    if (personalInfo.skills?.includes(newSkill.trim())) {
      setErrorMessage("Skill already exists.");
      return;
    }

    setPersonalInfo((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill.trim()],
    }));
    setNewSkill("");
    setErrorMessage(null); // Fjern feilmelding etter vellykket legg til
  };

  const handleSkillRemove = (index: number) => {
    setPersonalInfo((prev) => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    try {
      await updateCV({
        id: cv._uuid!,
        data: {
          userId: cv.userId,
          personalInfo: {
            name: personalInfo.name,
            email: personalInfo.email,
            phone: personalInfo.phone,
          },
          skills: personalInfo.skills,
        },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update CV:", error);
    }
  };

  return (
    <div>
      <h2>Personal Info</h2>

      <form className="cv-section-form" onSubmit={handleSubmit}>
        <div className="cv-form-add">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={personalInfo.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handleInputChange}
              placeholder="Enter email adress"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <h3>Skills</h3>
            <input
              type="text"
              value={newSkill}
              onChange={handleSkillChange}
              placeholder="Enter a skill"
            />

            {isSuccess && <p>Changes saved!</p>}
            {isError && <p>Error saving changes. Please try again.</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>

          <div className="btn-container">
            <button onClick={handleSkillAdd} disabled={!newSkill.trim()}>
              + Add skill
            </button>
            <SaveCVBtn isLoading={isLoading} />
          </div>
        </div>
        <ul className="cv-form-ul">
          {personalInfo.skills?.map((skill, index) => (
            <li key={index}>
              {skill}
              <button
                type="button"
                onClick={() => handleSkillRemove(index)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "white",
                  color: "red",
                }}
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

export default PersonalInfo;
