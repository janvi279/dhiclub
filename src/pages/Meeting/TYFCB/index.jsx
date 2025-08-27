import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import customStyles from "../../../components/custom/customStyle";
import Column from "./columns";
import ViewModal from "./Modals/view";
import AddEditModal from "./Modals/Add";
import TyfcbSearch from "./components/search";

const Index = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [editRecord, setEditRecord] = useState(null);

    useEffect(() => {
        // ✅ Dummy Data (replace with API call later)
        const dummy = [
            { id: 1, memberName: "John Doe", chapter: "Shakti", amount: 500, date: "2025-08-20", status: "Paid" },
            { id: 2, memberName: "Jane Smith", chapter: "Unity", amount: 300, date: "2025-08-21", status: "Pending" },
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
                    row.memberName.toLowerCase().includes(text.toLowerCase())
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
                <h1 className="text-primary-150 font-semibold text-xl">TYFCB</h1>
                <TyfcbSearch onSearch={handleSearch} />
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

export default Index;
