import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { CV } from "../../../types/types";

interface OverviewPDFTypes {
  cv: CV;
  exportOptions: {
    selectedSkills: string[];
    selectedCertificates: string[];
    selectedReferences: string[];
  };
}

const CVPDFViewer = ({ cv, exportOptions }: OverviewPDFTypes) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: "Helvetica",
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: "center",
      textTransform: "uppercase",
    },
    section: {
      marginBottom: 15,
      paddingBottom: 10,
      borderBottom: "1px solid lightgray",
    },
    text: {
      marginBottom: 5,
      fontSize: 12,
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
      color: "#2b6777",
    },
  });

  return (
    <PDFViewer style={{ width: "100%", height: "90vh" }}>
      <Document>
        <Page style={styles.page} size="A4">
          {/* Header */}
          <Text style={styles.header}>CV</Text>

          {/* Personal Info */}
          <View style={styles.section}>
            <Text style={styles.title}>Personal Information</Text>
            <Text style={styles.text}>Name: {cv.personalInfo?.name}</Text>
            <Text style={styles.text}>Email: {cv.personalInfo?.email}</Text>
            <Text style={styles.text}>Phone: {cv.personalInfo?.phone}</Text>
          </View>

          {/* Skills */}
          {exportOptions.selectedSkills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Skills</Text>
              {exportOptions.selectedSkills.map((skill, index) => (
                <Text key={index} style={styles.text}>
                  - {skill}
                </Text>
              ))}
            </View>
          )}

          {/* Education */}
          {cv.education && cv.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Education</Text>
              {cv.education?.map((education, index) => (
                <Text key={index} style={styles.text}>
                  - {education.institution} - {education.degree} (
                  {education.startYear} - {education.endYear || "Present"}):{" "}
                </Text>
              ))}
            </View>
          )}

          {/* Certificates */}
          {exportOptions.selectedCertificates.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Certificates</Text>
              {cv.certificates
                ?.filter((certificate) =>
                  exportOptions.selectedCertificates.includes(certificate.title)
                )
                .map((certificate, index) => (
                  <Text key={index} style={styles.text}>
                    - {certificate.title} issued by {certificate.issuer} on{" "}
                    {certificate.date}: {certificate.description}
                  </Text>
                ))}
            </View>
          )}

          {/* Experience */}
          {cv.experience && cv.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Experience</Text>
              {cv.experience?.map((experience, index) => (
                <Text key={index} style={styles.text}>
                  - {experience.jobTitle} at {experience.company} (
                  {experience.startDate} - {experience.endDate || "Present"}):{" "}
                  {experience.description}
                </Text>
              ))}
            </View>
          )}

          {/* References */}
          {exportOptions.selectedReferences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>References</Text>
              {cv.references
                ?.filter((reference) =>
                  exportOptions.selectedReferences.includes(reference.name)
                )
                .map((reference, index) => (
                  <Text key={index} style={styles.text}>
                    - {reference.name} ({reference.relationship}):{" "}
                    {reference.contactInfo}
                  </Text>
                ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CVPDFViewer;
