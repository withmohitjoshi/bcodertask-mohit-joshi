const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-gray-800 p-6 rounded-lg w-96">{children}</div>
    </div>
  );
};

export default Modal;
