interface DeleteButtonProps {
  onDelete: () => void;
  isDeleting: boolean;
  text: string;
}

const DeleteButton = ({ onDelete, isDeleting, text }: DeleteButtonProps) => (
  <button
    onClick={onDelete}
    disabled={isDeleting}
    style={{
      backgroundColor: "red",
      color: "white",
      marginTop: "20px",
      padding: "10px 20px",
      border: "none",
      cursor: isDeleting ? "not-allowed" : "pointer",
    }}
  >
    {isDeleting ? "Deleting..." : text}
  </button>
);

export default DeleteButton;
