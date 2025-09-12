import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPopUp = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Logout Button */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded transition-colors duration-200"
        onClick={() => setShowConfirm(true)}  // 👈 sirf popup open karega
      >
        Logout
      </button>

      {/* Confirm Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                onClick={() => setShowConfirm(false)}  // ❌ Cancel pe close
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setShowConfirm(false);   // ✅ pehle popup close
                  navigate("/user/logout"); // ✅ fir logout page pe bhejo
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutPopUp;