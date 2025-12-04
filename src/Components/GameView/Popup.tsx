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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-black border-2 border-cyan-500 rounded-3xl shadow-[0_0_20px_cyan,0_0_40px_skyblue] p-6 max-w-sm w-full text-center">
        <p className="text-white text-lg font-semibold mb-6 tracking-wide">
          {message}
        </p>
        {redirectTo ? (
          <Link
            to={redirectTo}
            onClick={onClose}
            className="inline-block px-6 py-3 rounded-full bg-black text-white font-bold text-lg
                       border-2 border-cyan-500 shadow-[0_0_15px_cyan,0_0_30px_skyblue] transition-transform duration-300
                       hover:scale-105 hover:shadow-[0_0_25px_cyan,0_0_50px_skyblue]"
          >
            OK
          </Link>
        ) : (
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-black text-white font-bold text-lg
                       border-2 border-cyan-500 shadow-[0_0_15px_cyan,0_0_30px_skyblue] transition-transform duration-300
                       hover:scale-105 hover:shadow-[0_0_25px_cyan,0_0_50px_skyblue]"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
