import React from "react";

interface SaveCVBtnProps {
  isLoading: boolean;
}

const SaveCVBtn: React.FC<SaveCVBtnProps> = ({ isLoading }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      style={{
        backgroundColor: "blue",
        color: "white",
      }}
    >
      {isLoading ? "Saving..." : "Save changes"}
    </button>
  );
};

export default SaveCVBtn;
