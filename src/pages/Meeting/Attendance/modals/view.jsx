import { useState } from "react";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

const ViewModal = ({ isOpen, onClose, meeting }) => {
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    if (!meeting || !isOpen) return null;

    // Mock member data for the selected meeting
    const memberData = [
        { no: "001", memberId: "Poonam001", memberName: "Poonam Tala", attendanceStatus: "Present" },
        { no: "002", memberId: "Raj002", memberName: "Raj Patel", attendanceStatus: "Present" },
        { no: "003", memberId: "Amit003", memberName: "Amit Kumar", attendanceStatus: "Absent" },
        { no: "004", memberId: "Neha004", memberName: "Neha Singh", attendanceStatus: "Substitute" },
        { no: "005", memberId: "Priya005", memberName: "Priya Shah", attendanceStatus: "Present" },
    ];

    // Apply filter
    const filteredMembers = memberData.filter((member) => {
        if (filterStatus === "all") return true;
        return member.attendanceStatus.toLowerCase() === filterStatus.toLowerCase();
    });

    // Apply sorting (based on member.no for now)
    const sortedMembers = [...filteredMembers].sort((a, b) => {
        return sortOrder === "newest"
            ? b.no.localeCompare(a.no) // newest → higher number first
            : a.no.localeCompare(b.no); // oldest → lower number first
    });

    return (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white text-primary-150 p-5 rounded-2xl shadow-lg relative w-11/12 max-w-4xl">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ×
                </button>

                {/* Table Header */}
                <div className="px-4 py-2 mt-5 border-b border-gray-200">
                    <div className="grid grid-cols-5 gap-3 text-sm font-semibold text-primary-150 whitespace-nowrap">
                        <div>No.</div>
                        <div>Member Id</div>
                        <div>Member Name</div>
                        <div>Attendance Status</div>
                        <div>View Location Selfie</div>
                    </div>
                </div>

                {/* Sort + Filter Controls */}
                <div className="flex gap-6 px-4 py-3 text-sm">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <FaSortAmountDownAlt className="text-primary-200" />
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-2 font-semibold text-primary-150 py-2 text-sm focus:outline-none"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <FiFilter className="text-primary-200" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-2 font-semibold text-primary-150 py-2 text-sm focus:outline-none"
                        >
                            <option value="all">All</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Substitute">Substitute</option>
                        </select>
                    </div>
                </div>

                {/* Table Body */}
                <div className="max-h-72 overflow-y-auto font-medium text-primary-150">
                    {sortedMembers.map((member, index) => (
                        <div
                            key={index}
                            className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                            <div className="grid grid-cols-5 gap-3 items-center text-sm">
                                <div>{member.no}</div>
                                <div>{member.memberId}</div>
                                <div>{member.memberName}</div>
                                <div
                                    className={`${member.attendanceStatus === "Present"
                                        ? "text-primary-400"
                                        : member.attendanceStatus === "Absent"
                                            ? "text-primary-500"
                                            : "text-yellow-500"
                                        }`}
                                >
                                    {member.attendanceStatus}
                                </div>
                                <div>
                                    <div className="w-10 h-8 bg-gray-200 border border-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
