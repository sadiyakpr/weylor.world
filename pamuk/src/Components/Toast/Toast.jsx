import "./Toast.css";

const Toast = ({ message, type = "success", show, onClose }) => {
  if (!show) return null;

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>✕</button>
    </div>
  );
};

export default Toast;
