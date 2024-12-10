interface PersonalInfoSectionProps {
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

const PersonalInfoSection = ({ personalInfo }: PersonalInfoSectionProps) => (
  <section className="cv-section">
    <h3>Personal Information</h3>
    <p>
      <strong>Name:</strong> {personalInfo?.name || "N/A"}
    </p>
    <p>
      <strong>Email:</strong> {personalInfo?.email || "N/A"}
    </p>
    <p>
      <strong>Phone:</strong> {personalInfo?.phone || "N/A"}
    </p>
  </section>
);

export default PersonalInfoSection;
