import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import StateFilters from "./components/filter";
import StateSearch from "./components/search";
import AddEditModal from "./modals/AddEditModal";
import { useStates } from "./hooks/useState";
import { stateColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const State = () => {
  const { state, addState, updateState, deleteState } = useStates();

  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  // ✅ Filter + Sort
  const filteredData = state
    .filter((s) => {
      const stateName = s.stateName || "";
      const matchesSearch = stateName
        .toLowerCase()
        .includes(search.toLowerCase());

      const filter = filterState?.toUpperCase() || "ALL";
      const matchesFilter =
        filter === "ALL" ? true : s.stateName?.toUpperCase() === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  // ✅ Modal Handlers
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleSave = async (values) => {
    if (editData) {
      await updateState(editData._id, values);
    } else {
      await addState(values);
    }
    handleCloseModal();
  };

  return (
    <div className="mx-auto  bg-white shadow-lg border-primary-800 border rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">State List</h1>

        <StateSearch search={search} setSearch={setSearch} />

        <div className="flex gap-4 max-sm:flex-wrap">
          <StateFilters
            filterState={filterState}
            setFilterState={setFilterState}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            onClick={() => {
              setEditData(null);
              setModalOpen(true);
            }}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={stateColumns({
          setEditData: (row) => {
            setEditData(row);
            setModalOpen(true);
          },
          deleteState,
          updateState,
        })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Add/Edit Modal */}
      {modalOpen && (
        <AddEditModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          state={editData}
        />
      )}
    </div>
  );
};

export default State;
