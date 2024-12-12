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
      border: "none",
      cursor: isDeleting ? "not-allowed" : "pointer",
    }}
  >
    {isDeleting ? "Deleting..." : text}
  </button>
);

export default DeleteButton;
