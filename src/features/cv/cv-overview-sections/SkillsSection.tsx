interface SkillsSectionProps {
  skills?: string[];
}

const SkillsSection = ({ skills }: SkillsSectionProps) => (
  <section className="cv-section">
    <h3>Skills</h3>
    {skills && skills.length > 0 ? (
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    ) : (
      <p>No skills added yet.</p>
    )}
  </section>
);

export default SkillsSection;
