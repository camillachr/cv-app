import { useState } from "react";
import Overview from "../features/cv/cv-editor/Overview";
import PersonalInfo from "../features/cv/cv-editor/PersonalInfo";
import Education from "../features/cv/cv-editor/Education";
import Experience from "../features/cv/cv-editor/Experience";
import { Navigate, useParams } from "react-router-dom";
import { useGetAllUsersQuery, useGetCVQuery } from "../redux/apiSlice";
import Certificates from "../features/cv/cv-editor/Certificates";
import References from "../features/cv/cv-editor/References";
import ExportPage from "../features/cv/pdf-export/ExportPage";
import { useSelector } from "react-redux";
import { ROUTES } from "../routes/AppRoutes";
import { RootState } from "../redux/store";

const EditCVPage = () => {
  const { id } = useParams();

  const {
    data: cv,
    isLoading: isLoadingCV,
    isError: isErrorCV,
  } = useGetCVQuery(id!); //"!" brukes for å indikere at id ikke er null eller undefined
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetAllUsersQuery();

  // Sjekker om brukeren er eier av CV
  const { user } = useSelector((state: RootState) => state.auth);

  if (user?.role === "user" && cv?.userId !== user?.id) {
    return <Navigate to={ROUTES.ROOT} />;
  }

  const cvOwner = users?.find((user) => user._uuid === cv?.userId);

  const sections = {
    overview: <Overview cv={cv} />,
    personalInfo: <PersonalInfo cv={cv} />,
    education: <Education cv={cv} />,
    certificates: <Certificates cv={cv} />,
    experience: <Experience cv={cv} />,
    references: <References cv={cv} />,
    pdfExport: <ExportPage cv={cv} />,
  };

  const [activeSection, setActiveSection] =
    useState<keyof typeof sections>("overview");
  //keyof typeof sections henter nøkkeltypene fra sections-objektet dynamisk

  if (isLoadingCV || isLoadingUsers) {
    return <p>Loading...</p>;
  }

  if (isErrorCV || isErrorUsers || !cv) {
    return <p>Error fetching CV or user data. Please try again later.</p>;
  }
  return (
    <>
      {cv && (
        <div>
          <h1>CV for {cvOwner?.name || "Unknown User"}</h1>
          <div className="cv-editor">
            <nav className="cv-editor-nav">
              <button
                onClick={() => setActiveSection("overview")}
                className={activeSection === "overview" ? "active" : ""}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveSection("personalInfo")}
                className={activeSection === "personalInfo" ? "active" : ""}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveSection("education")}
                className={activeSection === "education" ? "active" : ""}
              >
                Education
              </button>
              <button
                onClick={() => setActiveSection("certificates")}
                className={activeSection === "certificates" ? "active" : ""}
              >
                Certificates
              </button>
              <button
                onClick={() => setActiveSection("experience")}
                className={activeSection === "experience" ? "active" : ""}
              >
                Experience
              </button>
              <button
                onClick={() => setActiveSection("references")}
                className={activeSection === "references" ? "active" : ""}
              >
                References
              </button>
              <button
                onClick={() => setActiveSection("pdfExport")}
                className={activeSection === "pdfExport" ? "active" : ""}
              >
                PDF Export
              </button>
            </nav>
            {/* Aktiv section */}
            <div className="editor-active-section">
              {sections[activeSection] || <p>Invalid section</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCVPage;
