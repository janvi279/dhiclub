import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaSortAmountDownAlt,
    FaFilter,
} from "react-icons/fa";

const BulkUpload = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [statusFilter, setStatusFilter] = useState("all");

    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [current, setCurrent] = useState({
        businessType: "",
        businessDomain: "",
        businessCategory: "",
        stateName: "",
        stateCode: "",
        cityName: "",
        cityCode: "",
        pincode: "",
        status: "Active",
        createdAt: new Date().toISOString(),
    });

    useEffect(() => {
        const stored = localStorage.getItem("bulkUploadData");
        if (stored) setCategories(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("bulkUploadData", JSON.stringify(categories));
    }, [categories]);

    const handleSubmit = () => {
        if (!current.businessType || !current.businessDomain || !current.businessCategory) return;

        if (editMode) {
            const updated = [...categories];
            updated[current.index] = { ...current };
            setCategories(updated);
        } else {
            setCategories([...categories, { ...current, createdAt: new Date().toISOString() }]);
        }

        setCurrent({
            businessType: "",
            businessDomain: "",
            businessCategory: "",
            stateName: "",
            stateCode: "",
            cityName: "",
            cityCode: "",
            pincode: "",
            status: "Active",
        });
        setModalOpen(false);
        setEditMode(false);
    };

    const handleEdit = (row, index) => {
        setCurrent({ ...row, index });
        setEditMode(true);
        setModalOpen(true);
    };

    const handleDelete = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const filtered = categories
        .filter((item) => {
            const query = searchQuery.toLowerCase();
            return (
                item.businessType.toLowerCase().includes(query) ||
                item.businessDomain.toLowerCase().includes(query) ||
                item.businessCategory.toLowerCase().includes(query) ||
                item.stateName.toLowerCase().includes(query) ||
                item.stateCode.toLowerCase().includes(query) ||
                item.cityName.toLowerCase().includes(query) ||
                item.cityCode.toLowerCase().includes(query) ||
                item.pincode.toLowerCase().includes(query) ||
                item.status.toLowerCase().includes(query)
            );
        })
        .sort((a, b) =>
            sortOrder === "newest"
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
        );

    const customStyles = {
        headCells: {
            style: {
                fontSize: "1rem",
                fontWeight: 600,
            },
        },
        cells: {
            style: {
                fontSize: "1rem",
            },
        },
        pagination: {
            style: {
                fontSize: "1rem",
            },
        },
    };

    const columns = [
        { name: "No.", selector: (_, index) => index + 1, width: "60px" },
        {
            name: (
                <div className="text-center">
                    Country <br /> Name
                </div>
            ), selector: (row) => row.businessType,
            sortable: true
        },
        {
            name: (
                <div className="text-center">
                    Country <br /> Code
                </div>
            ), selector: (row) => row.businessDomain,
            sortable: true
        },
        {
            name: (
                <div className="text-center">
                    Country <br /> Currency
                </div>
            ), selector: (row) => row.businessCategory,
            sortable: true
        },
        {
            name: (
                <div className="text-center">
                    State <br /> Name
                </div>
            ), selector: (row) => row.stateName,
            sortable: true
        },
        {
            name: (
                <div className="text-center">
                    State <br /> Code
                </div>
            ), selector: (row) => row.stateCode,
            sortable: true
        },
        {
            name: (
                <div className="text-center">
                    City <br /> Name
                </div>
            ), selector: (row) => row.cityName,
            sortable: true
        },
        {
            name: (
                <div className="text-center">
                    City <br /> Code
                </div>
            ), selector: (row) => row.cityCode,
            sortable: true
        },
        {
            name: (
                <div className="text-center">
                    Pin <br /> Code
                </div>
            ), selector: (row) => row.pincode,
            sortable: true
        },
        {
            name: "Status",
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {row.status}
                </span>
            ),
        },
        {
            name: "Actions",
            cell: (row, index) => (
                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(row, index)}>
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(index)}>
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl font-semibold">Bulk Upload</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded w-64"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 ml-auto"
                    onClick={() => setModalOpen(true)}
                >
                    <FaPlus /> Add
                </button>
            </div>

            <DataTable
                columns={columns}
                data={filtered}
                pagination
                highlightOnHover
                striped
                responsive
                customStyles={customStyles}
            />

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-xl relative">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {editMode ? "Edit Record" : "Add Record"}
                        </h2>
                        <button
                            className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
                            onClick={() => {
                                setModalOpen(false);
                                setEditMode(false);
                                setCurrent({
                                    businessType: "",
                                    businessDomain: "",
                                    businessCategory: "",
                                    stateName: "",
                                    stateCode: "",
                                    cityName: "",
                                    cityCode: "",
                                    pincode: "",
                                    status: "Active",
                                });
                            }}
                        >
                            ×
                        </button>

                        {["businessType", "businessDomain", "businessCategory", "stateName", "stateCode", "cityName", "cityCode", "pincode"].map((field) => (
                            <input
                                key={field}
                                type="text"
                                placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                                value={current[field] || ""}
                                onChange={(e) => setCurrent({ ...current, [field]: e.target.value })}
                                className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-3"
                            />
                        ))}

                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setModalOpen(false);
                                    setEditMode(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkUpload;
