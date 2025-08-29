import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import customStyles from "../../../components/custom/customStyle";
import Column from "./columns";
import ViewModal from "./Modals/view";
import AddEditModal from "./Modals/Add";
import OnetoOneSearch from "./components/search";

const OnetoOne = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [editRecord, setEditRecord] = useState(null);

    useEffect(() => {
        // ✅ Dummy Data
        const dummy = [
            {
                id: 1,
                metWith: "John Doe",
                initiatedBy: "Me",
                whereYouMeet: "Mumbai",
                date: "2025-08-20",
                twc: "Discussed collaboration",
                status: "Active",
            },
            {
                id: 2,
                metWith: "Jane Smith",
                initiatedBy: "Other",
                whereYouMeet: "Delhi",
                date: "2025-08-21",
                twc: "Networking",
                status: "Deactive",
            },
        ];
        setData(dummy);
        setFilteredData(dummy);
    }, []);

    const handleSearch = (text) => {
        if (!text) {
            setFilteredData(data);
        } else {
            setFilteredData(
                data.filter((row) =>
                    row.metWith.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };

    const handleAdd = () => {
        setEditRecord(null);
        setIsAddEditOpen(true);
    };

    const handleEdit = (record) => {
        setEditRecord(record);
        setIsAddEditOpen(true);
    };

    const handleDelete = (id) => {
        setData(data.filter((r) => r.id !== id));
        setFilteredData(filteredData.filter((r) => r.id !== id));
    };

    return (
        <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            {/* Header + Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-primary-150 font-semibold text-xl">One to One</h1>
                <OnetoOneSearch onSearch={handleSearch} />
                <button
                    className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
                    onClick={handleAdd}
                >
                    + Add
                </button>
            </div>

            {/* 📋 DataTable */}
            <DataTable
                columns={Column({
                    onView: (row) => {
                        setSelectedRecord(row);
                        setIsViewOpen(true);
                    },
                    onEdit: handleEdit,
                    onDelete: handleDelete,
                    onStatusChange: (updatedRow) => {
                        const updated = data.map((r) =>
                            r.id === updatedRow.id ? updatedRow : r
                        );
                        setData(updated);
                        setFilteredData(updated);
                    },
                })}
                data={filteredData}
                customStyles={customStyles}
                pagination
                highlightOnHover
            />

            {/* 👁️ View Modal */}
            <ViewModal
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                record={selectedRecord}
            />

            {/* ✍️ Add/Edit Modal */}
            <AddEditModal
                isOpen={isAddEditOpen}
                onClose={() => setIsAddEditOpen(false)}
                record={editRecord}
                onSave={(newRecord) => {
                    if (editRecord) {
                        const updated = data.map((r) =>
                            r.id === editRecord.id ? { ...newRecord, id: editRecord.id } : r
                        );
                        setData(updated);
                        setFilteredData(updated);
                    } else {
                        const newId = data.length + 1;
                        const updated = [...data, { ...newRecord, id: newId }];
                        setData(updated);
                        setFilteredData(updated);
                    }
                }}
            />
        </div>
    );
};

export default OnetoOne;
