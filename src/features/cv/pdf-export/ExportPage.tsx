import { useState } from "react";

import { CV } from "../../../types/types";
import ExportControl from "./ExportControl";
import CVPDFViewer from "./CVPDFViewer";

interface ExportPageProps {
  cv?: CV;
}

const ExportPage = ({ cv }: ExportPageProps) => {
  const [exportOptions, setExportOptions] = useState({
    selectedSkills: cv?.skills || [],
    selectedCertificates: cv?.certificates?.map((cv) => cv.title) || [],
    selectedReferences:
      cv?.references?.map((references) => references.name) || [],
  });

  return (
    <>
      <h2>Customize CV for Export</h2>
      {cv && (
        <div className="pdf-export-container">
          <ExportControl
            cv={cv}
            options={exportOptions}
            setOptions={setExportOptions}
          />
          <CVPDFViewer cv={cv} exportOptions={exportOptions} />
        </div>
      )}
    </>
  );
};

export default ExportPage;
