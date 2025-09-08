import { useState } from "react";
import CustomModal from "../../../../components/common/CustomModal";

const ViewVisitorModal = ({ isOpen, onClose, visitor }) => {
    const [activeTab, setActiveTab] = useState("chapter");

    if (!visitor) return null;

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Visitor Profile">
            {/* Visitor Basic Info */}
            <div className="flex gap-4 max-sm:flex-wrap mb-4 mt-5">
                <div className="w-24 h-24 bg-gray-200 rounded-md" /> {/* Placeholder for image */}
                <div className="flex-1 space-y-2 text-sm">
                    {[
                        { label: "Visitor Name", value: visitor.name },
                        { label: "Contact Number", value: visitor.mobile },
                        { label: "Date", value: visitor.date },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center font-medium">
                            <span className="w-36  pr-2">{item.label}</span>
                            <span>:</span>
                            <span className="ml-8">{item.value}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Tabs */}
            <div className="flex gap-4 max-sm:flex-wrap  mb-4">
                <button
                    className={`pb-2 font-medium  ${activeTab === "chapter" ? "border-b-2 border-primary-200 text-primary-200" : "text-gray-500"}`}
                    onClick={() => setActiveTab("chapter")}
                >
                    Chapter Details
                </button>
                <button
                    className={`pb-2 font-medium ${activeTab === "business" ? "border-b-2 border-primary-200 text-primary-200" : "text-gray-500"}`}
                    onClick={() => setActiveTab("business")}
                >
                    Business Details
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "chapter" ? (
                <div className="space-y-2">
                    {["Country", "State", "City", "Chapter"].map((label, idx) => (
                        <div key={idx} className="flex text-sm font-medium">
                            <span className=" w-24">{label}:</span>
                            <span>:</span>
                            <span className="ml-8">{visitor[label.toLowerCase()]}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-2 text-sm">
                    {[
                        { label: "Company Name", value: visitor.company },
                        { label: "Business Category", value: visitor.category },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center font-medium">
                            <span className="w-36  pr-2">{item.label}</span>
                            <span>:</span>
                            <span className="ml-5">{item.value}</span>
                        </div>
                    ))}
                </div>

            )}


            {/* Visiting Card */}
               <div className="font-semibold text-md pt-5 pb-2">Visiting Card</div>
            <div className="flex gap-4 max-sm:flex-wrap mt-4">
             
                <div className="flex-1 bg-gray-200 h-32 rounded-md flex items-end justify-center">
                    <span className="text-xs text-gray-500 mb-2">Front</span>
                </div>
                <div className="flex-1 bg-gray-200 h-32 rounded-md flex items-end justify-center">
                    <span className="text-xs text-gray-500 mb-2">Back</span>
                </div>
            </div>
        </CustomModal>
    );
};

export default ViewVisitorModal;
