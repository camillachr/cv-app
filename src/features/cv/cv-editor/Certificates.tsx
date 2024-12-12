import { useState, useEffect } from "react";
import { useUpdateCVMutation } from "../../../redux/apiSlice";
import { CV, Certificate as CertificateType } from "../../../types/types";
import SaveCVBtn from "../../../components/SaveCVBtn";

interface CertificatesProps {
  cv?: CV;
}

const Certificates = ({ cv }: CertificatesProps) => {
  if (!cv) {
    return <p>No CV data available.</p>;
  }

  const [updateCV, { isLoading, isError, isSuccess }] = useUpdateCVMutation();

  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const [newCertificate, setNewCertificate] = useState<CertificateType>({
    title: "",
    issuer: "",
    date: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setCertificates(cv.certificates || []);
  }, [cv]);

  const handleCertificateInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCertificate((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(null);
  };

  const validateFields = () => {
    if (
      !newCertificate.title.trim() ||
      !newCertificate.issuer.trim() ||
      !newCertificate.date.trim()
    ) {
      setErrorMessage("Must fill out required fields.");
      return false;
    }
    return true;
  };

  const handleAddCertificate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateFields()) {
      setCertificates((prev) => [...prev, newCertificate]);
      setNewCertificate({
        title: "",
        issuer: "",
        date: "",
        description: "",
      });
    }
  };

  const handleRemoveCertificate = (index: number) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateCV({
        id: cv._uuid!,
        data: {
          userId: cv.userId,
          certificates,
        },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update certificates:", error);
    }
  };

  return (
    <div>
      <h2>Certificates</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newCertificate.title}
            onChange={handleCertificateInputChange}
            placeholder="Enter certificate title"
          />
        </div>
        <div>
          <label htmlFor="issuer">Issuer</label>
          <input
            type="text"
            id="issuer"
            name="issuer"
            value={newCertificate.issuer}
            onChange={handleCertificateInputChange}
            placeholder="Enter issuer"
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newCertificate.date}
            onChange={handleCertificateInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            name="description"
            value={newCertificate.description || ""}
            onChange={handleCertificateInputChange}
            placeholder="Enter description"
          />
        </div>
        <button type="button" onClick={handleAddCertificate}>
          + Add Certificate
        </button>

        <ul>
          {certificates.map((cert, index) => (
            <li key={index}>
              <p>
                {cert.title} issued by {cert.issuer} on {cert.date}
                {cert.description ? ` - ${cert.description}` : ""}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveCertificate(index)}
                style={{ color: "red", marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <SaveCVBtn isLoading={isLoading} />
        {isSuccess && <p>Changes saved successfully!</p>}
        {isError && <p>Error saving changes. Please try again.</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Certificates;
