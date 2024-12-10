import { References } from "../../../types/types";

interface ReferencesSectionProps {
  references?: References[];
}

const ReferencesSection = ({ references }: ReferencesSectionProps) => (
  <section className="cv-section">
    <h3>References</h3>
    {references && references.length > 0 ? (
      <ul>
        {references.map((ref, index) => (
          <li key={index}>
            <p>
              <strong>{ref.name}</strong> ({ref.relationship})
            </p>
            <p>Contact: {ref.contactInfo}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No references added yet.</p>
    )}
  </section>
);

export default ReferencesSection;
