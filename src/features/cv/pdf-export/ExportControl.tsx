import { CV } from "../../../types/types";

interface ExportOptions {
  selectedSkills: string[];
  selectedCertificates: string[];
  selectedReferences: string[];
}

interface ExportControlProps {
  cv: CV;
  options: ExportOptions;
  setOptions: (options: ExportOptions) => void;
}

const ExportControl = ({ cv, options, setOptions }: ExportControlProps) => {
  // Håndterer valg og fravalg av individuelle elementer, her fikk jeg litt hjelp av chat-GTP
  const handleSelectItem = (
    section: keyof ExportOptions,
    item: string,
    isSelected: boolean
  ) => {
    setOptions({
      ...options,
      [section]: isSelected
        ? [...(options[section] as string[]), item]
        : (options[section] as string[]).filter((i) => i !== item),
    });
  };

  return (
    <div className="export-control">
      {/* Skills */}
      {cv.skills && cv.skills.length > 0 && (
        <div>
          <h3>Skills</h3>
          {cv.skills?.map((skill, index) => (
            <label key={index} style={{ display: "block", marginLeft: "20px" }}>
              <input
                type="checkbox"
                checked={options.selectedSkills.includes(skill)}
                onChange={(e) =>
                  handleSelectItem("selectedSkills", skill, e.target.checked)
                }
              />
              {skill}
            </label>
          ))}
        </div>
      )}

      {/* Certificates */}
      {cv.certificates && cv.certificates.length > 0 && (
        <div>
          <h3>Certificates</h3>
          {cv.certificates.map((certificate, index) => (
            <label key={index} style={{ display: "block", marginLeft: "20px" }}>
              <input
                type="checkbox"
                checked={options.selectedCertificates.includes(
                  certificate.title
                )}
                onChange={(e) =>
                  handleSelectItem(
                    "selectedCertificates",
                    certificate.title,
                    e.target.checked
                  )
                }
              />
              {certificate.title}
            </label>
          ))}
        </div>
      )}

      {/* References */}
      {cv.references && cv.references.length > 0 && (
        <div>
          <h3>References</h3>
          {cv.references.map((reference, index) => (
            <label key={index} style={{ display: "block", marginLeft: "20px" }}>
              <input
                type="checkbox"
                checked={options.selectedReferences.includes(reference.name)}
                onChange={(e) =>
                  handleSelectItem(
                    "selectedReferences",
                    reference.name,
                    e.target.checked
                  )
                }
              />
              {reference.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportControl;
