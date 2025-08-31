// Step3Modal.jsx
import { useState } from "react";
import CustomModal from "../../../../components/common/CustomModal";

const ViewModal = ({ newResponsibility, setStep, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("chapter");

    if (!newResponsibility) return null;

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setStep(0);
        }
    };

    return (
        <CustomModal isOpen={!!isOpen} onClose={handleClose} title="View Role">
            <div className="flex">
                {/* Left side - Avatar placeholder */}
                <div className="w-25 h-25 bg-gray-300 rounded-lg mr-6 flex-shrink-0"></div>

                {/* Right side - Member details */}
                <div className="flex-1">
                    <div className="space-y-2 text-sm">
                        <div className="flex mt-2 font-medium text-primary-150">
                            <span className="w-25 ">Member Id</span>
                            <span className="mx-5">:</span>
                            <span>{newResponsibility?.memberId || newResponsibility?.MemberId || "poonam001"}</span>
                        </div>
                        <div className="flex font-medium text-primary-150">
                            <span className="w-25">Member Name</span>
                            <span className="mx-5">:</span>
                            <span>{newResponsibility?.memberName || newResponsibility?.MemberName || "Poonam Tala"}</span>
                        </div>
                        <div className="flex font-medium text-primary-150">
                            <span className="w-25">Assign Date</span>
                            <span className="mx-5">:</span>
                            <span>{newResponsibility?.assignDate || newResponsibility?.AssignDate || "01/07/2025"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex mt-6 mb-4">
                <button
                    type="button"
                    onClick={() => setActiveTab("chapter")}
                    className={`px-0 py-2 mr-8 text-sm font-medium border-b-2 transition-colors ${activeTab === "chapter"
                        ? "text-primary-200 border-primary-200"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                        }`}
                >
                    Chapter Details
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("business")}
                    className={`px-0 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "business"
                        ? "text-primary-200 border-primary-200"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                        }`}
                >
                    Business Details
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[150px]">
                {activeTab === "chapter" && (
                    <div className="space-y-3 text-sm">
                        <div className="flex font-medium text-primary-150">
                            <span className="w-15">Country</span>
                            <span className="mx-5">:</span>
                            <span>{newResponsibility?.Country || newResponsibility?.country || "India"}</span>
                        </div>
                        <div className="flex font-medium text-primary-150">
                            <span className="w-15">State</span>
                            <span className="mx-5">:</span>
                            <span>{newResponsibility?.State || newResponsibility?.state || "Gujarati"}</span>
                        </div>
                        <div className="flex font-medium text-primary-150">
                            <span className="w-15">City</span>
                            <span className="mx-5">:</span>
                            <span>{newResponsibility?.City || newResponsibility?.city || "Rajkot"}</span>
                        </div>
                        <div className="flex font-medium text-primary-150">
                            <span className="w-15">Chapter</span>
                            <span className="mx-5">:</span>
                            <span>{newResponsibility?.Chapter || newResponsibility?.chapter || "Shakti"}</span>
                        </div>
                    </div>
                )}

                {activeTab === "business" && (
                    <div className="space-y-3 text-sm font-medium text-primary-150">
                        <div className="flex">
                            <span className="w-30">Business Category</span>
                            <span className="mx-5">:</span>
                            <span>{newResponsibility?.businessCategory || newResponsibility?.BusinessCategory || "Software Development"}</span>
                        </div>
                    </div>
                )}
            </div>
        </CustomModal>
    );
};

export default ViewModal;