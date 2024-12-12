import { useState, useEffect } from "react";
import { useUpdateCVMutation } from "../../../redux/apiSlice";
import { CV, References as ReferencesType } from "../../../types/types";
import SaveCVBtn from "../../../components/SaveCVBtn";

interface ReferencesProps {
  cv?: CV;
}

const References = ({ cv }: ReferencesProps) => {
  if (!cv) {
    return <p>No CV data available.</p>;
  }

  const [updateCV, { isLoading, isError, isSuccess }] = useUpdateCVMutation();

  const [references, setReferences] = useState<ReferencesType[]>([]);
  const [newReference, setNewReference] = useState<ReferencesType>({
    name: "",
    contactInfo: "",
    relationship: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setReferences(cv.references || []);
  }, [cv]);

  const handleReferenceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewReference((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(null);
  };

  const validateFields = () => {
    if (
      !newReference.name.trim() ||
      !newReference.contactInfo.trim() ||
      !newReference.relationship.trim()
    ) {
      setErrorMessage("Must fill out requried fields.");
      return false;
    }
    return true;
  };

  const handleAddReference = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateFields()) {
      setReferences((prev) => [...prev, newReference]);
      setNewReference({
        name: "",
        contactInfo: "",
        relationship: "",
      });
    }
  };

  const handleRemoveReference = (index: number) => {
    setReferences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCV({
        id: cv._uuid!,
        data: { userId: cv.userId, references },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update references:", error);
    }
  };

  return (
    <div>
      <h2>References</h2>
      <form className="cv-section-form" onSubmit={handleSubmit}>
        <div className="cv-form-add">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newReference.name}
              onChange={handleReferenceInputChange}
              placeholder="Enter name"
            />
          </div>
          <div>
            <label htmlFor="contactInfo">Contact Info</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={newReference.contactInfo}
              onChange={handleReferenceInputChange}
              placeholder="Enter contact information"
            />
          </div>
          <div>
            <label htmlFor="relationship">Relationship</label>
            <input
              type="text"
              id="relationship"
              name="relationship"
              value={newReference.relationship}
              onChange={handleReferenceInputChange}
              placeholder="Enter relationship"
            />
          </div>
          <div className="btn-container">
            <button type="button" onClick={handleAddReference}>
              + Add Reference
            </button>
            <SaveCVBtn isLoading={isLoading} />
          </div>
          {isSuccess && <p>References updated successfully!</p>}
          {isError && <p>Error updating references. Please try again.</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>

        <ul className="cv-form-ul">
          {references.map((ref, index) => (
            <li key={index}>
              <p>
                {ref.name} ({ref.relationship}) - {ref.contactInfo}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveReference(index)}
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

export default References;
