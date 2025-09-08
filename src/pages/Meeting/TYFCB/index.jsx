import { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import customStyles from "../../../components/custom/customStyle";
import Column from "./columns";
import ViewModal from "./Modals/view";
import AddEditModal from "./Modals/AddEdit";
import TyfcbSearch from "./components/search";
import TyfcbFilters from "./components/filter";

const Tyfcb = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // ✅ Load dummy data (replace with API)
  useEffect(() => {
    const dummy = [
      {
        id: 1,
        memberName: "John Doe",
        chapter: "Shakti",
        amount: 500,
        date: "2025-08-20",
        status: "Paid",
      },
      {
        id: 2,
        memberName: "Jane Smith",
        chapter: "Unity",
        amount: 300,
        date: "2025-08-21",
        status: "Pending",
      },
    ];
    setData(dummy);
  }, []);

  // ✅ Filter + Search + Sort
  const filteredData = useMemo(() => {
    return data
      .filter((row) => {
        const name = row.memberName || ""; // ✅ fallback to empty string
        const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL"
            ? true
            : (row.status || "").toUpperCase() === statusFilter.toUpperCase();
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );
  }, [data, search, statusFilter, sortOrder]);

  // ✅ Handlers
  const handleAdd = () => {
    setEditRecord(null);
    setIsAddEditOpen(true);
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setIsAddEditOpen(true);
  };

  const handleDelete = (id) => {
    const updated = data.filter((r) => r.id !== id);
    setData(updated);
  };

  const handleSave = (record) => {
    if (editRecord) {
      const updated = data.map((r) =>
        r.id === editRecord.id ? { ...record, id: editRecord.id } : r
      );
      setData(updated);
    } else {
      const newId = data.length + 1;
      setData([...data, { ...record, id: newId }]);
    }
    setIsAddEditOpen(false);
  };

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Search + Filter + Add */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">TYFCB</h1>

        <TyfcbSearch search={search} setSearch={setSearch} />

        <div className="flex gap-4 max-sm:flex-wrap items-center">
          <TyfcbFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
            onClick={handleAdd}
          >
            + Add
          </button>
        </div>
      </div>

      {/* DataTable */}
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
          },
        })}
        data={filteredData}
        customStyles={customStyles}
        pagination
        highlightOnHover
      />

      {/* View Modal */}
      {isViewOpen && (
        <ViewModal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          record={selectedRecord}
        />
      )}

      {/* Add/Edit Modal */}
      {isAddEditOpen && (
        <AddEditModal
          isOpen={isAddEditOpen}
          onClose={() => setIsAddEditOpen(false)}
          record={editRecord}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Tyfcb;
