import React from "react";
import { Link } from "react-router-dom";

interface PopupProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  redirectTo?: string;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  message,
  onClose,
  redirectTo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <p className="text-lg font-medium text-gray-800 mb-4">{message}</p>
        {redirectTo ? (
          <Link
            to={redirectTo}
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 inline-block"
          >
            OK
          </Link>
        ) : (
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
