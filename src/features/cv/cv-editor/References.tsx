import { useState, useEffect } from "react";
import { useUpdateCVMutation } from "../../../redux/apiSlice";
import { CV, References as ReferencesType } from "../../../types/types";

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

  useEffect(() => {
    setReferences(cv.references || []);
  }, [cv]);

  const handleReferenceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewReference((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReference = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      newReference.name &&
      newReference.contactInfo &&
      newReference.relationship
    ) {
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
      <form onSubmit={handleSubmit}>
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
        <button type="button" onClick={handleAddReference}>
          + Add Reference
        </button>
        <ul>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save changes"}
        </button>
        {isSuccess && <p>References updated successfully!</p>}
        {isError && <p>Error updating references. Please try again.</p>}
      </form>
    </div>
  );
};

export default References;
