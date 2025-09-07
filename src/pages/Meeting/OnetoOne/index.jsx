import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import customStyles from "../../../components/custom/customStyle";
import Column from "./columns";
import ViewModal from "./Modals/View";
import AddEditModal from "./Modals/AddEdit";
import OnetoOneSearch from "./components/search";
import OnetoOneFilters from "./components/filter"; // ✅ status & sort filter

const OnetoOne = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("newest");
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

  // ✅ Filter + Search + Sort Logic
  const filterData = (
    searchText = search,
    order = sortOrder,
    status = statusFilter
  ) => {
    let tempData = [...data];

    if (searchText) {
      tempData = tempData.filter((row) =>
        row.metWith?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (status !== "ALL") {
      tempData = tempData.filter(
        (row) => row.status.toUpperCase() === status.toUpperCase()
      );
    }

    tempData.sort((a, b) =>
      order === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

    setFilteredData(tempData);
  };

  const handleSearch = (text) => {
    setSearch(text);
    filterData(text, sortOrder, statusFilter);
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
    const updatedData = data.filter((r) => r.id !== id);
    setData(updatedData);
    filterData(search, sortOrder, statusFilter);
  };

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Search + Filter + Add */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">One to One</h1>

        <OnetoOneSearch onSearch={handleSearch} />

        <div className="flex gap-4">
          <OnetoOneFilters
            statusFilter={statusFilter}
            setStatusFilter={(val) => {
              setStatusFilter(val);
              filterData(search, sortOrder, val);
            }}
            sortOrder={sortOrder}
            setSortOrder={(val) => {
              setSortOrder(val);
              filterData(search, val, statusFilter);
            }}
          />

          <button
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
            onClick={handleAdd}
          >
            <FaPlus /> Add
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
            filterData(search, sortOrder, statusFilter);
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
          onSave={(newRecord) => {
            let updated;
            if (editRecord) {
              updated = data.map((r) =>
                r.id === editRecord.id ? { ...newRecord, id: editRecord.id } : r
              );
            } else {
              const newId = data.length + 1;
              updated = [...data, { ...newRecord, id: newId }];
            }
            setData(updated);
            filterData(search, sortOrder, statusFilter);
          }}
        />
      )}
    </div>
  );
};

export default OnetoOne;
