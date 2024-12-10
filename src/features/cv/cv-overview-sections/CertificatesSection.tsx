import { Certificate } from "../../../types/types";

interface CertificatesSectionProps {
  certificates?: Certificate[];
}

const CertificatesSection = ({ certificates }: CertificatesSectionProps) => (
  <section className="cv-section">
    <h3>Certificates</h3>
    {certificates && certificates.length > 0 ? (
      <ul>
        {certificates.map((cert, index) => (
          <li key={index}>
            <p>
              <strong>{cert.title}</strong> issued by {cert.issuer}
            </p>
            <p>Date: {cert.date}</p>
            {cert.description && <p>{cert.description}</p>}
          </li>
        ))}
      </ul>
    ) : (
      <p>No certificates added yet.</p>
    )}
  </section>
);

export default CertificatesSection;
