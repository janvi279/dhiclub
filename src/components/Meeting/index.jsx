import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import DataTable from "react-data-table-component";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Meeting = () => {
    const [meetingList, setMeetingList] = useState([]);
    const [newMeeting, setNewMeeting] = useState({
        meetingId: "",
        date: "",
        business: "",
        speaker: "",
        trainingSlot: "",
        location: "",
        status: "Live",
        createdAt: new Date().toISOString(),
    });

    const [editingMeeting, setEditingMeeting] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (showEditModal) {
            setEditingMeeting((prev) => ({ ...prev, [name]: value }));
        } else {
            setNewMeeting((prev) => ({ ...prev, [name]: value }));
        }
    };

    const addMeeting = () => {
        if (newMeeting.meetingId && newMeeting.date) {
            setMeetingList([
                ...meetingList,
                { ...newMeeting, createdAt: new Date().toISOString() },
            ]);
            setNewMeeting({
                meetingId: "",
                date: "",
                business: "",
                speaker: "",
               trainingSlot:"",
                location: "",
                status: "Live",
            });
            setShowModal(false);
        }
    };

    const handleEdit = (row, index) => {
        setEditingMeeting({ ...row, index });
        setShowEditModal(true);
    };

    const saveMeeting = () => {
        const updated = [...meetingList];
        updated[editingMeeting.index] = { ...editingMeeting };
        setMeetingList(updated);
        setShowEditModal(false);
        setEditingMeeting(null);
    };

    const deleteMeeting = (index) => {
        setMeetingList(meetingList.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const stored = localStorage.getItem("meetings");
        if (stored) {
            try {
                setMeetingList(JSON.parse(stored));
            } catch (err) {
                console.error("Error parsing meetings", err);
                setMeetingList([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("meetings", JSON.stringify(meetingList));
    }, [meetingList]);

    const filteredList = meetingList
        .filter(
            (item) =>
                item.meetingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.traningSlot.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(
            (item) =>
                statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
        )
        .sort((a, b) => {
            if (sortOrder === "newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
        });

    const customStyles = {
        headRow: {
            style: {
                border: "none",
                backgroundColor: "#F5F8FD",
                borderRadius: "10px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: 600,
                color: "#061237",
            },
        },
        cells: {
            style: {
                fontSize: "13px",
                color: "#061237",
                fontWeight: 500,
            },
        },
    };

    const columns = [
        { name: "No.", selector: (_, index) => index + 1, width: "70px" },
        { name: "Meeting ID", selector: (row) => row.meetingId, sortable: true },
        { name: "Date", selector: (row) => row.date },
        { name: "Business Presentation", selector: (row) => row.business },
        { name: "Guest Speaker", selector: (row) => row.speaker },
        { name: "Traning Slot", selector: (row) => row.trainingSlot },
        { name: "Location", selector: (row) => row.location },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => (
                <span
                    className={`px-5 py-1.5 rounded-full  ${
            row.status === "Active"
              ? "bg-primary-350 text-primary-400 font-semibold  "
              : "bg-primary-450 text-primary-500"
          }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            name: "Actions",
            cell: (row, index) => (
                <div className="flex gap-3">
                    <button
                        className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
                        onClick={() => handleEdit(row, index)}
                    >
                        <FaRegEdit />
                    </button>
                    <button
                        className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
                        onClick={() => deleteMeeting(index)}
                    >
                        <MdDeleteOutline />
                    </button>
                    <button className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap">
                        Active
                    </button>
                    <button className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap">
                        Deactivate
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="mx-auto text-primary-150 mt-10 bg-white shadow-lg rounded-lg p-5">
            {/* Top Bar */}
            <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl font-semibold text-primary-150">Meeting</h1>

                {/* Search */}
                <div className="relative w-64">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>

                {/* Sort */}
                <div className="relative flex items-center">
                    <FaSortAmountDownAlt className="text-primary-200" />
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-1 font-semibold text-primary-150 py-2 text-base focus:outline-none"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                {/* Filter */}
                <div className="relative flex items-center">
                    <FiFilter className="text-primary-200 text-xl" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-1 font-semibold text-primary-150 py-2 text-base focus:outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="Live">Live</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* Add Button */}
                <button
                    className="bg-primary-200 text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Add
                </button>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={filteredList}
                pagination
                highlightOnHover
                striped
                responsive
                customStyles={customStyles}
            />

            {/* Add Meeting Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
                        <h2 className="text-xl font-semibold mb-3 text-center">Upload Meeting</h2>
                        <button
                            className="absolute top-3 right-3 text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>

                        <input
                            name="meetingId"
                            placeholder="Meeting ID"
                            value={newMeeting.meetingId}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="date"
                            type="date"
                            value={newMeeting.date}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="business"
                            placeholder="Business Presentation"
                            value={newMeeting.business}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="speaker"
                            placeholder="Guest Speaker"
                            value={newMeeting.speaker}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="trainingSlot"
                            placeholder="Traing Slot"
                            value={newMeeting. trainingSlot}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="location"
                            placeholder="Location"
                            value={newMeeting.location}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                        />
                        <button
                            className="w-full bg-primary-200 text-white py-2 rounded-full"
                            onClick={addMeeting}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Meeting Modal */}
            {showEditModal && editingMeeting && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md relative">
                        <h2 className="text-xl font-semibold mb-3 text-center">Edit Meeting</h2>
                        <button
                            className="absolute top-3 right-3 text-xl"
                            onClick={() => setShowEditModal(false)}
                        >
                            ×
                        </button>

                        <input
                            name="meetingId"
                            placeholder="Meeting ID"
                            value={editingMeeting.meetingId}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="date"
                            type="date"
                            value={editingMeeting.date}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="business"
                            placeholder="Business Presentation"
                            value={editingMeeting.business}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="speaker"
                            placeholder="Guest Speaker"
                            value={editingMeeting.speaker}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="trainingSlot"
                            placeholder="Traning Slot"
                            value={editingMeeting.trainingSlot}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                        />
                        <input
                            name="location"
                            placeholder="Location"
                            value={editingMeeting.location}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                        />
                        <button
                            className="w-full bg-primary-200 text-white py-2 rounded-full"
                            onClick={saveMeeting}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Meeting;
