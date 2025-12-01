import React from "react";

interface PopupProps {
  isOpen: boolean; // trigger condition
  message: string;
  onClose: () => void; // button reaction
}

const Popup: React.FC<PopupProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <p className="text-lg font-medium text-gray-800 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
