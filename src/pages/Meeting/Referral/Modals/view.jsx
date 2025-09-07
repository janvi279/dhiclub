import { useState } from "react";
import CustomModal from "../../../../components/common/CustomModal";

const HOTNESS_LEVELS = [
  { level: 1, color: "bg-yellow-400", width: "w-16", label: "Cold" },
  { level: 2, color: "bg-orange-400", width: "w-24", label: "Warm" },
  { level: 3, color: "bg-orange-500", width: "w-32", label: "Medium" },
  { level: 4, color: "bg-red-400", width: "w-40", label: "Hot" },
  { level: 5, color: "bg-red-600", width: "w-48", label: "Very Hot" },
];

const ViewModal = ({ isOpen, onClose, record }) => {
  const [activeTab, setActiveTab] = useState("referral");

  if (!record) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="View Referral">
      <div className="space-y-4 mt-8">
        {/* 🔹 Top section with avatar + Referral To/By */}
        <div className="flex items-start gap-5 mt-3 font-medium">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            <span className="text-lg">👤</span>
          </div>

          {/* Info section */}
          <div className="space-y-2 text-sm">
            <p className="flex gap-3">
              <span className="w-28 font-semibold">Referral To</span>
              <span>:</span>
              <span>{record.referralTo}</span>
            </p>
            <p className="flex gap-3">
              <span className="w-28 font-semibold">Referral By</span>
              <span>:</span>
              <span>{record.referralBy}</span>
            </p>
          </div>
        </div>

        {/* 🔹 Tabs */}
        <div className="flex gap-6  text-sm font-medium mt-4">
          <button
            className={`pb-2 ${
              activeTab === "referral"
                ? "border-b-2 border-primary-200 text-primary-200"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("referral")}
          >
            Referral Details
          </button>
          <button
            className={`pb-2 ${
              activeTab === "contact"
                ? "border-b-2 border-primary-200 text-primary-200"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Details
          </button>
        </div>

        {/* 🔹 Tab Content */}
        {activeTab === "referral" && (
          <div className="mt-3 space-y-3 text-sm font-medium">
            <p className="flex gap-3">
              <span className="w-28">Referral Type</span>
              <span>:</span>
              <span>{record.referralType}</span>
            </p>
            <p className="flex gap-3">
              <span className="w-28">Referral Status</span>
              <span>:</span>
              <span>{record.referralStatus}</span>
            </p>

            {/* Hotness Levels (read-only) */}
            <div className="space-y-2 mt-4">
              <label className="block text-sm font-medium text-primary-200">
                How hot is this referral?
              </label>
              {HOTNESS_LEVELS.map(({ level, color, width, label }) => {
                const isSelected = record.hotness === level;
                return (
                  <div key={level} className="flex items-center space-x-3">
                    {/* Checkbox */}
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center
                        ${
                          isSelected
                            ? "border-primary-200 bg-primary-200"
                            : "border-gray-300 bg-white"
                        }
                      `}
                    >
                      {isSelected && (
                        <svg
                          className="w-2 h-2 text-white fill-current"
                          viewBox="0 0 8 8"
                          aria-hidden="true"
                        >
                          <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z" />
                        </svg>
                      )}
                    </div>

                    {/* Temperature bar */}
                    <div className={`${width} h-4 rounded ${color}`} />

                    {/* Label */}
                    <span className="text-xs text-gray-500 min-w-[60px]">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="mt-3 space-y-3 text-sm font-medium">
            <p className="flex gap-3">
              <span className="w-28">Mobile</span>
              <span>:</span>
              <span>{record.mobileNumber}</span>
            </p>
            <p className="flex gap-3">
              <span className="w-28">Email</span>
              <span>:</span>
              <span>{record.emailId}</span>
            </p>
            <p className="flex gap-3">
              <span className="w-28">Address</span>
              <span>:</span>
              <span>{record.address || "—"}</span>
            </p>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default ViewModal;
