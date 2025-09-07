import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import TeamFilters from "./components/filter";
import TeamSearch from "./components/search";
import AddEditModal from "./modals/AddEdit";
import { useTeams } from "./hooks/useTeams";
import { teamColumns } from "./coumns";
import customStyles from "../../../components/custom/customStyle";

const Teams = () => {
  const { teams, addTeam, updateTeam, deleteTeam } = useTeams();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

// ✅ Filter & sort
const filteredData = teams
  .filter((t) =>
    t.teamName.toLowerCase().includes(search.trim().toLowerCase())
  )
  .filter((t) =>
    statusFilter.toLowerCase() === "all"
      ? true
      : t.status.toLowerCase() === statusFilter.toLowerCase()
  )
  .sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );


  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);

  };

   const handleSave = (values) => {
    if (editData) {
      updateTeam({ ...editData, ...values });
    } else {
      addTeam(values);
    }
    handleCloseModal();
  };

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Teams</h1>

        <TeamSearch search={search} setSearch={setSearch} />
        <div className="flex gap-4">
          <TeamFilters
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
        >
          <FaPlus /> Add Team
        </button>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={teamColumns({
          setEditData: (row) => {
            setEditData(row);
            setModalOpen(true);
          },
        deleteTeam,
        updateTeam,
        })}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {/* Modal */}
      {modalOpen && (
        <AddEditModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Teams;
