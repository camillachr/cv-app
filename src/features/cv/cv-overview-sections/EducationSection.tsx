import { Education } from "../../../types/types";

interface EducationSectionProps {
  education?: Education[];
}

const EducationSection = ({ education }: EducationSectionProps) => (
  <section className="cv-section">
    <h3>Education</h3>
    {education && education.length > 0 ? (
      <ul>
        {education.map((edu, index) => (
          <li key={index}>
            <p>
              <strong>{edu.degree}</strong> at {edu.institution}
            </p>
            <p>
              {edu.startYear} - {edu.endYear || "Present"}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No education added yet.</p>
    )}
  </section>
);

export default EducationSection;
