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
        BusinessPresentation: "",
        Guest: "",
        TrainingSlot: "",
        location: "",
        Banner: "",
        status: "Live",
        createdAt: new Date().toISOString(),
    });

    const [editingMeeting, setEditingMeeting] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [step, setStep] = useState(0);
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


    const handleNext = () => {
        setStep((prev) => prev + 1);
    };
    const closeModal = () => {

        setStep(0); // Reset step when closing
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
                BusinessPresentation: "",
                Guest: "",
                TrainingSlot: "",
                location: "",
                Banner: "",
                status: "Live",
                createdAt: new Date().toISOString(),
            });

            setStep(0);
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
        .filter((item) =>
            item.meetingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.BusinessPresentation.toLowerCase().includes(searchQuery.toLowerCase()) ||  // ✅ Correct
            item.Guest.toLowerCase().includes(searchQuery.toLowerCase()) ||                 // ✅ Correct
            item.TrainingSlot.toLowerCase().includes(searchQuery.toLowerCase())            // ✅ Correct
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
                color: "#000000",
            },
        },
        cells: {
            style: {
                fontSize: "13px",
                color: "#000000",
                fontWeight: 500,
            },
        },
    };

    const columns = [
        { name: "No.", selector: (_, index) => index + 1, width: "70px" },
        { name: "Meeting ID", selector: (row) => row.meetingId, sortable: true },
        { name: "Date", selector: (row) => row.date },
        { name: "Business Presentation", selector: (row) => row.BusinessPresentation },
        { name: "Guest Speaker", selector: (row) => row.Guest },
        { name: "Training Slot", selector: (row) => row.TrainingSlot },

        { name: "Location", selector: (row) => row.location },
        { name: "Banner", selector: (row) => row.Banner },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => (
                <span
                    className={`px-5 py-1.5 rounded-full  ${row.status === "Active"
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
                    onClick={() => setStep(1)}
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
            {step === 1 && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
                        <h2 className="text-xl font-semibold mb-3 text-center">Upload Meeting</h2>
                        <button
                            className="absolute top-3 right-3 text-xl"
                            onClick={closeModal}  // ✅ This will close modal and reset step
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
                            type={newMeeting.date ? "date" : "text"}
                            value={newMeeting.date}
                            placeholder="Select Day"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => {
                                if (!e.target.value) e.target.type = "text";
                            }}
                            onChange={handleChange}
                            className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                        />

                        <input
                            name="location"
                            placeholder="Enter Location Link"
                            value={newMeeting.location}
                            onChange={handleChange}


                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                        />
                        {/* Add Modal Banner Input */}
                        <div className="relative w-full mb-5">
                            <input
                                type="text"
                                placeholder="Upload Banner"
                                value={newMeeting.Banner || ""}
                                readOnly
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-28 "
                            />
                            <label className="absolute right-2 top-1/2 -translate-y-1/2">
                                <span className="bg-primary-300 text-primary-200 text-sm font-semibold px-2 py-1.5 rounded-lg cursor-pointer  transition">
                                    Choose File
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="Banner"
                                    className="hidden"
                                    onChange={(e) =>
                                        setNewMeeting((prev) => ({
                                            ...prev,
                                            Banner: e.target.files[0] ? e.target.files[0].name : "",
                                        }))
                                    }
                                />
                            </label>
                        </div>

                        {/* <button
                            className="w-20 bg-primary-200 text-white py-2 rounded-full"
                            onClick={addMeeting}
                        >
                            Submit
                        </button> */}
                        <div className="flex gap-10 justify-center">
                            <button className="w-22 bg-primary-200 text-white py-2  rounded-full" onClick={handleNext}>Next</button>
                            <button className="w-22 border border-primary-200   text-primary-200 font-semibold py-2 rounded-full" onClick={closeModal}>Cancle</button>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <>
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
                            <h2 className="text-xl font-semibold mb-3 text-center">Upload Meeting</h2>
                            <button
                                className="absolute top-3 right-3 text-xl"
                                onClick={closeModal}  // ✅ This will close modal and reset step
                            >
                                ×
                            </button>

                            <input
                                name="BusinessPresentation"
                                placeholder="Business Presentation Title"
                                value={newMeeting.BusinessPresentation}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                            />

                            {/* Add Modal Banner Input */}
                            <div className="relative w-full mb-5">
                                <input
                                    type="text"
                                    placeholder="Upload Banner"
                                    value={newMeeting.Banner || ""}
                                    readOnly
                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-28 "
                                />
                                <label className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <span className="bg-primary-300 text-primary-200 text-sm font-semibold px-2 py-1.5 rounded-lg cursor-pointer  transition">
                                        Choose File
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="Banner"
                                        className="hidden"
                                        onChange={(e) =>
                                            setNewMeeting((prev) => ({
                                                ...prev,
                                                Banner: e.target.files[0] ? e.target.files[0].name : "",
                                            }))
                                        }
                                    />
                                </label>
                            </div>

                            {/* <button
                            className="w-full bg-primary-200 text-white py-2 rounded-full"
                            onClick={addMeeting}
                        >
                            Submit
                        </button>
                        <button onClick={handleNext}>next</button> */}
                            <div className="flex gap-10 justify-center">
                                <button className="w-22 bg-primary-200 text-white py-2  rounded-full" onClick={handleNext}>Next</button>
                                <button className="w-22 border border-primary-200   text-primary-200 font-semibold py-2 rounded-full" onClick={() => setStep(1)}>Back</button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
                            <h2 className="text-xl font-semibold mb-3 text-center">Upload Meeting</h2>
                            <button
                                className="absolute top-3 right-3 text-xl"
                                onClick={closeModal}  // ✅ This will close modal and reset step
                            >
                                ×
                            </button>

                            <input
                                name="TrainingSlot"
                                placeholder="Training Slot Title"
                                value={newMeeting.TrainingSlot}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                            />

                            {/* Add Modal Banner Input */}
                            <div className="relative w-full mb-5">
                                <input
                                    type="text"
                                    placeholder="Upload Banner"
                                    value={newMeeting.Banner || ""}
                                    readOnly
                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-28 "
                                />
                                <label className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <span className="bg-primary-300 text-primary-200 text-sm font-semibold px-2 py-1.5 rounded-lg cursor-pointer  transition">
                                        Choose File
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="Banner"
                                        className="hidden"
                                        onChange={(e) =>
                                            setNewMeeting((prev) => ({
                                                ...prev,
                                                Banner: e.target.files[0] ? e.target.files[0].name : "",
                                            }))
                                        }
                                    />
                                </label>
                            </div>

                            {/* <button
                            className="w-full bg-primary-200 text-white py-2 rounded-full"
                            onClick={addMeeting}
                        >
                            Submit
                        </button>
                        <button onClick={handleNext}>next</button> */}
                            <div className="flex gap-10 justify-center">
                                <button className="w-22 bg-primary-200 text-white py-2  rounded-full" onClick={handleNext}>Next</button>
                                <button className="w-22 border border-primary-200   text-primary-200 font-semibold py-2 rounded-full" onClick={() => setStep(2)}>Back</button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {step === 4 && (
                <>
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
                            <h2 className="text-xl font-semibold mb-3 text-center">Upload Meeting</h2>
                            <button
                                className="absolute top-3 right-3 text-xl"
                                onClick={closeModal}  // ✅ This will close modal and reset step
                            >
                                ×
                            </button>

                            <input
                                name="Guest"
                                placeholder="Guest Speaker Name"
                                value={newMeeting.Guest}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
                            />

                            {/* Add Modal Banner Input */}
                            <div className="w-full mb-5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Upload Banner"
                                        value={newMeeting.Banner || ""}
                                        readOnly
                                        className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-28 "
                                    />
                                    <label className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <span className="bg-primary-300 text-primary-200 text-sm font-semibold px-2 py-1.5 rounded-lg cursor-pointer  transition">
                                            Choose File
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="Banner"
                                            className="hidden"
                                            onChange={(e) =>
                                                setNewMeeting((prev) => ({
                                                    ...prev,
                                                    Banner: e.target.files[0] ? e.target.files[0].name : "",
                                                }))
                                            }
                                        />
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Other"
                                    value={newMeeting.other || ""}
                                    readOnly
                                    className="border mt-3 border-gray-300 rounded-lg px-3 py-2 w-full pr-28 "
                                />
                            </div>

                            {/* <button
                            className="w-full bg-primary-200 text-white py-2 rounded-full"
                            onClick={addMeeting}
                        >
                            Submit
                        </button>
                        <button onClick={handleNext}>next</button> */}
                            <div className="flex gap-10 justify-center">
                                <button className="w-22 border border-primary-200   text-primary-200 font-semibold py-2 rounded-full" onClick={() => setStep(3)}>Back</button>
                                <button
                                    className="w-20 bg-primary-200 text-white py-2 rounded-full"
                                    onClick={addMeeting}
                                >
                                    Submit
                                </button>

                            </div>
                        </div>
                    </div>
                </>
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
                            name="location"
                            placeholder="Location"
                            value={editingMeeting.location}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                        />
                         <input
                name="BusinessPresentation"
                placeholder="Business Presentation"
                value={editingMeeting.BusinessPresentation || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
            />
            <input
                name="Guest"
                placeholder="Guest Speaker"
                value={editingMeeting.Guest || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
            />
            <input
                name="TrainingSlot"
                placeholder="Training Slot Title"
                value={editingMeeting.TrainingSlot || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
            />
                        <input
                            name="Banner"
                            type="file"
    
                         onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setEditingMeeting((prev) => ({
                                    ...prev,
                                    Banner: file.name, // Store the file name
                                }));
                            }
                        }}
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
