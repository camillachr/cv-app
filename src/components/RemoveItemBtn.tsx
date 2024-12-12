import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface RemoveItemBtnProps {
  onClick: () => void;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const RemoveItemBtn: React.FC<RemoveItemBtnProps> = ({
  onClick,
  size = 20,
  color = "red",
  style = {},
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <AiOutlineDelete size={size} />
    </button>
  );
};

export default RemoveItemBtn;
