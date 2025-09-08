// components/common/CustomModal.jsx
const CustomModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center max-sm:mx-5">
      <div className="bg-white text-primary-150 p-5  rounded-2xl shadow-lg w-full max-w-md relative">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-3 text-center text-primary-150">{title}</h2>

        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
