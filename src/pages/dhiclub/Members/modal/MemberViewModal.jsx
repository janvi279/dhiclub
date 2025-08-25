import { useState } from "react";

const MemberViewModal = ({ member, onClose }) => {
  const [activeTab, setActiveTab] = useState("personal");

  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative">
        {/* Header */}
        <h2 className="text-primary-150 text-lg font-bold">View Member</h2>
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Tabs */}
        <div className="border-b border-gray-300 mt-6 flex gap-8 text-sm font-medium text-primary-150">
          {["personal", "business", "transaction", "performance"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-primary-200 text-primary-200"
                  : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Details
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-4 text-sm text-primary-150">
          {activeTab === "personal" && (
            <div>
              <p><span className="font-semibold">Full Name:</span> {member.memberName}</p>
              <p><span className="font-semibold">Mobile:</span> {member.mobile}</p>
              <p><span className="font-semibold">Email:</span> {member.email}</p>
              <p><span className="font-semibold">DOB:</span> {member.dob}</p>
            </div>
          )}
          {activeTab === "business" && (
            <div>
              <p><span className="font-semibold">Company:</span> {member.companyName}</p>
              <p><span className="font-semibold">Category:</span> {member.businessCategory}</p>
              <p><span className="font-semibold">Established:</span> {member.establishedYear}</p>
            </div>
          )}
          {activeTab === "transaction" && (
            <div>
              <p><span className="font-semibold">Transaction ID:</span> {member.txnId}</p>
              <p><span className="font-semibold">Payment:</span> {member.paymentType}</p>
            </div>
          )}
          {activeTab === "performance" && (
            <div>
              <p><span className="font-semibold">Attendance:</span> {member.attendance}%</p>
              <p><span className="font-semibold">References:</span> {member.references}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberViewModal;
