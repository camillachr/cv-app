import { useState } from "react";
import Overview from "./Overview";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";

const CVEditor = () => {
  const sections = {
    overview: <Overview />,
    personalInfo: <PersonalInfo />,
    education: <Education />,
    experience: <Experience />,
  };

  const [activeSection, setActiveSection] =
    useState<keyof typeof sections>("overview");
  //keyof typeof sections henter nøkkeltypene fra sections-objektet dynamisk

  return (
    <div>
      <nav>
        <button onClick={() => setActiveSection("overview")}>Overview</button>
        <button onClick={() => setActiveSection("personalInfo")}>
          Personal Info
        </button>
        <button onClick={() => setActiveSection("education")}>Education</button>
        <button onClick={() => setActiveSection("experience")}>
          Experience
        </button>
      </nav>
      {/* Gjengir aktiv seksjon basert på activeSection */}
      <div>{sections[activeSection] || <p>Invalid section</p>}</div>
    </div>
  );
};

export default CVEditor;
