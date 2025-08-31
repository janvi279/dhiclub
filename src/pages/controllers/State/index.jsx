import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import StateFilters from "./components/filter";
import StateSearch from "./components/search";
import AddStateModal from "./modals/Add";
import EditStateModal from "./modals/Edit";
import { useStates } from "./hooks/useState";
import { stateColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const State = () => {
  const { state, addState, updateState, deleteState } = useStates();

  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  // ✅ Filter + sort logic
  const filteredData = state
    .filter((c) => {
      const stateName = c.stateName || "";
      const State = c.stateName?.toUpperCase() || "";
      const filter = filterState?.toUpperCase() || "";
      return (
        stateName.toLowerCase().includes(search.toLowerCase()) &&
        (filter ? State === filter : true)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  // ✅ Modal Handlers
  const handleCloseAddModal = () => setShowAdd(false);
  const handleCloseEditModal = () => setEditData(null);

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">State List</h1>

        <StateSearch search={search} setSearch={setSearch} />

        <div className="flex gap-4">
          <StateFilters
            filterCountry={filterState}
            setFilterCountry={setFilterState}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            onClick={() => setShowAdd(true)}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={stateColumns({ setEditData, deleteState, updateState })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Add Modal */}
      {showAdd && (
        <AddStateModal
          isOpen={showAdd}      // ✅ important
          onClose={handleCloseAddModal}
          onSave={addState}
        />
      )}

      {editData && <EditStateModal isOpen={!!editData}
        state={editData} onClose={handleCloseEditModal} onSave={updateState} />}

    </div>
  );
};

export default State;
