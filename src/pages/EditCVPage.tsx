import { useState } from "react";
import Overview from "../features/cv/cv-editor/Overview";
import PersonalInfo from "../features/cv/cv-editor/PersonalInfo";
import Education from "../features/cv/cv-editor/Education";
import Experience from "../features/cv/cv-editor/Experience";
import { useParams } from "react-router-dom";
import { useGetAllUsersQuery, useGetCVQuery } from "../redux/apiSlice";
import Certificates from "../features/cv/cv-editor/Certificates";
import References from "../features/cv/cv-editor/References";
import ExportPage from "../features/cv/pdf-export/ExportPage";

const EditCVPage = () => {
  const { id } = useParams();

  const {
    data: cv,
    isLoading: isLoadingCV,
    isError: isErrorCV,
  } = useGetCVQuery(id!);

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetAllUsersQuery();

  const cvOwner = users?.find((user) => user._uuid === cv?.userId);

  const sections = [
    { key: "overview", label: "Overview", content: <Overview cv={cv} /> },
    {
      key: "personalInfo",
      label: "Personal Info",
      content: <PersonalInfo cv={cv} />,
    },
    { key: "education", label: "Education", content: <Education cv={cv} /> },
    {
      key: "certificates",
      label: "Certificates",
      content: <Certificates cv={cv} />,
    },
    { key: "experience", label: "Experience", content: <Experience cv={cv} /> },
    { key: "references", label: "References", content: <References cv={cv} /> },
    { key: "pdfExport", label: "PDF Export", content: <ExportPage cv={cv} /> },
  ];

  const [activeSection, setActiveSection] = useState("overview");

  if (isLoadingCV || isLoadingUsers) {
    return <p>Loading...</p>;
  }

  if (isErrorCV || isErrorUsers || !cv) {
    return <p>Error fetching CV or user data. Please try again later.</p>;
  }

  return (
    <div>
      <h1>CV for {cvOwner?.name || "Unknown User"}</h1>
      <div className="cv-editor">
        <nav className="cv-editor-nav">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={activeSection === section.key ? "active" : ""}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <div className="editor-active-section">
          {sections.find((section) => section.key === activeSection)
            ?.content || <p>Invalid section</p>}
        </div>
      </div>
    </div>
  );
};

export default EditCVPage;
