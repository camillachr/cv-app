import { Experience } from "../../../types/types";

interface ExperienceSectionProps {
  experience?: Experience[];
}

const ExperienceSection = ({ experience }: ExperienceSectionProps) => (
  <section className="cv-section">
    <h3>Experience</h3>
    {experience && experience.length > 0 ? (
      <ul>
        {experience.map((exp, index) => (
          <li key={index}>
            <p>
              <strong>{exp.jobTitle}</strong> at {exp.company}
            </p>
            <p>
              {exp.startDate} - {exp.endDate || "Present"}
            </p>
            {exp.description && <p>{exp.description}</p>}
          </li>
        ))}
      </ul>
    ) : (
      <p>No experience added yet.</p>
    )}
  </section>
);

export default ExperienceSection;
